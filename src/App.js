import React, { useEffect, useState } from "react";
import './App.css';
import axios from 'axios';
import fromWei from './fromWei.js';
import newDate from './dayjs.js';
import Alarmclock_fill from './Alarmclock_fill.svg'
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

  const Asset  = ( address, tokenInfo ) => {
    if ( +address === 0) {
        return "ETH"
    }

    else {
        return tokenInfo.symbol
    }
}


  const Data = info.map((item) => {
    if ( item.withdrawal.status === 4 ) {
      return (
        <div className='table-row'>
            <div className="table-data-available" style={{ width: "10%", backgroundColor: "#EFF6FF" }}> Available </div>
            <div className="table-data" style={{ width: "15%", backgroundColor: "#EFF6FF"  }}> {Reward(item)}</div>
            <div className="table-data" style={{ width: "12%", backgroundColor: "#EFF6FF"   }}>TBD</div>
            <div className="table-data" style={{ width: "12%", backgroundColor: "#EFF6FF"   }}>{newDate(item.expiration)}</div>
            <div className="table-data" style={{ width: "8%", backgroundColor: "#EFF6FF"   }}>{item.withdrawal.proposal.canonicalNum}</div>
            <div className="table-data" style={{ width: "10%", backgroundColor: "#EFF6FF"   }}>{item.withdrawal.proposal.proposedAt}</div>
            <div className="table-data" style={{ width: "12%", backgroundColor: "#EFF6FF"   }}>{newDate(item.withdrawal.proposal.timestamp)}</div>
            <div className="table-data" style={{ width: "8%", backgroundColor: "#EFF6FF"   }}>{Asset(item.withdrawal.tokenAddr, item.withdrawal.tokenInfo)}</div>
            <div className="table-data" style={{ width: "15%", backgroundColor: "#EFF6FF"   }}>{fromWei(item.prepayFeeInEth)} {Asset(item.withdrawal.tokenAddr, item.withdrawal.tokenInfo)} </div>
        </div>
      )
    }

    else if ( item.withdrawal.status === 5 ) {
      return (
        <div className='table-row'>
            <div className="table-data" style={{ width: "10%" }}> Fulfilled </div>
            <div className="table-data" style={{ width: "15%" }}>{fromWei((item.withdrawal.erc20Amount - item.prepayFeeInToken))} ETH</div>
            <div className="table-data" style={{ width: "12%" }}>TBD</div>
            <div className="table-data" style={{ width: "12%" }}>{Date((item.expiration * 1000))}</div>
            <div className="table-data" style={{ width: "8%" }}>{item.withdrawal.proposal.canonicalNum}</div>
            <div className="table-data" style={{ width: "10%" }}>{item.withdrawal.proposal.proposedAt}</div>
            <div className="table-data" style={{ width: "12%" }}>{Date((item.withdrawal.proposal.timestamp * 1000))}</div>
            <div className="table-data" style={{ width: "8%" }}>{Asset(item.withdrawal.tokenAddr)}</div>
            <div className="table-data" style={{ width: "15%" }}>{fromWei(item.prepayFeeInEth)} ETH</div>
        </div>
      )
    }

    else if ( item.withdrawal.status === 6 ) {
      return (
        <div className='table-row'>
            <div className="table-data" style={{ width: "10%" }}> Expired </div>
            <div className="table-data" style={{ width: "15%" }}>{fromWei((item.withdrawal.erc20Amount - item.prepayFeeInToken))} ETH</div>
            <div className="table-data" style={{ width: "12%" }}>TBD</div>
            <div className="table-data" style={{ width: "12%" }}>{Date((item.expiration * 1000))}</div>
            <div className="table-data" style={{ width: "8%" }}>{item.withdrawal.proposal.canonicalNum}</div>
            <div className="table-data" style={{ width: "10%" }}>{item.withdrawal.proposal.proposedAt}</div>
            <div className="table-data" style={{ width: "12%" }}>{Date((item.withdrawal.proposal.timestamp * 1000))}</div>
            <div className="table-data" style={{ width: "8%" }}>{Asset(item.withdrawal.tokenAddr)}</div>
            <div className="table-data" style={{ width: "10%" }}>{fromWei(item.prepayFeeInEth)} ETH</div>
        </div>
      )
    }
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
          <div style={{ width: "12%" }}>
            <img src={Alarmclock_fill}></img>
            Expires
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