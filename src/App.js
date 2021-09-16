import React, { useEffect, useState } from "react";
import './App.css';
import axios from 'axios';
import fromWei from './fromWei.js';
import Alarmclock_fill from './Alarmclock_fill.svg'


const App = () => {
  // we need to use the api key in order to figure out the data that is actually being imported from the API
  const [ info, setInfo ] = useState([])

  useEffect(async () => {
    try {
      const { data } = await axios('https://zkopru.goerli.rollupscan.io/instant-withdraw')
      setInfo(data)
      console.log(data)
    } catch (err) {
      console.log(err)
    }
  }, [])

  console.log()

  const Data = info.map((item) => {
    if ( item.withdrawal.status === 4 ) {
      return (
        <div className='table-row'>
            <div className="table-data-available" style={{ width: "10%", backgroundColor: "#EFF6FF" }}> Available </div>
            <div className="table-data" style={{ width: "15%", backgroundColor: "#EFF6FF"  }}>{fromWei((item.withdrawal.erc20Amount - item.prepayFeeInToken))} ETH</div>
            <div className="table-data" style={{ width: "15%", backgroundColor: "#EFF6FF"   }}>TBD</div>
            <div className="table-data" style={{ width: "32%", backgroundColor: "#EFF6FF"   }}>{Date((item.expiration * 1000))}</div>
            <div className="table-data" style={{ width: "8%", backgroundColor: "#EFF6FF"   }}>{item.withdrawal.proposal.canonicalNum}</div>
            <div className="table-data" style={{ width: "5%", backgroundColor: "#EFF6FF"   }}>{item.withdrawal.proposal.proposedAt}</div>
            <div className="table-data" style={{ width: "32%", backgroundColor: "#EFF6FF"   }}>{Date((item.withdrawal.proposal.timestamp * 1000))}</div>
            <div className="table-data" style={{ width: "5%", backgroundColor: "#EFF6FF"   }}>ETH</div>
            <div className="table-data" style={{ width: "15%", backgroundColor: "#EFF6FF"   }}>{fromWei(item.prepayFeeInEth)} ETH</div>
        </div>
      )
    }

    else if ( item.withdrawal.status === 5 ) {
      return (
        <div className='table-row'>
            <div className="table-data" style={{ width: "10%" }}> Fulfilled </div>
            <div className="table-data" style={{ width: "15%" }}>{fromWei((item.withdrawal.erc20Amount - item.prepayFeeInToken))} ETH</div>
            <div className="table-data" style={{ width: "15%" }}>TBD</div>
            <div className="table-data" style={{ width: "32%" }}>{Date((item.expiration * 1000))}</div>
            <div className="table-data" style={{ width: "8%" }}>{item.withdrawal.proposal.canonicalNum}</div>
            <div className="table-data" style={{ width: "5%" }}>{item.withdrawal.proposal.proposedAt}</div>
            <div className="table-data" style={{ width: "32%" }}>{Date((item.withdrawal.proposal.timestamp * 1000))}</div>
            <div className="table-data" style={{ width: "5%" }}>ETH</div>
            <div className="table-data" style={{ width: "15%" }}>{fromWei(item.prepayFeeInEth)} ETH</div>
        </div>
      )
    }

    else if ( item.withdrawal.status === 6 ) {
      return (
        <div className='table-row'>
            <div className="table-data" style={{ width: "10%" }}> Expired </div>
            <div className="table-data" style={{ width: "15%" }}>{fromWei((item.withdrawal.erc20Amount - item.prepayFeeInToken))} ETH</div>
            <div className="table-data" style={{ width: "15%" }}>TBD</div>
            <div className="table-data" style={{ width: "32%" }}>{Date((item.expiration * 1000))}</div>
            <div className="table-data" style={{ width: "8%" }}>{item.withdrawal.proposal.canonicalNum}</div>
            <div className="table-data" style={{ width: "5%" }}>{item.withdrawal.proposal.proposedAt}</div>
            <div className="table-data" style={{ width: "32%" }}>{Date((item.withdrawal.proposal.timestamp * 1000))}</div>
            <div className="table-data" style={{ width: "5%" }}>ETH</div>
            <div className="table-data" style={{ width: "15%" }}>{fromWei(item.prepayFeeInEth)} ETH</div>
        </div>
      )
    }
  })

  return (
    <div>
      <h1 className="title">
        Market
        <img src={Alarmclock_fill} alt="time"></img>
      </h1>
      <div className="table-container">
        <div className="table-header">
          <div style={{ width: "10%" }}>Status</div>
          <div style={{ width: "15%" }}>Reward</div>
          <div style={{ width: "15%" }}>Paid</div>
          <div style={{ width: "32%" }}>
             Expires
          </div>
          <div style={{ width: "8%" }}>L2 Block</div>
          <div style={{ width: "5%" }}>L1</div>
          <div style={{ width: "32%" }}>Creation</div>
          <div style={{ width: "5%" }}>Asset</div>
          <div style={{ width: "15%" }}>Amount</div>
        </div>
        {Data}
      </div>
    </div>
  )

}

export default App;