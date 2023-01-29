//import { search, searchHandler, showSuggestions, useSuggestion } from './elements/products/Search'
import styles from '../../styles/AddProduct.module.css'
import {  getSiteConfig, setSiteConfig } from '../../components/LocalStorage'
import { useState, useEffect } from 'react';
import { Hint } from 'react-autocomplete-hint'
import { ProductsData } from '../../context/context';
import { useContext } from 'react';
import Link from 'next/link';

const AddProduct = () => {
  const { formatPrice, siteConfig } = useContext(ProductsData);
    const [hintData, setHintData] = useState(["laptop"])
    const[fields, setFields] = useState({
      name: '',
      price: '',
      qty: '',
      cat: '',
      dsc: '',
      img: ''
  })

  const [siteColor, setSiteColor] = useState('orange')

  const [formatedPrice, setFormatedPrice] = useState('')

  useEffect(() => {
    const productCart = siteConfig.cart.category ? siteConfig.cart.category : [];
    setHintData(productCart);
    setSiteColor(siteConfig.color)
  }, [])

  const handelChange = (event) =>{
    if (event.target.name == "qty" || event.target.name == "price"){
      setFields({...fields, [event.target.name]:Number(event.target.value) < 0 || event.target.value == '' ? '' : Number(event.target.value)})
      //formatPrice
      if (event.target.name == "price") setFormatedPrice(formatPrice(Number(event.target.value)))
      
    } else {
      setFields({ ...fields, [event.target.name]: event.target.value });
    }
  }
    


  if (siteConfig.subscription){
    return(
        <>
            <div style={{paddingBottom: "100px"}} className="container">
          <form id="shipping-form" action="">
            <div style={{width: "100%"}} className="cart-details">
                  <center><h6>PRODUCT INFORMATION</h6></center>
                  <div className="txt">
                  Enter product name/brand
                  <input className="form-control" onChange={handelChange} value={fields.name} name="name"  type="text" placeholder="product name" required />
                  </div>
                  <div className="txt">
                    Enter product price. Currency({siteConfig.currency})  {formatedPrice}
                    <input className="form-control" onChange={handelChange} value={fields.price}  name="price" type="number" placeholder="product price" />
                  </div>
                  <div className="txt">
                    Enter available quantity
                    <input className="form-control" onChange={handelChange} value={fields.qty}  name="qty" type="number" placeholder="available quantity" />
                  </div>
                  <div className="txt">
                    Enter product category
                    <Hint options={hintData} allowTabFill>
                    <input  className="form-control input-with-hint" onChange={handelChange} value={fields.cat} name="cat"  type="text" placeholder="product category" />
                    </Hint>
                  </div>
                  <div className="txt">
                    Enter product description
                    <textarea className="form-control" onChange={handelChange} value={fields.dsc} name="dsc" placeholder="product description" ></textarea>
                  </div>
                  <div className="txt">
                    <label class="form-label" for="customFile">Upload Product Image</label>
                    <input type="file" class="form-control" id="customFile" />
                  </div>
                    <div style={{margin:"20px"}}>
                        <button type="submit" className="btn" style={{background: siteColor, marginRight: "20px", color: "white"}}>
                          Save Record
                        </button>
                    </div>
                </div>
                </form>
             </div>
        </>
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

export default AddProduct;