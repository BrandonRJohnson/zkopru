import React, { useEffect, useState } from "react";
import './App.css';
import axios from 'axios';
import fromWei from './fromWei.js';
import newDate from './dayjs.js';
import Alarmclock_gray from './Alarmclock_gray.svg'
import Alarmclock_orange from './Alarmclock_orange.svg'
import Reward from "./Reward";

const App = () => {
  // we need to use the api key in order to figure out the data that is actually being imported from the API
  const [ info, setInfo ] = useState([])

  useEffect(() => {
    new Promise((resolve, reject) => {
      window.addEventListener("load", async () => {
        if (window.ethereum) {
          const web3 = window.ethereum
          try {
            await window.ethereum.request({ method: 'eth_requestAccounts' })
            resolve(web3);
          } catch (error) {
            reject(error)
          }
        }
        else if (window.web3) {
          const web3 = window.web3
          console.log("Injected web3 detected")
          resolve(web3);
        }
        else {
          console.log('Error, no web3 found in browser')
        }
      })
    })

    async function fetchData() {
      const { data } = await axios('https://zkopru.goerli.rollupscan.io/instant-withdraw')
      setInfo(data)
    }

    fetchData()
  }, [])

  console.log(info)

  const getAssetSymbol  = ( address, tokenInfo ) => {
    if ( +address === 0) {
        return "ETH"
    }
    else {
        return tokenInfo.symbol
    }
  }

  const getStatus = ( item ) => {
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

  // map function formatting the available

  const availableWithdrawals = filterAvailable.map((item) => {
    return (
      <div className='table-row'>
        <div className="table-data" style={{ width: "15%"}}> {Reward(item)}</div>
        <div className="table-data" style={{ width: "14%", display: 'flex', alignItems: 'center'}}>
        <img src={Alarmclock_orange} alt="" width= "20"></img>
        {newDate(item.expiration)}
        </div>
        <div className="table-data" style={{ width: "14%"}}> Loan </div>
        <div className="table-data" style={{ width: "15%"}}>{fromWei(item.prepayFeeInEth)} {getAssetSymbol(item.withdrawal.tokenAddr, item.withdrawal.tokenInfo)} </div>
        <div className="table-data" style={{ width: "8%"}}>{getAssetSymbol(item.withdrawal.tokenAddr, item.withdrawal.tokenInfo)}</div>
        <div className="table-data" style={{ width: "12%"}}>{newDate(item.withdrawal.proposal.timestamp)}</div>
        <div className="table-data" style={{ width: "8%"}}>{item.withdrawal.proposal.canonicalNum}</div>
        <div className="table-data" style={{ width: "10%"}}>{item.withdrawal.proposal.proposedAt}</div>
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
        <div className="table-data-expired" style={{ width: "15%"}}>{fromWei(item.prepayFeeInEth)} {getAssetSymbol(item.withdrawal.tokenAddr, item.withdrawal.tokenInfo)} </div>
        <div className="table-data-expired" style={{ width: "8%"}}>{getAssetSymbol(item.withdrawal.tokenAddr, item.withdrawal.tokenInfo)}</div>
        <div className="table-data-expired" style={{ width: "12%"}}>{newDate(item.withdrawal.proposal.timestamp)}</div>
        <div className="table-data-expired" style={{ width: "8%"}}>{item.withdrawal.proposal.canonicalNum}</div>
        <div className="table-data-expired" style={{ width: "10%"}}>{item.withdrawal.proposal.proposedAt}</div>
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