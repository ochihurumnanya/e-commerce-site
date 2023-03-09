import {  getSiteConfig, setSiteConfig } from '../../components/LocalStorage'
import { useState, useEffect } from 'react'
import { ProductsData } from '../../context/context';
import { useContext } from 'react';
import Link from 'next/link';
import Spinner from 'react-bootstrap/Spinner'
import DeleteAdminModal from './elements/admin/DeleteAdminDialog';
import { createSlides } from './elements/products/functions';
import { addNewAdmin } from '../../api/admin/functions';

const Admin = () => {
  const { siteConfig, appuser, allProducts } = useContext(ProductsData)
  const [allAdmins, setAllAdmins] = useState(appuser.admins.admins)
  const [apiError, setApiError] = useState("")
  const [ apiLoading, setApiLoading ]  = useState(false)
  const [productsCategories, setProductsCategories] = useState(createSlides(allProducts))
  const [fields, setFields] = useState({
      email: '',
      level: 1,
      cat: 'All'
  })
  const [admin, setAdmin] = useState({})

  const [siteColor, setSiteColor] = useState('orange')
    //set delete modal show
   const [delAdminModalShow, setDelAdminModalShow] = useState(false)

    useEffect(() => {
      console.log(createSlides(allProducts))
        setSiteColor(getSiteConfig().color)
        //console.log()
      }, [])

      const handelChange = (event) =>{
        setFields({ ...fields, [event.target.name]: event.target.value });
      }

      //select admin for removal
      const selectAdmin = (admin) => {
          //[admin, setAdmin]
          setAdmin(admin)
          setDelAdminModalShow(true)

      }

      //removes admin from ui auid = (admin uid)
    const removeAdmin = (auid) => {
      const updatedAdmins = allAdmins.filter((admin) => admin.uid !== auid)
      //for all products
      setAllAdmins(updatedAdmins)
     
    }


    const handleAdminLevelChange = (e) => {
      alert(e.target.name);
      setFields({ ...fields, [e.target.name]: Number(e.target.value) });
    }

    const handleAdminCatChange = (e) => {
      alert(e.target.name);
      setFields({ ...fields, [e.target.name]: e.target.value });
    }

        /**
     * 
     * siteConfig.admins.admins
      [ 
                    {
                        name: userName,
                        uid: uid,
                        cat: "All",
                        level: 3
                    }  
      ]
     */

      const makeAdmin = async() => {
        try{
            
            setApiLoading(true)
            setApiError("")
            //use this fields for new admin
            const newAdmin = {
              email: fields.email,
              level: fields.level,
              cat:   fields.cat,
              token: appuser.token,
              logo: siteConfig.logo
            }
            
            //document.getElementById("qdate").value = qdate
            const res = await addNewAdmin(newAdmin)
            setAllAdmins([...allAdmins, res.data.admin])//allSalse
            setFields({ ...fields, email: event.target.value });
            setApiLoading(false)
            setApiError("")
          } catch(error) {
              setApiError("An error occured check internet connectivity")
              setApiLoading(false)
              //alert("error")
              console.log(error)
          }
      }
    
    if (siteConfig.subscription){
      return (
        <div  style={{paddingBottom: "100px"}} className="container">
            { apiError && <Alert variant="danger"><center>{ apiError }</center></Alert> }
            <div style={{paddingBottom: "20px"}} className="row">
              <br/><br/>
              <center><h2>MANAGE SITE ADMIN</h2></center>
              <br/><br/>
              <div className="col-md-6">
                  <label>Enter New Admin Email </label>
                  <input className="form-control" onChange={handelChange} value={fields.name} name="email"  type="email" placeholder="New Admin Email" required />
              </div>
              <div className="col-md-6">
                      <label>Select Adim Level</label>
                      <select onChange={handleAdminLevelChange} name="level" className="form-select" >
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                      </select>
              </div>
            </div>
            <div style={{paddingBottom: "20px"}} className="row">
              <label>Select Admin Product Category <b>Product category to be processed by admin</b></label>
              <select onChange={handleAdminCatChange} name="cat" className="form-select">
                <option value="All">All</option>
                {
                  productsCategories.map((cat, index) => 
                    <option key={index} value={cat.category}>{ cat.category }</option>
                  ) 
                }
              </select>
            </div>
            <div style={{paddingBottom: "20px"}} className="row">
              <div className="col-md-6">
                <button className="btn" onClick={()=>makeAdmin()} style={{display: apiLoading ? "none" : "block", background: siteConfig.color, marginRight: "20px", color: "white"}} >
                  Make Admin
                </button>
                <button className="btn" style={{display: apiLoading ? "block" : "none", background: siteConfig.color, marginRight: "20px", color: "white"}} >
                  <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" /> Loading... 
                </button>
              </div>
            </div>

            <center>
                  <table style={{width: "100%", paddingBottom: "30px"}}>
                      <tbody>
                          <tr>
                              <th>Name</th>
                              <th>Level</th>
                              <th>Product category</th>
                              <th>Action</th>
                          </tr>
                          
                          {
                            allAdmins.map((admin, index) => 
                                <tr key={index}>
                                  <td>{admin.name}</td>
                                  <td>{admin.level}</td>
                                  <td>{admin.cat}</td>
                                  <td><button onClick={()=>selectAdmin(admin)} className="btn-delete">Remove</button></td>
                                </tr>
                            )
                          }
                            
                          
                      </tbody>
                    </table> 
                  </center>
                  <DeleteAdminModal
                     show={delAdminModalShow} 
                     onHide={() => setDelAdminModalShow(false)}
                     admin={admin}
                     //[admin, setAdmin]
                     removeAdmin={removeAdmin}
                  />
          </div>
      )//delAdminModalShow, setDelAdminModalShow
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

export default Admin;