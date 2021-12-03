import React, { useEffect, useState } from "react";
import './App.css';
import axios from 'axios';
import dayjs from "dayjs";
import Alarmclock_gray from './Alarmclock_gray.svg'
import Alarmclock_orange from './Alarmclock_orange.svg'
import BN from "bn.js";
import { L1Contract } from '@zkopru/core';

window.addEventListener("load", () => {
  if (window.ethereum) {
      window.ethereum.request({ method: 'eth_requestAccounts' })
      console.log("Connected to metamask")
  }
  else if (window.web3) {
    console.log("Injected web3 detected")
  }
  else {
    console.log('Error, no web3 found in browser')
  }
})


const App = () => {

  // we need to use the api key in order to figure out the data that is actually being imported from the API
  const [ info, setInfo ] = useState([])

  useEffect(() => {
    async function fetchData() {
      const { data } = await axios('https://zkopru.goerli.rollupscan.io/instant-withdraw')
      setInfo(data)
    }
    fetchData()
  }, [])

  console.log(info)

  const fromWei = (amount, decimals = 12) => {
    // transfer units from wei to ether
    let bnAmount
    if (typeof amount === 'string' && amount.indexOf('0x') === 0) {
      bnAmount = new BN(amount.slice(2), 16)
    } else {
      bnAmount = new BN(amount)
    }
    const finney = bnAmount.div(new BN(`${10 ** (18 - decimals)}`)).toString()
    const ether = +finney / (10 ** decimals)
    return ether
  }

  const newDate = ( unix ) => {
    // take an input of unix seconds and return a date
    return dayjs(unix * 1000).format('MM/DD/YY @ HH:mm')}

  const getAssetSymbol  = ( address, tokenInfo ) => {
    if ( +address === 0) {
        return "ETH"
    }
    else {
        return tokenInfo.symbol
    }
  }

  const ZKOPRU_ADDRESS = '0xe93b68a8ea810242BEBc5fb225EB01ddF2bf070A'

  const contract = new L1Contract(window.web3, ZKOPRU_ADDRESS)

  const latestBlock = async () => {
    await contract.upstream.methods.latest()
  }

  console.log(latestBlock)

  const getStatus = ( item ) => {
    // determine that status of a transaction based on data in the API
    if ( item.withdrawal.status === 3 ) {
      return "Fulfilled"
    }
    else if (item.withdrawal.proposal.finalized) {
      return "Finalized"
    }
    else if ( +new Date() > +item.expiration * 1000) {
      return "Expired"
    }
    return "Available"
  }

  const filterExpired = info.filter(function(item) {
    return +new Date() > +item.expiration * 1000
  });

  const filterAvailable = info.filter(function(item) {
    return getStatus(item) === "Available"
  });

  const Reward = ( item ) => {
    if ( +item.withdrawal.tokenAddr === 0) {
        return `${fromWei(item.prepayFeeInEth)} ETH`
    }
    else {
        const { decimals, symbol } = item.withdrawal.tokenInfo
        return `${new BN(item.prepayFeeInToken).div(new BN(10).pow(new BN(decimals)))} ${symbol}`
    }
  }

  // map function formatting the available

  const availableWithdrawals = filterAvailable.map((item) => {
    return (
      <div className='table-row-available'>
        <div className="table-data" style={{ width: "15%"}}> {Reward(item)}</div>
        <div className="table-data" style={{ width: "14%", display: 'flex', alignItems: 'center'}}>
        <img src={Alarmclock_orange} alt="" width= "20"></img>
        {newDate(item.expiration)}
        </div>
        <div className="table-data" style={{ width: "14%"}}> Loan </div>
        <div className="table-data" style={{ width: "15%"}}>{fromWei(item.withdrawal.eth)} {getAssetSymbol(item.withdrawal.tokenAddr, item.withdrawal.tokenInfo)} </div>
        <div className="table-data" style={{ width: "8%"}}>{getAssetSymbol(item.withdrawal.tokenAddr, item.withdrawal.tokenInfo)}</div>
        <div className="table-data" style={{ width: "16%"}}>{`Created ${newDate(item.withdrawal.proposal.timestamp)}`}</div>
        <div className="table-data" style={{ width: "6%"}}>L2 Block</div>
        <div className="table-data" style={{ width: "10%"}}><a href={`https://goerli.etherscan.io/tx/${item.withdrawal.proposal.proposedAt}`}> L1 Transaction </a></div>
      </div>
    )
  })

  // map function formatting the expired

  const expiredWithdrawals = filterExpired.map((item) => {
    return (
      <div className='table-row-expired'>
        <div className="table-data-expired" style={{ width: "15%"}}> {Reward(item)}</div>
        <div className="table-data-expired" style={{ width: "14%", display: 'flex', alignItems: 'center'}}>
          <img src={Alarmclock_gray} alt="" width= "20"></img>
          {newDate(item.expiration)}
        </div>
        <div className="table-data-expired" style={{ width: "15%"}}>{fromWei(item.withdrawal.eth)} {getAssetSymbol(item.withdrawal.tokenAddr, item.withdrawal.tokenInfo)} </div>
        <div className="table-data-expired" style={{ width: "8%"}}>{getAssetSymbol(item.withdrawal.tokenAddr, item.withdrawal.tokenInfo)}</div>
        <div className="table-data-expired" style={{ width: "16%"}}>{`Created ${newDate(item.withdrawal.proposal.timestamp)}`}</div>
        <div className="table-data-expired" style={{ width: "6%"}}>L2 Block</div>
        <div className="table-data-expired" style={{ width: "10%"}}><a href={`https://goerli.etherscan.io/tx/${item.withdrawal.proposal.proposedAt}`}> L1 Transaction </a></div>
      </div>
    )
  })

  return (
    <div>
      <h1 className="title">
         Prepay Market
      </h1>
      <br></br>
      <h1 className="title">
        Available withdrawals
      </h1>
      <div>
        {availableWithdrawals}
      </div>
      <br></br>
      <h1 className="title">
        Completed withdrawals
      </h1>
      <div>
        {expiredWithdrawals}
      </div>
      <br></br>
      <h1 className="title">
        My Loans
      </h1>
    </div>
  )

}

export default App;