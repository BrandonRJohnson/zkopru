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
  // Status: convert status from number in data to display words in browser (4 is available, 5 Not Available, 6 Fulfilled )
  const Data = info.map((item) => {
    return (
      <tbody className={`table-row`}>
        <tr>
          {(() => {
            if ( item.withdrawal.status === 4 ) {
              return (
                <td className="table-data-available">Available</td>
              )
            }
            else if ( item.withdrawal.status === 5 ) {
              return (
                <td  className="table-data">Fulfilled</td>
              )
            }
            else if ( item.withdrawal.statsus === 6 ) {
              return (
                <td  className="table-data">Not Available</td>
              )
            }
          })()}
          <td className="table-data">{fromWei((item.withdrawal.erc20Amount - item.prepayFeeInToken))} ETH</td>
          <td className="table-data">TBD</td>
          <td className="table-data">{Date(item.expiration * 1000)}</td>
          <td className="table-data">{item.withdrawal.proposal.canonicalNum}</td>
          <td className="table-data">{item.withdrawal.proposal.proposedAt}</td>
          <td className="table-data">{Date(item.withdrawal.proposal.timestamp * 1000)}</td>
          <td className="table-data">ETH</td>
          <td className="table-data">{fromWei(item.prepayFeeInEth)} ETH</td>
        </tr>
      </tbody>
    )
  })


  // Reward: Should be calculated based on withdrawal.eth - prepayFeeInEther
  // should use the BN math library in order to do these calculations
  // Paid:

  // Expiration: unix time (seconds) convert to milliseconds to use in javascript (e.g. new Date(expiration * 1000)

  // Creation

  // Asset

  // Amount
  return (
    <div>
      <h1 className="title">
        Market
      </h1>
      <table className="table">
        <thead>
          <tr>
            <th className="table-header">Status</th>
            <th className="table-header">Reward</th>
            <th className="table-header">Paid</th>
            <th className="table-header">Expires</th>
            <th className="table-header">L2 Block</th>
            <th className="table-header">L1</th>
            <th className="table-header">Creation</th>
            <th className="table-header">Asset</th>
            <th className="table-header">Amount</th>
          </tr>
        </thead>
        {Data}
      </table>
    </div>
  )

}

export default App;