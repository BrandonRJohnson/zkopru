import React, { useEffect, useState } from "react";
import './App.css';
import axios from 'axios';
import fromWei from './fromWei.js';

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
    return (
      <div className='table-row'>
          {(() => {
            if ( item.withdrawal.status === 4 ) {
              return (
                <div className="table-data-available">Available</div>
              )
            }
            else if ( item.withdrawal.status === 5 ) {
              return (
                <div  className="table-data">Fulfilled</div>
              )
            }
            else if ( item.withdrawal.statsus === 6 ) {
              return (
                <div  className="table-data">Not Available</div>
              )
            }
          })()}
          <div className="table-data">{fromWei((item.withdrawal.erc20Amount - item.prepayFeeInToken))} ETH</div>
          <div className="table-data">TBD</div>
          <div className="table-data">{Date(item.expiration * 1000)}</div>
          <div className="table-data">{item.withdrawal.proposal.canonicalNum}</div>
          <div className="table-data">{item.withdrawal.proposal.proposedAt}</div>
          <div className="table-data">{Date(item.withdrawal.proposal.timestamp * 1000)}</div>
          <div className="table-data">ETH</div>
          <div className="table-data">{fromWei(item.prepayFeeInEth)} ETH</div>
      </div>
    )
  })

  return (
    <div>
      <h1 className="title">
        Market
      </h1>
      <div className="table">
        <div className="table-header">
          <div>Status</div>
          <div>Reward</div>
          <div>Paid</div>
          <div>Expires</div>
          <div>L2 Block</div>
          <div>L1</div>
          <div>Creation</div>
          <div>Asset</div>
          <div>Amount</div>
        </div>
        {Data}
      </div>
    </div>
  )

}

export default App;