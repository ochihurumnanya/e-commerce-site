import Modal from 'react-bootstrap/Modal'
import { Hint } from 'react-autocomplete-hint'
import {  getSiteConfig } from '../../../../components/LocalStorage'
import { useState, useEffect } from 'react';
import { ProductsData } from '../../../../context/context';
import { useContext } from 'react';
import { bytesToMegaBytes } from './functions';
import { updateProduct } from '../../../../api/product/functions';
import { storage } from "../../../../utils/config/firebaseConfig"
import { useRouter } from 'next/router';
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import Spinner from 'react-bootstrap/Spinner'
import Alert from 'react-bootstrap/Alert'


//initialize edit product modal
const EditProductModal = (props) => {
  let router = useRouter();
  const { siteConfig, appuser } = useContext(ProductsData);

  const [siteColor, setSiteColor] = useState('orange')


  const [errorMsg, setErrorMsg] = useState();
  const [apiError, setApiError] = useState("");
  const [loading, setLoading] = useState(false)
  const [progress, setProgress] = useState("")

 /**
  * 
  * @param {contains data to be updated} fields 
  * @param {fields seter function} setFields 
  * @param {function to update the ui products} updatePageProduct
  * @param {to hide pop up modal} onHide
  */
 const updateNewProduct = async(fields, setFields, updatePageProduct, onHide) => {
      if (fields.name.trim().length > 30) { //not this will be verified and sent from create site homePage
        setErrorMsg("Store name must be less than 30 characters")
      } else if (fields.price <= 0) {
        setErrorMsg("Enter product price")
      } else if (fields.qty <= 0) {
        setErrorMsg("Enter product quantity")
      } else if (!fields.cat.trim().length) {
        setErrorMsg("Enter product category")
      } else if (!fields.dsc.trim().length) {
        setErrorMsg("Enter product description")
      } else if (!fields.logo.trim().length) {
        setErrorMsg("Enter product description")
      }  else {
        console.log(fields)
        try{
          let file = document.getElementById("product-img")?.files[0]

          setErrorMsg("")
          setLoading(true)
          setProgress(0)
          if(file) {
            let sizeInMb = bytesToMegaBytes(document.getElementById("product-img")?.files[0].size)
            if (Number(getSiteConfig().usedPlan)+Number(sizeInMb) <= getSiteConfig().plan){
                const storageRef = ref(storage, `public/${siteConfig.logo}/files/${file.name}`) //note public/storename/file.name
                  const uploadTask = uploadBytesResumable(storageRef, file)
                  
                  uploadTask.on("state_change", (snapshot) => {
                      const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100)
                        setProgress(progress)
                      },
                      (error) => {
                        setErrorMsg("An unknown error occurred check internet connectivity and try again")
                        setApiError("An unknown error occurred check internet connectivity and try again")
                        setLoading(flase)
                        setProgress(0)
                      },
                      () => {
                        getDownloadURL(uploadTask.snapshot.ref).then( async(downloadURL) => {
                          //fields, 
                          setFields({...fields, size: sizeInMb, img: downloadURL})
                        
                          //const { id, logo, name, price, qty, cat, dsc, img, size } = req.body;
                          const newProduct = { ...fields, filename: file.name, size: sizeInMb, img: downloadURL, token:appuser.token, logo:siteConfig.logo  }
                          
                          setLoading(true)
                          //add product to global all prosucts
                          const res = await updateProduct(newProduct) 
                          //update ui
                          updatePageProduct(res.data)
                          //updatePageProduct(newProduct)
                          //hide modal
                          onHide();
                          //router.push("/dashboard/products")
                          setLoading(false)
                        })
                      }
                  )
            } else {
              setErrorMsg("You have exhausted up your current plan. Please upgrade to continue")
              setLoading(false)
              setProgress(0)
            }
          } else {
             //const { id, logo, name, price, qty, cat, dsc, img, size } = req.body;
             const newProduct = { ...fields, token:appuser.token  }
             
             setLoading(true)
             //add product to global all prosucts
             const res = await updateProduct(newProduct)
             //update ui
             updatePageProduct(res.data)
             //hide modal
             onHide();
             setLoading(false)
          }
        } catch(error) {
          console.log(error)
          setErrorMsg("")
          setLoading(false)
          setProgress(0)
          setErrorMsg("An unknown error occurred check internet connectivity and try again")
        }
      }
 }

    useEffect(() => {
        setSiteColor(siteConfig.color)
        //console.log()
    }, [])

    return (
      <Modal {...props} size="lg" aria-labelledby="contained-modal-title-vcenter">
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
              Edit product
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
                { apiError && <Alert variant="danger"><center>{ apiError }</center></Alert> }
                <div className="txt">
                Enter product name/brand
                <input className="form-control" onChange={props.handelChange} value={props.fields.name} name="name"  type="text" placeholder="product name" required />
                </div>
                <div className="txt">
                  Enter product price. Currency({siteConfig.currency}) {props.formatedPrice}
                  <input className="form-control" onChange={props.handelChange} value={props.fields.price}  name="price" type="number" placeholder="product price" />
                </div>
                <div className="txt">
                  Enter product quantity. [ Total available quantity = <b>{props.totalQty}</b> ]
                  <input className="form-control" onChange={props.handelChange} value={props.fields.qty}  name="qty" type="number" placeholder="Enter quantity" />
                </div>
                <div className="txt">
                  Enter product category
                  <input  className="form-control input-with-hint" onChange={props.handelChange} value={props.fields.cat} name="cat"  type="text" placeholder="product category" />
                </div>
                <div className="txt">
                  Enter product description
                  <textarea className="form-control" onChange={props.handelChange} value={props.fields.dsc} name="dsc" placeholder="product description" ></textarea>
                </div>
                <div className="txt">
                          <img
                            style={{width: '400px', height: '300px'}}
                            src={props.fields.img}
                            alt={props.fields.name}
                          />
                </div>
                <div className="txt">
                  <label class="form-label" for="customFile">Upload New Product Image</label>
                  <input type="file" class="form-control" id="product-img" />
                </div>
                <div className="txt">
                    <center><p style={{color: "red"}}>{ errorMsg }</p></center>
                </div>
          </Modal.Body>
          <Modal.Footer>
            <button className="btn" style={{background: "#FF5733", marginRight: "20px", color: "white"}} onClick={props.onHide}>Close</button>
            <button className="btn" style={{display: loading ? "none" : "block", background: siteColor, marginRight: "20px", color: "white"}} onClick={()=>updateNewProduct(props.fields, props.setFields, props.updatePageProduct, props.onHide )}>
              Update
            </button>
            <button className="btn" style={{display: loading ? "block" : "none", background: siteColor, marginRight: "20px", color: "white"}} >
              <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" /> Loading... {progress}%
            </button>
          </Modal.Footer>
    </Modal>
    )
  }

  export default EditProductModal;