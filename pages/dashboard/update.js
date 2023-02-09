import { ProductsData } from '../../context/context';
import { useContext } from 'react';
import { useState } from 'react';
import Form from 'react-bootstrap/Form'
import Link from 'next/link'
import { storage } from "../../utils/config/firebaseConfig"
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage"
import { updateSite, getSiteconfig } from '../../api/site/functions';
import { setSiteConfig } from '../../components/LocalStorage';
import Spinner from 'react-bootstrap/Spinner'
import Alert from 'react-bootstrap/Alert'


const Update = () => {

    const { siteConfig } = useContext(ProductsData);
    const [errorMsg, setErrorMsg] = useState();
    const [apiError, setApiError] = useState("");
    const [loading, setLoading] = useState(false)
    const [progress, setProgress] = useState("")

    const [ newConfig, setNewConfig] = useState({
        logo: siteConfig.logo,
        logoImg: siteConfig.logoImg,
        color: siteConfig.color,
        btnColor: siteConfig.btnColor,
        currency: siteConfig.currency,
        minProduct: siteConfig.minProduct,
        about: siteConfig.about,
        shopDsc: siteConfig.shopDsc,
        address: siteConfig.contact.address,
        phone: siteConfig.contact.phone,
        email: siteConfig.contact.email
    })

    const handelChange = (event) =>{
      if (event.target.name == "minProduct"){
        setNewConfig({...newConfig, [event.target.name]:Number(event.target.value) < 0 || event.target.value == '' ? '' : Number(event.target.value)})        
      } else {
        setNewConfig({ ...newConfig, [event.target.name]: event.target.value });
      }
    }

    const handleSiteColorChange = (event) => {
       //newConfig.color
       setNewConfig({...newConfig, color: event.target.value})
    }

    const handleBtnColorChange = (event) => {
      setNewConfig({...newConfig, btnColor: event.target.value})
   }



    const update = async (event) => {
      event.preventDefault();
      const { logoImg, logo, color, btnColor, currency, minProduct, about, shopDsc, address, phone, email } = newConfig;
      
      if (!logo.trim().length && logo.trim().length > 30) { //note this will be verified and sent from create site homePage
        setErrorMsg("Store name must be less than 30 characters")
      } else if (!color.trim().length) {
        setErrorMsg("Select website color")
      } else if (!logoImg.trim().length) {
        setErrorMsg("Select image file")
      } else if (!btnColor.trim().length) {
        setErrorMsg("Select website button color")
      } else if (!currency.trim().length) {
        setErrorMsg("Enter currency infor eg (en-US USD)")
      } else if (minProduct <= 0) {
        setErrorMsg("Enter minimum product quantity")
      } else if (!about.trim().length) {
        setErrorMsg("Enter about us text")
      } else if (!shopDsc.trim().length) {
        setErrorMsg("Enter stores' products categories description")
      } else if (!address.trim().length) {
        setErrorMsg("Enter stores' address")
      } else if (!phone.length) { 
        setErrorMsg("Enter office line")
      } else if (!email.trim().length) { 
        setErrorMsg("Enter office email address")
      } else{
          try{
                let file = document.getElementById("site-logo")?.files[0]
                if(file) {
                  setErrorMsg("")
                  setLoading(true)
                  setProgress(0)

                  const storageRef = ref(storage, `public/${logo}/files/${file.name}`) //note public/storename/file.name
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
                      setNewConfig({...newConfig, logoImg: downloadURL})
                      let updatedConfig = {
                        logo: logo,
                        logoImg: downloadURL,
                        color: color,
                        btnColor: btnColor,
                        currency: currency,
                        minProduct: minProduct,
                        about: about,
                        shopDsc: shopDsc,
                        admins: siteConfig.admins,
                        contact: {
                            address: address,
                            phone: phone,
                            email: email
                        }
                      }
                      //Creates site
                      setLoading(true)
                      await updateSite(updatedConfig)
                      const res = await getSiteconfig({logo:logo})
                      setSiteConfig(res.data)
                      location = "/"
                      setLoading(false)
                    }) 
                  }) 
                } else {
                  //call update api
                  let updatedConfig = {
                    logo: logo,
                    logoImg: logoImg,
                    color: color,
                    btnColor: btnColor,
                    currency: currency,
                    minProduct: minProduct,
                    about: about,
                    shopDsc: shopDsc,
                    admins: siteConfig.admins, //all current admins
                    contact: {
                        address: address,
                        phone: phone,
                        email: email
                    }
                  }
                  //Creates site
                  setLoading(true)
                  //update website
                  await updateSite(updatedConfig)
                  //get updated site config
                  const res = await getSiteconfig({logo:logo})
                  setSiteConfig(res.data)
                  location = "/"
                  setLoading(false)
                }
          }catch(error){
                  setApiError('An error occurred while creating site check internet connection and try again')
                  setErrorMsg('An error occurred while creating site check internet connection and try again')
                  setLoading(false)
                  console.log(error.response.data)
          }
     }
    }
    if (siteConfig.subscription){
      return (
              <div style={{paddingBottom: "100px"}} className="container">
              <div style={{paddingBottom: "100px"}}>                 <center><h2>UPDATE SITE</h2></center>
                 <form onSubmit={update}  id="shipping-form" action="">
                 { apiError && <Alert variant="danger"><center>{ apiError }</center></Alert> }
                  <div  style={{background: "#dedede", padding: "20px"}}>
                    <h6>WEBSITE COLOR</h6>
                    <div className="txt">
                       Enter website color
                       <input onChange={handelChange} className="form-control" value={newConfig.color} name="color"  type="text" placeholder="website color" required />
                       <Form.Label htmlFor='siteColorPicker'>Color Picker</Form.Label>
                       <Form.Control onChange={handleSiteColorChange} type='color' id='siteColorPicker' defaultValue={newConfig.color} />
                    </div>
                    <div className="txt">
                       Enter website button color 
                       <input onChange={handelChange} className="form-control" value={newConfig.btnColor} name="btnColor"  type="text" placeholder="websiteb button color" required/>
                       <Form.Label htmlFor='siteColorPicker'>Color Picker</Form.Label>
                       <Form.Control onChange={handleBtnColorChange} type='color' id='siteColorPicker' defaultValue={newConfig.btnColor} />
                    </div>
                  </div>
                     <br />
                  <div  style={{background: "#dedede", padding: "20px"}}>
                    <h6>WEBSITE INFORMATION</h6>
                    <div className="txt">
                    <div class="col-md-6 col-lg-5 ">
                        <div class="img-box">
                        <img
                            src={newConfig.logoImg}
                            alt="First slide"
                            width={"300px"}
                            height={"300px"}
                        />
                        </div>
                    </div>
                     Update Business logo 
                     <input onChange={handelChange} className="form-control" id="site-logo" type="file" />
                    </div>
                    <div className="txt">
                       Currency <b>If you must change this, it should follow the same format</b>
                       <input onChange={handelChange} className="form-control" value={newConfig.currency} name="currency"  type="text" placeholder="currency" required />
                    </div>
                    <div className="txt">
                       Notify me when my products is below 
                       <input onChange={handelChange} className="form-control" value={newConfig.minProduct} name="minProduct"  type="number" placeholder="min product" required />
                    </div>
                    <div className="txt">
                        Short description of available product categories to be displayed on your home page
                        <textarea onChange={handelChange} name="shopDsc" value={newConfig.shopDsc} className="form-control"></textarea>
                    </div>
                    <div className="txt">
                        About us (provide information about your company or business)
                        <textarea onChange={handelChange} name="about"  value={newConfig.about} className="form-control"></textarea>
                    </div>
                  </div>
                  <br />
                  <div  style={{background: "#dedede", padding: "20px"}}>
                    <h6>Location/contact Info.</h6>
                    <div className="txt">
                       Enter store address
                       <textarea onChange={handelChange} name="address" value={newConfig.address} className="form-control"></textarea>
                    </div>
                    <div className="txt">
                       Enter office line
                       <input onChange={handelChange} className="form-control" value={newConfig.phone} nmae="phone"  type="tel" placeholder="office line" required/>
                    </div>
                    <div className="txt">
                       Enter office email address
                       <input onChange={handelChange} className="form-control" value={newConfig.email}  name="email"  type="email" placeholder="office email" required/>
                    </div>
                  </div>
                  <div className="txt">
                   <center><p style={{color: "red"}}>{ errorMsg }</p></center>
                  </div>
                  <div className="txt">
                    <button type="submit"  style={{display: loading ? "none" : "block", background: siteConfig.color, color: "white", width: "100%"}} className="btn btn-block" id="btnAcc" >
                       Update site
                    </button>
                    <button style={{display: loading ? "block" : "none", background: siteConfig.color, color: "white", width: "100%"}} className="btn btn-block" id="btnAcc" >
                        <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" /> Loading... {progress}%
                    </button>
                  </div>
                </form>
            </div>
            </div>
      )
   }else{
      return (
         <div className="container" style={{paddingBottom: "100px", paddingTop: "50px"}}>
           <center>
             <h3>your annual subscription has expired and you don't have enough credit for automatic renewal. kindly <Link href="/dashboard/credit">click here to subscibe</Link></h3>
           </center>
         </div>
       )
   }
}
export default Update