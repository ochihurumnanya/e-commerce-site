import {  getSiteConfig, getSalseReceipt } from '../../components/LocalStorage'
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react'
import { ProductsData } from '../../context/context';
import { useContext } from 'react';


const Receipt = () => {
    let router = useRouter();
    const { siteConfig } = useContext(ProductsData);
    const [recipt, setRecipt] = useState({})

    useEffect(()=>{
        setRecipt(getSalseReceipt());
    }, [])
    //getSalseReceipt


    return (
                     <>
                     <div className="card">
                             <div className="card-header bg-black"></div>
                             <div className="card-body">
                                 <div className="container">
                                 <div className="row">
                                     <div className="col-xl-12">
                                     <i className="far fa-building text-danger fa-6x float-start"></i>
                                     </div>
                                 </div>
             
                                 <div className="row">
                                     <div className="col-xl-12">
                                     <ul className="list-unstyled float-end">
                                         <li style={{fontSize: "30px", color: siteConfig.color}}>{siteConfig.logo}</li>
                                         <li>{ siteConfig.contact.address }</li>
                                         <li>{ siteConfig.contact.phone }</li>
                                         <li>{ siteConfig.contact.email }</li>
                                     </ul>
                                     </div>
                                 </div>
             
                                 <div className="row text-center">
                                     <h3 className="text-uppercase text-center mt-3" style={{fontSize: "40px"}}>Customer's Name</h3>
                                     <p>{recipt.customer ? recipt.customer : ""}</p>
                                 </div>
             
                                 <div className="row mx-3">
                                     <table className="table">
                                     <thead>
                                         <tr>
                                         <th scope="col">Description</th>
                                         <th scope="col">Qty</th>
                                         <th scope="col">Unit Price</th>
                                         <th scope="col">Amount</th>
                                         </tr>
                                     </thead>
                                     <tbody>
                                        {
                                          recipt.products ?  recipt.products.map((product)=>
                                            <tr key={product.name}>
                                              <td>{product.name}</td>
                                              <td>{product.qty}</td>
                                              <td>{product.price}</td>
                                              <td><i className="fas fa-dollar-sign"></i>{product.price * product.qty}</td>
                                            </tr>
                                          ) : ""
                                        }
                                     </tbody>
                                     </table>
                                     
                                 </div>
                                 <div className="row">
                                     <div className="col-xl-8">
                                     <ul className="list-unstyled float-end me-0">
                                         <li><span className="me-3 float-start">Total Amount:</span><i className="fas fa-dollar-sign"></i> 
                                            { recipt.products ? recipt.products.reduce((a, c) => a + c.price * c.qty, 0) : "" }
                                         </li>
                                         <li> <span className="me-5">Discount:</span><i className="fas fa-dollar-sign"></i>{ recipt.discount ? recipt.discount : "" }</li>
                                     </ul>
                                     </div>
                                 </div>
                                 <hr/>
                                 <div className="row">
                                     <div className="col-xl-8" style={{marginLeft: "60px"}}>
                                     <p className="float-end"
                                         style={{fontSize: "30px", color: "red", fontWeight: "400", fontFmily: "Arial, Helvetica, sans-serif"}}>
                                         Total:
                                         <span><i className="fas fa-dollar-sign"></i> { recipt.products ? recipt.products.reduce((a, c) => a + c.price * c.qty, 0) - recipt.discount : ""}</span></p>
                                     </div>
             
                                 </div>
             
                                 <div className="row mt-2 mb-5">
                                     <p className="fw-bold">Date: <span className="text-muted">{ recipt.date }</span></p>
                                     <p className="fw-bold mt-3">Signature:</p>
                                 </div>
             
                                 </div>
             
             
                                 <button className="btn" style={{background: siteConfig.color, marginRight: "40px", float:"right", color: "white"}} >Print</button>
                             </div>
                             <div className="card-footer bg-black"></div>
                         </div>
                     </>
    )
}
export default Receipt;