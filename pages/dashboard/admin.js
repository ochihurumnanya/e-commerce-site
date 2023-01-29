import {  getSiteConfig, setSiteConfig } from '../../components/LocalStorage'
import { useState, useEffect } from 'react'
import { ProductsData } from '../../context/context';
import { useContext } from 'react';
import Link from 'next/link';

const Credit = () => {
  const { siteConfig } = useContext(ProductsData);
    const[fields, setFields] = useState({
      email: '',
    })

    const [siteColor, setSiteColor] = useState('orange')

    useEffect(() => {
        setSiteColor(getSiteConfig().color)
        //console.log()
      }, [])

      const handelChange = (event) =>{
        setFields({ ...fields, [event.target.name]: event.target.value });
      }

      const [adminLevel, setAdminLevel] = useState("1")

        const handleAdminLevelChange = (e) => {
          setAdminLevel(e.target.value);
          // e.target.value  
          //alert(parseInt(adminLevel))
          //calculate total sale from the selected  date
          //also display salse statistic from the selelcted date
        }
    
    if (siteConfig.subscription){
      return (
        <div  style={{paddingBottom: "100px"}} className="container">
            <div style={{paddingBottom: "50px"}} className="row">
              <br/><br/>
              <center><h2>MANAGE SITE ADMIN</h2></center>
              <br/><br/>
              <div className="col-md-6">
                  <ul className="summary-items">
                  <li>
                    <div className="summary-title color2">
                      <span><i className="fa fa-users"></i> Enter User Email </span>
                    </div>
                    <div className="summary-body">
                      <input className="form-control" onChange={handelChange} value={fields.name} name="email"  type="text" placeholder="User Email" required />
                    </div>
                  </li>
                  </ul>
                </div>
                <div className="col-md-6">
                  <ul className="summary-items">
                  <li>
                    <div className="summary-title color3">
                      <span><i className="fa fa-users"></i> Select Adim Level</span>
                    </div>
                    <div className="summary-body">
                      <select onChange={handleAdminLevelChange} className="form-select" >
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                      </select>
                    </div>
                  </li>
                  </ul>
                  <button className="btn" style={{background: siteColor, float: "right", marginRight: "40px", color: "white"}}>Make Admin</button>
                </div>
              </div>

            <center>
                  <table style={{width: "100%", paddingBottom: "30px"}}>
                      <tbody>
                          <tr>
                              <th>Name</th>
                              <th>Level</th>
                              <th>Admin</th>
                              <th>Action</th>
                          </tr>
                          <tr>
                            <td>Miracle Okonkwo</td>
                            <td>3</td>
                            <td>email@gmail.com</td>
                            <td><button className="btn-delete">Remove</button></td>
                          </tr>
                      </tbody>
                    </table> 
                  </center>
          </div>
      )
    }else{
      return (
        <div className="container" style={{paddingBottom: "100px", paddingTop: "50px"}}>
          <center>
            <h3>your annual subscription has expired and you don't have enough credit for automatic renewal. kindly <Link href="/dashboard/credit">click here to subscibe</Link></h3>
          </center>
        </div>
      )
    }
}

export default Credit;