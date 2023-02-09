//import { search, searchHandler, showSuggestions, useSuggestion } from './elements/products/Search'
//import styles from '../../styles/AddProduct.module.css'
//import {  getSiteConfig, setSiteConfig } from '../../components/LocalStorage'
import { useState, useEffect } from 'react';
import { Hint } from 'react-autocomplete-hint'
import { ProductsData } from '../../context/context';
import { useContext } from 'react';
import { getSiteConfig } from '../../components/LocalStorage';
import Link from 'next/link';
import { useRouter } from 'next/router';
import{ onAuthStateChanged } from 'firebase/auth';
import { auth, storage } from "../../utils/config/firebaseConfig"
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import Spinner from 'react-bootstrap/Spinner'
import Alert from 'react-bootstrap/Alert'
import { addNewProduct } from '../../api/product/functions';

const AddProduct = () => {
  let router = useRouter();
  const { formatPrice, siteConfig, setAllproducts, allProducts } = useContext(ProductsData);

    const [hintData, setHintData] = useState(["laptop"])
    const[fields, setFields] = useState({
      name: '',
      price: '',
      qty: '',
      cat: '',
      dsc: '',
      img: '',
      size: ''
  })

  const [siteColor, setSiteColor] = useState('orange')

  const [formatedPrice, setFormatedPrice] = useState('')

  const [errorMsg, setErrorMsg] = useState();
  const [apiError, setApiError] = useState("");
  const [loading, setLoading] = useState(false)
  const [progress, setProgress] = useState("")

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

  const bytesToMegaBytes = (bytes) => {
    return (bytes / (1024 * 1024)).toFixed(2)
  }

  /*
      name: '',
      price: '',
      qty: '',
      cat: '',
      dsc: '',
      img: '',
      size: ''
  */
  const addProduct = async (event) => {
      event.preventDefault();
      const { name, price, qty, cat, dsc, img, size } = fields;

      if (name.trim().length > 30) { //not this will be verified and sent from create site homePage
        setErrorMsg("Store name must be less than 30 characters")
      } else if (price <= 0) {
        setErrorMsg("Enter product price")
      } else if (qty <= 0) {
        setErrorMsg("Enter product quantity")
      } else if (!cat.trim().length) {
        setErrorMsg("Enter product category")
      } else if (!dsc.trim().length) {
        setErrorMsg("Enter product description")
      }  else{
        try{
          let file = document.getElementById("product-img")?.files[0]
          let sizeInMb = bytesToMegaBytes(document.getElementById("product-img")?.files[0].size)

          if(file) {
            //check used mb
            if (getSiteConfig().usedPlan+sizeInMb <= getSiteConfig().plan){
              setErrorMsg("")
              setLoading(true)
              setProgress(0)
              alert(siteConfig.logo)

              const storageRef = ref(storage, `public/${siteConfig.logo}/files/${file.name}`) //note public/storename/file.name
                  const uploadTask = uploadBytesResumable(storageRef, file)
                  
                  uploadTask.on("state_change", (snapshot) => {
                      const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100)
                        setProgress(progress)
                      },
                      (error) => {
                        setErrorMsg("An unknown error occurred check internet connectivity and try again")
                        setLoading(flase)
                        setProgress(0)
                      }, 
                      () => {
                        getDownloadURL(uploadTask.snapshot.ref).then( async(downloadURL) => {
                          //fields, 
                          setFields({...fields, size: sizeInMb, img: downloadURL})
                          //const { name, price, qty, cat, dsc, img, size } = fields;
                          const newProduct = {
                                  name: name,
                                  logo: siteConfig.logo,
                                  price: Number(price),
                                  qty: Number(qty),
                                  cat: cat,
                                  dsc: dsc,
                                  img: downloadURL,
                                  size: Number(sizeInMb)
                          }

                          setLoading(true)
                        
                          //add product to global all prosucts
                          const res = await addNewProduct(newProduct) 
                          setAllproducts([...allProducts, res.data])
                          //router.push("/")
                          location = "/dashboard/products"
                          setLoading(false)

                        })
                      }
                  )

            }else{
              setErrorMsg("You have exhausted up your current plan. Please upgrade to continue")
            }
          }else{
            setErrorMsg("Select product image")
          }
          
        }catch(error){
          console.log(error)
        }    
      }
  }
    


  if (siteConfig.subscription){
    return(
        <>
          <div style={{paddingBottom: "100px"}} className="container">
            <div style={{width: "100%"}} >
                <form onSubmit={addProduct} id="shipping-form" action="">
                      <center><h6>PRODUCT INFORMATION</h6></center>
                      { apiError && <Alert variant="danger"><center>{ apiError }</center></Alert> }
                      <div style={{background: "#dedede", padding: "20px"}}>
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
                            <input type="file" class="form-control" id="product-img" />
                          </div>
                        </div>
                        <div className="txt">
                          <center><p style={{color: "red"}}>{ errorMsg }</p></center>
                        </div>
                      <div className="txt">
                        <button type="submit"  style={{display: loading ? "none" : "block", background: '#8b045e', color: "white", width: "100%"}} className="btn btn-block" id="btnAcc" >
                            Save Record
                        </button>
                        <button style={{display: loading ? "block" : "none", background: '#8b045e', color: "white", width: "100%"}} className="btn btn-block" id="btnAcc" >
                            <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" /> Loading... {progress}%
                        </button>
                      </div>
                    </form>
                </div>
             </div>
        </>
    )
  } else {
    return (
      <div className="container" style={{paddingBottom: "100px", paddingTop: "50px"}}>
        <center>
          <h3>your annual subscription has expired and you don't have enough bonus for automatic renewal. <Link href="/dashboard/credit">click here to subscibe</Link></h3>
        </center>
      </div>
    )
  }
}

export default AddProduct;