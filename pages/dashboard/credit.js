import {  getSiteConfig, setSiteConfig } from '../../components/LocalStorage'
import { useState, useEffect } from 'react'

const Credit = () => {

    const [siteColor, setSiteColor] = useState('orange')

    useEffect(() => {
        setSiteColor(getSiteConfig().color)
        //console.log()
      }, [])

    return (
      <div  style={{paddingBottom: "100px"}} className="container">
        <div style={{paddingBottom: "100px"}} className="row">
            <p>
              Refer/Register some one with your referral code and get 10 percent for every service fee charge.
              There more you refer the more money you make
            </p>
           <div className="col-md-6">
              <ul className="summary-items">
              <li>
                <div className="summary-title color2">
                  <span><i className="fa fa-users"></i> {"Credit Balance"} </span>
                </div>
                <div className="summary-body">15000</div>
              </li>
              </ul>
              <div>
                <button className="btn" style={{background: siteColor, marginLeft: "20px", color: "white"}}>Fund Account</button>
                <button className="btn" style={{background: siteColor, marginLeft: "10px", color: "white"}}>Withdraw</button>
              </div>
            </div>
            <div className="col-md-6">
              <ul className="summary-items">
              <li>
                <div className="summary-title color2">
                  <span><i className="fa fa-users"></i> {"Referral Code"} </span>
                </div>
                <div className="summary-body">12343</div>
              </li>
              </ul>
            </div>
          </div>

          <center>
                <table style={{width: "100%", paddingBottom: "30px"}}>
                    <tbody>
                        <tr>
                            <th>Type</th>
                            <th>Amount</th>
                            <th>Date</th>
                            <th>details</th>
                            <th>Reason</th>
                            <th>Status</th>
                            <th></th>
                        </tr>
                        <tr>
                          <td>Credit</td>
                          <td>1500</td>
                          <td>12/1/2023 11:pm</td>
                          <td>Credited to virtual credit wallet.</td>
                          <td>Customer reason of making payments.</td>
                          <td>Pending/Successful</td>
                        </tr>
                        <tr>
                          <td>Debit</td>
                          <td>100</td>
                          <td>12/2/2023 11:pm</td>
                          <td>Debited to virtual credit wallet, and sent to <i>Account details / referal code(vitual account number)</i></td>
                          <td>Customer reason of making payments.</td>
                          <td>Pending/Successful</td>
                        </tr>
                    </tbody>
                  </table> 
                </center>
        </div>
    )
}

export default Credit;