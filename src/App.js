import React, { useEffect, useState } from "react";
import './App.css';
import axios from 'axios';
import BN from 'bn.js'
 
const App = () => {
  // we need to use the api key in order to figure out the data that is actually being imported from the API
  const [ info, setInfo ] = useState([])

  useEffect(() => {
    axios
      .get('https://zkopru.goerli.rollupscan.io/instant-withdraw', {mode: 'cors'})
      .then((response) => {
        console.log(response);
        setInfo(response.data)
      })
      .catch((error) => {
        console.log(error)
      })
    }, [])
    
  // Status: convert status from number in data to display words in browser (4 is available, 5 Not Available, 6 Fulfilled )
  const Data = info.map((item, index) => {
    if ( info[index].withdrawal.status === 4 ) {
      return (
        <tbody>
          <tr>
            <td>Available</td>
            <td>{(info[index].prepayFeeInEth / (10 ** 18))} ETH</td>
            <td>TBD</td>
            <td>{ Date(info[index].expiration * 1000)}</td>
            <td>TODO</td>
            <td>TODO</td>
            <td>TODO</td>
            <td>ETH</td>
          </tr>
        </tbody>
      )
    }

    else if ( info[index].withdrawal.status === 6 ) {
      return (
        <tbody>
          <tr>
            <td>Fulfilled</td>
          </tr>
          <tr>
            <td>{(info[index].prepayFeeInEth / (10 ** 18))} ETH</td>
          </tr>
          <tr>
            <td>{ Date(info[index].expiration * 1000)}</td>
          </tr>
        </tbody>
      )
    }

    else {
      return (
        <tbody>
          <tr>
            <td>Not Available</td>
          </tr>
          <tr>
            <td>{(info[index].prepayFeeInEth / (10 ** 18))} ETH</td>
          </tr>
          <tr>
            <td>{ Date(info[index].expiration * 1000)}</td>
          </tr>
        </tbody>
      )
    }
  })

  // Reward: Should be calculated based on withdrawal.eth - prepayFeeInEther
  // should use the BN math library in order to do these calculations
  // Paid:

  // Expiration: unix time (seconds), convert to milliseconds to use in javascript (e.g. new Date(expiration * 1000)

  // Creation

  // Asset

  // Amount

  return (
    <div>
      <h1>
        Market
      </h1>
      <h2>
      </h2>
      <table className="content-table">
        <thead>
          <tr>
            <th className="status">Status</th>
            <th>Reward</th>                  
            <th>Paid</th>
            <th>Expires</th>
            <th>L2 Block</th>
            <th>L1</th>
            <th>Creation</th>
            <th>Asset</th>
            <th>Amount</th>
          </tr>
        </thead>
        {Data}
      </table>
    </div>
  )
}

export default App;
