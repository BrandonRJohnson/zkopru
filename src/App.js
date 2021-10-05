import React, { useEffect, useState } from "react";
import './App.css';
import axios from 'axios';
import fromWei from './fromWei.js';
import newDate from './dayjs.js';
import Alarmclock_gray from './Alarmclock_gray.svg'
import Alarmclock_orange from './Alarmclock_orange.svg'
import Alarmclock_yellow from './Alarmclock_yellow.svg'
import Reward from "./Reward";

const App = () => {
  // we need to use the api key in order to figure out the data that is actually being imported from the API
  const [ info, setInfo ] = useState([])

  useEffect(async() => {
    try {
      const { data } = await axios('https://zkopru.goerli.rollupscan.io/instant-withdraw')
      setInfo(data)
      console.log(data)
    } catch (err) {
      console.log(err)
    }
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

  const Data = info.map((item) => {
    const currentStatus = getStatus(item)
    const isAvailable = currentStatus === "Available"
    const isExpired = +new Date() > +item.expiration * 1000
    const isWarning = +new Date() > +(item.expiration * 1000) - 3600
      return (
        <div className='table-row' style = {{backgroundColor: isAvailable ? "#EFF6FF" : "white", color: isExpired ? "#9ca3af" : "black" }} >
            <div className="table-data-available" style={{ width: "10%" }}> {currentStatus} </div>
            <div className="table-data" style={{ width: "15%"}}> {Reward(item)}</div>
            <div className="table-data" style={{ width: "12%"}}>TBD</div>
            <div className="table-data" style={{ width: "14%", display: 'flex', alignItems: 'center'}}>
              <img src={isExpired ? Alarmclock_gray : isWarning ? Alarmclock_yellow : Alarmclock_orange } alt="" width= "20"></img>
              {newDate(item.expiration)}
            </div>
            <div className="table-data" style={{ width: "8%"}}>{item.withdrawal.proposal.canonicalNum}</div>
            <div className="table-data" style={{ width: "10%"}}>{item.withdrawal.proposal.proposedAt}</div>
            <div className="table-data" style={{ width: "12%"}}>{newDate(item.withdrawal.proposal.timestamp)}</div>
            <div className="table-data" style={{ width: "8%"}}>{getAssetSymbol(item.withdrawal.tokenAddr, item.withdrawal.tokenInfo)}</div>
            <div className="table-data" style={{ width: "15%"}}>{fromWei(item.prepayFeeInEth)} {getAssetSymbol(item.withdrawal.tokenAddr, item.withdrawal.tokenInfo)} </div>
        </div>
      )
  })

  return (
    <div>
      <h1 className="title">
        Market
      </h1>
      <div className="table-container">
        <div className="table-header">
          <div style={{ width: "10%" }}>Status</div>
          <div style={{ width: "15%" }}>Reward</div>
          <div style={{ width: "12%" }}>Paid</div>
          <div style={{ width: "14%", display: 'flex', alignItems: 'center'}}>
            <img src={Alarmclock_gray} width= "20"></img>
            <div>Expires</div>
          </div>
          <div style={{ width: "8%" }}>L2 Block</div>
          <div style={{ width: "10%" }}>L1</div>
          <div style={{ width: "12%" }}>Creation</div>
          <div style={{ width: "8%" }}>Asset</div>
          <div style={{ width: "15%" }}>Amount</div>
        </div>
        {Data}
      </div>
    </div>
  )

}

export default App;