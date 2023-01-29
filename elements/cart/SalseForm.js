
import {  setSalseReceipt, getCartItems, cleanCart } from '../../components/LocalStorage'
import { useState, useEffect } from 'react'
import Modal from 'react-bootstrap/Modal'
import { ProductsData } from '../../context/context';
import { useContext } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';

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
  const { siteConfig, formatPrice } = useContext(ProductsData)
  
  const[fields, setFields] = useState({
    discount: 0,
    name: "",
  })

  const[salse, setSalse] = useState({
      address: "",
      status: "pending",
      date: "",
      contact: "",
      customer: "", //customers name
      staff: "",
      products:[]
  })
  
  const [formatedPrice, setFormatedPrice] = useState(0)
  
  const [isSubscribed, setIsSubscribed] = useState(siteConfig.subscription)

  const handlePayment = (products) =>{
    //update oder pyment status to paid and subtract all relevent product quntity on server side
    //update date, staff, and status fields
     //Update this functionto accomodate discount
        // and oder this time will be new oder gotten from server
        if ( fields.name.trim() != "" ){
            let newSalse = salse;
            newSalse.status = "paid" // set by server to paid rout (note remove latter)
            newSalse.discount = fields.discount
            newSalse.customer = fields.name
            newSalse.date = "date/time 2"
            newSalse.products = products
            // send newSalse to server for it to be validated and saved
            setSalse(newSalse)
            //set salse receipt to local storage
            setSalseReceipt(newSalse)
            cleanCart();
            router.push('/dashboard/reciept')
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
          <button className="btn" style={{background: "#FF5733", marginRight: "20px", color: "white"}} onClick={props.onHide}>Close</button>
          <button className="btn" style={{background: siteConfig.color, marginRight: "20px", color: "white"}} onClick={()=>handlePayment(props.cart)}>Paid</button>
        </Modal.Footer>
      </Modal>
      ) 
    } 
  export default SalseForm;