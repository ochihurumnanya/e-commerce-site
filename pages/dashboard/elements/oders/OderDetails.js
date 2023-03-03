
import { setSalseReceipt } from '../../../../components/LocalStorage'
import { useState } from 'react'
import Modal from 'react-bootstrap/Modal'
import { ProductsData } from '../../../../context/context';
import { useContext } from 'react';
import { useRouter } from 'next/router';
import { addNewSale } from '../../../../api/sale/functions';
import Spinner from 'react-bootstrap/Spinner'


 const OderDetails = (props) => {
  
  let router = useRouter();
  const { siteConfig, formatPrice, appuser } = useContext(ProductsData)
  const [errorMsg, setErrorMsg] = useState()
  const [loading, setLoading] = useState(false)

  const[fields, setFields] = useState({
    discount: 0,
  })


  //{ token, address, contact, customer, logo, oderId, products }
  const handlePayment = async(oder) =>{
        try {
              setLoading(true)
              setErrorMsg("")
              const res = await addNewSale({
                  token: appuser.token, 
                  address: oder.address, 
                  customer: oder.customer,
                  contact: oder.contact,
                  logo: siteConfig.logo,
                  discount: fields.discount,
                  oderId: oder.id,
                  products: oder.products
              })  
              //let newOder = oder;
              //newOder.sataus = "paid" // set by server to paid rout (note remove latter)
              //newOder.discount = fields.discount
              //set salse receipt to local storage
              setSalseReceipt({...res.data, products: JSON.parse(res.data.products)})
              router.push('/dashboard/reciept')
        } catch (error) {
              console.log(error)
              setLoading(false)
              setErrorMsg("An unknown error occurred check internet connectivity and try again")
        }
    }

  const handelChange = (event) =>{
    setFields({ ...fields, [event.target.name]: event.target.value < 0 ? 0 : event.target.value });
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
                      {
                      <div style={{padding: "15px"}}>
                          <h2>Order Id: {props.oder.id}</h2>
                          <p></p>
                          <h4>Shipping Info.</h4>
                          <p></p>
                          <b>ADDRESS :</b> { props.oder.address }
                          <p></p>
                          <b>STATUS :</b> <span style={{ color: props.oder.status == "paid" ? "green" : "red" }}>{props.oder.status}</span>
                          <p></p>
                          <b>DATE :</b> { props.oder.date }
                          <h4>Contact Info.</h4>
                          { props.oder.contact }
                          <div className="txt">
                             Discount
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
                                      props.oder.products ? props.oder.products.map(
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
                                <b>Total:</b> <span>{props.oder.products ? formatPrice(props.oder.products.reduce((a, c) => a + c.price * c.qty, 0))  : ""}</span>
                              </p>
                          </div>
                      </div>
                      }
                      <div className="txt">
                          <center><p style={{color: "red"}}>{ errorMsg }</p></center>
                      </div>
                  </div>
        </Modal.Body>
        <Modal.Footer>
          <button className="btn" style={{background: "#FF5733", marginRight: "20px", color: "white"}} onClick={props.onHide}>Close</button>

          <button className="btn" style={{display: loading ? "none" : "block", background: siteConfig.color, marginRight: "20px", color: "white"}} onClick={()=>handlePayment(props.oder)}>
              Paid
          </button>
          <button className="btn" style={{display: loading ? "block" : "none", background: siteConfig.color, marginRight: "20px", color: "white"}} >
              <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" /> processing... 
          </button>
        </Modal.Footer>
      </Modal>
      ) 
    } 
  export default OderDetails;