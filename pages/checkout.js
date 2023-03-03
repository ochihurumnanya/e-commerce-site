
import { getUserInfo, getShipping, setShipping, cleanCart, getCartItems, clearStorage } from '../components/LocalStorage.js'
import { useState, useEffect } from 'react'
import { useContext } from 'react';
import { makeNewOder } from '../api/oder/functions.js';
import { useRouter } from 'next/router';
import Spinner from 'react-bootstrap/Spinner'
import Alert from 'react-bootstrap/Alert'
import { ProductsData } from '../context/context';

//complete order object
/*
  {
    id: "12356",
    address: "country, city/state, address",
    status: "pending",
    date: "date/time 1",
    contact: "email, 09060399343",
    customer: "John", //customers name
    staff: "", //this should be set on server side
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
  },
  {
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
*/
const Checkout = () => {
    let router = useRouter();
    const { appuser, siteConfig } = useContext(ProductsData);

    const [apiError, setApiError] = useState("");
    const [loading, setLoading] = useState(false)

    const[fields, setFields] = useState({
      name: '',
      email: '',
      phone: '',
      address: ''
    })

   
    const handelChange = (event) =>{
        setFields({ ...fields, [event.target.name]: event.target.value });
    }

    useEffect(()=>{
      const { u_name, u_email } = getUserInfo();
      const { email, phone, address } = getShipping();
      setFields({...fields, name:u_name || '', email:email || u_email || '', phone:phone || '', address:address || ''})
    }, [])


    const submitShipping = async (event) => {
        event.preventDefault();
        try{
          setShipping(fields)

          setApiError("")
          setLoading(true)
          const cart = getCartItems()
          const oder = {
              token: appuser.token,
              logo: siteConfig.logo,
              address: fields.address,
              contact: fields.email+", "+fields.phone,
              customer: fields.name, //customers name
              products: cart
          }
          
          const res = await makeNewOder(oder)
          //Note save cart items and shipping to database before prodeding to line 20
          //using the above object model
          clearStorage('shipping')
          cleanCart('cartItems')
          router.push("/oder")
        } catch(error) {
          console.log(error)
          setLoading(false)
          setApiError("An unknown error occurred check internet connectivity and try again")
        }
    }

    return (
        <div style={{paddingTop:"15px", paddingBottom:"15px"}} className="container">
        <form onSubmit={submitShipping} id="shipping-form" action="">
          <div className="cart-details">
          { apiError && <Alert variant="danger"><center>{ apiError }</center></Alert> }
           <h6>CONTACT INFORMATION</h6>
            <p style={{fontSize: "12px"}}>
              The phone number field is very important. As you're not required to make payments
              until transportation/shipping cost have been reached between
              you and our agent.
            </p>
             <div className="txt">
              <input value={fields.email} onChange={handelChange} name="email" className="form-control" type="email" placeholder="Email" required />
             </div>
             <div className="txt">
              <input value={fields.name} onChange={handelChange} name="name" className="form-control" type="text" placeholder="Full Name" />
             </div>
             <div className="txt">
              <input value={fields.phone} onChange={handelChange} name="phone" className="form-control" type="tel" placeholder="Phone Number" />
             </div>
           </div>
            <br />
           <div className="cart-details">
            <h6>SHIPPING ADDRESS</h6>
               <textarea onChange={handelChange} name="address" className="form-control" value={fields.address}></textarea>
           </div>
            <div className="txt">
              <button type="submit"  style={{display: loading ? "none" : "block", background: siteConfig.color, color: "white" }} className="btn btn-block" id="btnAcc" >
                  Complete Oder
              </button>
              <button style={{display: loading ? "block" : "none", background: siteConfig.color, color: "white" }} className="btn btn-block" id="btnAcc" >
                  <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" /> Loading...
              </button>
            </div>
       </form>
      </div>
    )
}
export default Checkout;