import {  getSiteConfig, setSiteConfig } from '../../components/LocalStorage'
import { useState, cleanCart, useEffect } from 'react'
import OderItem from './elements/oders/OderItem'
import OderDetails from './elements/oders/OderDetails'
import { ProductsData } from '../../context/context';
import { useContext } from 'react';
import Link from 'next/link';
import { getOders } from '../../api/oder/functions';






  ///fill this with products from database. 
/* All available product */
//Oders object load all users oders and push to this object
/*
let allOders = [
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
]
*/

const Home = () =>{
  const { appuser, siteConfig, formatPrice } = useContext(ProductsData);
 
  const [oders, setOders] = useState([])
  const [oder, setOder] = useState({})
  const [apiError, setApiError] = useState("");
  const [modalShow, setModalShow] = useState(false)
  

  useEffect(()=>{
    const getOder = async() => {
        try{
            //token, logo, admin(true/false)
            const res = await getOders({token: appuser.token, logo: siteConfig.logo, admin: true})
            setOders(res.data.oders)
        } catch(error) {
            setApiError("An error occured check internet connectivity")
            console.log(error)
        }
    }
    getOder();
}, [])


  const getTotalSale = () => {
    let oders = []
    oders.forEach((oder) => {
      oders.push(oder.products.reduce((a, c) => a + c.price * c.qty, 0))
    })
    return oders.reduce((a, c) => a + c, 0)
  }

  const getTotalItems = (oder) => {
    return oder.products.length
  }

  const getTotalAmount = (oder) => {

    return formatPrice(oder.products.reduce((a, c) => a + c.price * c.qty, 0))
    
  }

  const getTotalQty = (oder) => {
    return oder.products.reduce((a, c) => a + c.qty, 0)
  }


  const showSale = (oder) => {
    setOder(oder);
    setModalShow(true)
  }

  const deleteOder = (id) => {
    let newOder = oders.filter((singleOder) => singleOder.id !== id)
    //delete sale with id from database
    setOders(newOder)
}

const printReciept = (oder) => {
   //alert("receipt printed")
}

//amount={sale.products.reduce((a, c) => a + c.price * c.qty, 0)} 
  const odersDisplay =  oders.length === 0 ? "" : oders.map(
      (oder) => 
        <OderItem
          key={oder.id}
          showSale={showSale}
          deleteOder={deleteOder}
          setModalShow={setModalShow}
          getTotalItems={getTotalItems}
          getTotalAmount={getTotalAmount}
          getTotalQty={getTotalQty}
          oder={oder} 
          oders={oders}
          
        />
      )
    

    if (siteConfig.subscription){
      return (
        <div className="container" style={{paddingBottom: "100px", paddingTop: "50px"}}>
          <h2 className="mx-auto mt-4 mb-5" style={{width:"300px"}}>
            Daily Oder(s)
          </h2>
          { apiError && <Alert variant="danger"><center>{ apiError }</center></Alert> }
          <center>
            <table style={{width: "100%", paddingBottom: "30px"}}>
                <tbody>
                  <tr>
                    <th>Total Item(s)</th>
                    <th>Total Amount</th>
                    <th>Total Qty</th>
                    <th>Date</th>
                    <th>action</th>
                    <th></th>
                  </tr>
                    { odersDisplay }
                </tbody>
            </table> 
          </center>
          <OderDetails
                  show={modalShow} 
                  onHide={() => setModalShow(false)}
                  oder={oder}
                  printReciept={printReciept}
              />
        </div>
          )
    } else {
      return (
        <div className="container" style={{paddingBottom: "100px", paddingTop: "50px"}}>
          <center>
            <h3>your annual subscription has expired and you don't have enough credit for automatic renewal. kindly <Link href="/dashboard/credit">click here to subscibe</Link></h3>
          </center>
        </div>
      )
    }
    
}
export default Home;