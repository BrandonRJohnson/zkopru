import React from "react";
import './App.css';
import sampleData from './sampleData.json';
 
const App = () => {
  return (
    <div>
      <h1>
        Market
      </h1>
      <table className="content-table">
        <thead>
          <tr>
            <th>Status</th>
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
        <tbody>
          {sampleData.map((item,index) => {
            return(
              <div>
                <td>{item.status}</td>
                <td>{item.reward}</td>
                <td>{item.paid}</td>
                <td>{item.expirationTime}</td>
                <td></td>
                <td></td>
                <td>{item.creationTime}</td>
                <td>{item.asset}</td>
                <td>{item.amount}</td>
              </div>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

export default App;
