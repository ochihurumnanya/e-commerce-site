//import { search, searchHandler, showSuggestions, useSuggestion } from './elements/products/Search'
import styles from '../../styles/AddProduct.module.css'
import {  getSiteConfig, setSiteConfig } from '../../components/LocalStorage'
import { useState, useEffect } from 'react';
import { Hint } from 'react-autocomplete-hint'

const AddProduct = () => {
     
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

  useEffect(() => {
    const productCart = getSiteConfig().cart.category ? getSiteConfig().cart.category : [];
    setHintData(productCart);
    setSiteColor(getSiteConfig().color)
    //console.log()
  }, [])

  const handelChange = (event) =>{
    setFields({ ...fields, [event.target.name]: event.target.value });
  }

    


    
    return(
        <>
            <div style={{paddingBottom: "100px"}} className="container">
          <form id="shipping-form" action="">
            <div style={{width: "100%"}} className="cart-details">
              <h6>PRODUCT INFORMATION</h6>
                  <div className="txt">
                  Enter product name/brand
                  <input className="form-control" onChange={handelChange} value={fields.name} name="name"  type="text" placeholder="product name" required />
                  </div>
                  <div className="txt">
                    Enter product price
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
}

export default AddProduct;