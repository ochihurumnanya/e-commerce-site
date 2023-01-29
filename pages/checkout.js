
import { getUserInfo, getShipping, setShipping, getSiteConfig, cleanCart } from '../components/LocalStorage.js'
import { useState, useEffect } from 'react'

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
    const[fields, setFields] = useState({
      name: '',
      email: '',
      phone: '',
      address: ''
    })

    let siteConfig=getSiteConfig();
  
    useEffect(()=>{
      siteConfig = getSiteConfig()
    }, [])
    
    const handelChange = (event) =>{
        setFields({ ...fields, [event.target.name]: event.target.value });
    }

    const submitShipping = (event) => {
        event.preventDefault();
        setShipping(fields)
        //Note save cart items and shipping to database before prodeding to line 20
        //using the above object model
        cleanCart('shipping');
        cleanCart('cartItems');
        location = "/oder"
       
    }
    useEffect(()=>{
        const { u_name, u_email } = getUserInfo();
        const { email, phone, address } = getShipping();
        setFields({...fields, name:u_name || '', email:email || u_email || '', phone:phone || '', address:address || ''})
    }, [])
    return (
        <div className="container">
        <form onSubmit={submitShipping} id="shipping-form" action="">
          <div className="cart-details">
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
           <button type="submit" className="btn" style={{margin: '10px',  background: siteConfig.color, color: 'white'}}>
             Complete Oder
           </button>
       </form>
      </div>
    )
}
export default Checkout;