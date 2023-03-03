import Form from 'react-bootstrap/Form'
import { useState, useEffect } from "react"
import { setUserInfo, getUserInfo, getSiteConfig, setSiteConfig} from '../../components/LocalStorage'
import Spinner from 'react-bootstrap/Spinner'
import Alert from 'react-bootstrap/Alert'
import { useRouter } from 'next/router';
import{ onAuthStateChanged } from 'firebase/auth';
import { auth, storage } from "../../utils/config/firebaseConfig"
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { createSite, verifysitename } from '../../api/site/functions'
import { getUserToken } from '../../api/auth/functions'


const CreateSite = () => {
  const [ userToken, setUserToken] = useState("")

  useEffect(()=>{
    const unsubscribe = onAuthStateChanged(auth, async(currentuser) => {
      const token = await getUserToken();
      //console.log(token)
      setUserInfo({
          _id: currentuser.uid,
          u_name: currentuser.displayName,
          u_email: currentuser.email,
          token: token,
          adminLevel: 3 //this will be set by server based on site's preference
        })
        setUserToken(token)
  }) 

    return () => {
      unsubscribe();
    }
  }, [])
  


   const [ newConfig, setNewConfig] = useState({
      logo: "", //site name
      logoImg: "", //to be set once image upload is completed
      code:"", //referral code
      color: "",
      currency: "",
      minProduct: 0,
      plan: 10,  //will be updateded based on user's sellected plane
      subscription : true, //to be updated base on user's plane or expire date
      btnColor: "",
      about: "",
      shopDsc:"",
      address: "",
      phone: "",
      email: ""
  })

  const handelChange = (event) =>{
    setNewConfig({ ...newConfig, [event.target.name]: event.target.value });
  }


  const getCurrencyCodeAndLocal = async () => {
    const responds = await fetch(
        'https://ipapi.co/json/'
    )
    let data = await responds.json()
    let local = data.languages.split(',')[0] || "en-US"
    let currency = data.currency || "USD"
    setNewConfig({...newConfig, currency: `${local} ${currency}`})
}

//UNCOMMENT THIS LATTER
useEffect(()=>{
  getCurrencyCodeAndLocal()
}, [])

 //site color picker function
  const handleSiteColorChange = (event) => {
    setNewConfig({...newConfig, color: event.target.value})
  }

 const handleBtnColorChange = (event) => {
   setNewConfig({...newConfig, btnColor: event.target.value})
 }

    const [errorMsg, setErrorMsg] = useState();
    const [apiError, setApiError] = useState("");
    const [loading, setLoading] = useState(false)
    const [progress, setProgress] = useState("")
    
    


 const create = async (event) => {
    event.preventDefault();
    setErrorMsg("");
    setApiError("");
    const { logoImg, logo, code, color, btnColor, currency, minProduct, about, shopDsc, address, phone, email } = newConfig;
    
      if (!logo.trim().length && logo.trim().length > 30) { //not this will be verified and sent from create site homePage
        setErrorMsg("Store name must be less than 30 characters")
      } else if (!color.trim().length) {
        setErrorMsg("Select website color")
      } else if (!btnColor.trim().length) {
        setErrorMsg("Select website button color")
      } else if (!currency.trim().length) {
        setErrorMsg("Enter currency infor eg (en-US USD)")
      } else if (!minProduct.length) {
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

                 //Check if site exists
                await verifysitename({logo:logo})
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
                    //make api call to create store

                    let updatedConfig = {
                      token: userToken,
                      userName: getUserInfo().u_name,
                      logo: logo,
                      code: code,
                      logoImg: downloadURL,
                      color: color,
                      btnColor: btnColor,
                      currency: currency,
                      minProduct: minProduct,
                      about: about,
                      shopDsc: shopDsc,
                      contact: {
                          address: address,
                          phone: phone,
                          email: email
                      }
                    }

                    //Creates site
                      setLoading(true)
                      const res = await createSite(updatedConfig)
                      console.log(res.data)
                      setSiteConfig(res.data)
                      //router.push("/")
                      location = "/"
                      //setLoading(false)
                })
              })
            } else{
                setErrorMsg("Select business logo")
                setLoading(false)
                setProgress(0)
              }
      }catch(error){
        //console.log(error.response.data)
        //console.log(error.response.status)
        if (error.response.status === 400) {
            setApiError('The store name you entered is not availabe try another')
            setErrorMsg('The store name you entered is not availabe try another')
        } else {
            setApiError('An error occurred while creating site check internet connection and try again')
            setErrorMsg('An error occurred while creating site check internet connection and try again')
        }
        setLoading(false)
        setProgress(0)
    }

  }
   
}

 
//NEXT BIULD SITE CONFIG OBJECTS
    return (
      <>
       <div style={{paddingBottom: "100px"}} className="container">
          <div style={{paddingBottom: "100px"}}>
               <br/>
               <center><h1>creat new site</h1></center>
               <br/>
                 <form onSubmit={create} id="shipping-form" action="">
                 { apiError && <Alert variant="danger"><center>{ apiError }</center></Alert> }
                 <div style={{background: "#dedede", padding: "20px"}}>
                    <center><h5>WEBSITE COLOR</h5></center>
                    <div className="txt">
                       Enter website color
                       <input onChange={handelChange} name="color" className="form-control" value={newConfig.color}   type="text" placeholder="website color" required />
                       <Form.Label htmlFor='siteColorPicker'>Color Picker</Form.Label>
                       <Form.Control onChange={handleSiteColorChange} type='color' id='siteColorPicker' defaultValue='' />
                    </div>
                    <div className="txt">
                       Enter website button color 
                       <input onChange={handelChange} name="btnColor" className="form-control" value={newConfig.btnColor} id="btnsite-color"  type="text" placeholder="websiteb button color" required/>
                       <Form.Label htmlFor='siteColorPicker'>Color Picker</Form.Label>
                       <Form.Control onChange={handleBtnColorChange} type='color' id='siteBtnColorPicker' defaultValue='' />
                    </div>
                  </div>
                     <br />
                  <div style={{background: "#dedede", padding: "20px"}}>
                    <center><h5>WEBSITE INFORMATION</h5></center>
                    <div className="txt">
                      Store Name (in one word) <b>Optional Naming Convention.</b> storename@countryCode, storename@city or storename@town etc
                      <input onChange={handelChange} name="logo" className="form-control" value={newConfig.logo}  type="text" placeholder="store  name" required />
                    </div>
                    <div className="txt">
                     Upload Business logo 
                     <input className="form-control" id="site-logo" type="file" />
                    </div>
                    <div className="txt">
                       Currency <b>If you must change this, it should follow the same format</b>
                       <input onChange={handelChange} className="form-control" value={newConfig.currency} name="currency"  type="text" placeholder="currency" required />
                    </div>
                    <div className="txt">
                       Notify me when my products are below 
                       <input onChange={handelChange} className="form-control" value={newConfig.minProduct} name="minProduct"  type="number" placeholder="min product" required />
                    </div>
                    <div className="txt">
                       Referral code <b>Optional</b>
                       <input onChange={handelChange} className="form-control" value={newConfig.code} name="code"  type="text" placeholder="Referral code" />
                    </div>
                    <div className="txt">
                        Short description of available product categories to be displayed on your home page
                        <textarea onChange={handelChange} name="shopDsc" value={newConfig.shopDsc} className="form-control"></textarea>
                    </div>
                    <div className="txt">
                        About us (provide information about your company or business)
                        <textarea id="about-us" onChange={handelChange} name="about"  value={newConfig.about} className="form-control"></textarea>
                    </div>
                  </div>
                  <br />
                  <div style={{background: "#dedede", padding: "20px"}}>
                    <center><h5>Location/contact Info.</h5></center>
                    <div className="txt">
                       <label>Enter store address</label>
                       <textarea id="store-address" onChange={handelChange} name="address"  value={newConfig.address} className="form-control"></textarea>
                    </div>
                    <div className="txt">
                       Enter office line
                       <input className="form-control" onChange={handelChange} name="phone" value={newConfig.phone} id="office-line"  type="tel" placeholder="office line" required/>
                    </div>
                    <div className="txt">
                       Enter office email address
                       <input className="form-control" onChange={handelChange} name="email" value={newConfig.email} id="office-email"  type="email" placeholder="office email" required/>
                    </div>
                  </div>
                  <div className="txt">
                  <center><p style={{color: "red"}}>{ errorMsg }</p></center>
                  </div>
                  <div className="txt">
                    <button type="submit"  style={{display: loading ? "none" : "block", background: '#8b045e', color: "white", width: "100%"}} className="btn btn-block" id="btnAcc" >
                        Create
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
}
export default CreateSite

/*
match /public/{storeid}/files/{filname} {
      allow read: if true;
      allow write: if request.auth != null;
}
*/