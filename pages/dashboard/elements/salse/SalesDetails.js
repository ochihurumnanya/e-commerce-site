import Modal from 'react-bootstrap/Modal'
import { ProductsData } from '../../../../context/context';
import { useContext } from 'react'; 


 const SalesDetails = (props) => {
  const { formatPrice } = useContext(ProductsData);
      return (
        <Modal {...props} size="lg" aria-labelledby="contained-modal-title-vcenter">
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Sale Details. staff - {props.sale.staff}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <div className="container">
                      {
                      <div style={{padding: "15px"}}>
                          <h2>Order Id: {props.sale.id}</h2>
                          <p></p>
                          <h4>Shipping Info.</h4>
                          <p></p>
                          <b>ADDRESS :</b> {props.sale.address}
                          <p></p>
                          <b>STATUS :</b> <span style={{color: props.sale.status == "paid" ? "green" : "red" }}>{props.sale.status}</span>
                          <p></p>
                          <b>DATE :</b> {props.sale.date}
                          <h4>Contact Info.</h4>
                          {props.sale.contact}
  
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
                                        props.sale.products ? props.sale.products.map(
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
                                <b>Total Amount:</b> <span>{props.sale.products ? formatPrice(props.sale.products.reduce((a, c) => a + c.price * c.qty, 0)) : ""}</span>
                              </p>
                              <p>
                                <span className="me-5">Discount:</span>{ formatPrice(props.sale.discount) }
                              </p>
                              <div className="row">
                                     <div className="col-xl-8" style={{marginLeft: "60px"}}>
                                      <p className="float-end"
                                         style={{fontSize: "30px", color: "red", fontWeight: "400", fontFmily: "Arial, Helvetica, sans-serif"}}>
                                         Total:
                                         <span>{ props.sale.products ? formatPrice(props.sale.products.reduce((a, c) => a + c.price * c.qty, 0) - props.sale.discount) : ""}</span>
                                      </p>
                                     </div>
                                 </div>
                          </div>
                      </div>
                      }
                  </div>
        </Modal.Body>
        <Modal.Footer>
          <button className="btn" style={{background: "#FF5733", marginRight: "20px", color: "white"}} onClick={props.onHide}>Close</button>
        </Modal.Footer>
      </Modal>
      )
  }
  export default SalesDetails