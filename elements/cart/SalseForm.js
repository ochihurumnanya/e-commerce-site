
import {  setSalseReceipt, getCartItems, cleanCart } from '../../components/LocalStorage'
import { useState, useEffect } from 'react'
import Modal from 'react-bootstrap/Modal'
import { ProductsData } from '../../context/context';
import { useContext } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { addNewSale } from '../../api/sale/functions';
import Spinner from 'react-bootstrap/Spinner'

/**
 * 
 *  {
      id: "1235",
      address: "country, city/state, address",
      status: "pending",
      date: "date/time 2",
      contact: "email, 09060399343",
      customer: "John", //customers name
      staff: "",
      products: [
          {
            id:"1",
            name:"dell 640",
            price:50000,
            dsc:"Intel 64 bits os",
            category:"laptops",
            qty: 5,
            img: "/img/img5.png"
          },
          {
            id:"2",
            name:"dell 640",
            price:50000,
            dsc:"Intel 64 bits os",
            category:"smart watches",
            qty: 2,
            img: "/img/img4.png"
          },
      ],
    }
]
 */

 const SalseForm = (props) => {
  
  let router = useRouter();
  const { siteConfig, formatPrice, appuser } = useContext(ProductsData)
  
  const[fields, setFields] = useState({
        discount: 0,
        name: "",
  })
  
  const [formatedPrice, setFormatedPrice] = useState(0)

  const [errorMsg, setErrorMsg] = useState()
  const [loading, setLoading] = useState(false)

  const handlePayment = async(products) =>{
        if ( fields.name.trim() != "" ){
                try {
                  setLoading(true)
                  setErrorMsg("")
                  const res = await addNewSale({
                      token: appuser.token, 
                      address: "Purchased from store", 
                      customer: fields.name,
                      contact: siteConfig.contact.email, //set store owners email
                      logo: siteConfig.logo,
                      discount: fields.discount,
                      oderId: "",
                      products: products
                  })
                  setSalseReceipt({...res.data, products: JSON.parse(res.data.products)})
                  cleanCart()
                  router.push('/dashboard/reciept')
            } catch (error) {
                  console.log(error)
                  setLoading(false)
                  setErrorMsg("An unknown error occurred check internet connectivity and try again")
            }
        }

  }

  const handelChange = (event) =>{
    if (event.target.name == "discount"){
      setFields({...fields, [event.target.name]:Number(event.target.value) < 0 || event.target.value == '' ? '' : Number(event.target.value)})
      //formatPrice
      setFormatedPrice(formatPrice(Number(event.target.value)))
    } else {
      setFields({ ...fields, [event.target.name]: event.target.value });
    }
  }
   
      return (
        <Modal {...props} size="lg" aria-labelledby="contained-modal-title-vcenter">
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Oder Details.
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <div className="container">
                      <div style={{padding: "15px", display: siteConfig.subscription ? "block" : "none"}}>
                          <div className="txt">
                             Customers Name
                             <input className="form-control" onChange={handelChange} value={fields.name} name="name"  type="text" />
                          </div>
                          <div className="txt">
                             Discount Currency({siteConfig.currency})  {formatedPrice}
                             <input className="form-control" onChange={handelChange} value={fields.discount} name="discount"  type="number" />
                          </div>
                          <h4>Shopping Cart</h4>
                          <div>
                              <table style={{width: "95%"}} id="std-rec">
                                  <tbody>
                                      <tr>
                                          <th>image</th>
                                          <th>Product</th>
                                          <th>Price</th>
                                          <th>Qty</th>
                                      </tr>
                                      {
                                      props.cart ? props.cart.map(
                                          (item, index) => 
                                              <tr key={"i"+index}>
                                                  <td><img className="cat-img" src={item.img} /></td>
                                                  <td>{item.name}</td>
                                                  <td>{formatPrice(item.price)}</td>
                                                  <td>{item.qty}</td>
                                              </tr>
                                          ) : ""
                                      }
                                  </tbody>
                              </table>
                              <p>
                                <b>Amount:</b> <span>{props.cart ? formatPrice(props.cart.reduce((a, c) => a + c.price * c.qty, 0))  : ""}</span>
                              </p>
                              <div className="txt">
                                  <center><p style={{color: "red"}}>{ errorMsg }</p></center>
                              </div>
                          </div>
                      </div>
                      
                      <center>
                        <h3 style={{padding: "15px", display: siteConfig.subscription ? "none" : "block"}}>
                          your annual subscription has expired and you don't have enough credit for automatic renewal. If you are supper admin? kindly 
                          <Link href="/dashboard/credit">click here to subscibe</Link> or contact supper admin. Sorry for all inconveniences</h3>
                      </center>
                  </div>
        </Modal.Body>
        <Modal.Footer>
          <button className="btn" style={{display: loading ? "none" : "block", background: siteConfig.color, marginRight: "20px", color: "white"}} onClick={()=>handlePayment(props.cart)}>
              Paid
          </button>
          <button className="btn" style={{display: loading ? "block" : "none", background: siteConfig.color, marginRight: "20px", color: "white"}} >
              <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" /> processing... 
          </button>
        </Modal.Footer>
      </Modal>
      ) 
    } 
  export default SalseForm;