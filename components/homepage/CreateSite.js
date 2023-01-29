import Form from 'react-bootstrap/Form'
import { useState, useEffect } from "react"

const CreateSite = () => {

   const [ newConfig, setNewConfig] = useState({
      logo: "",
      logoImg: "", //to be set once image upload is completed
      color: "",
      currency: "", //to be set by default
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
    let local = data.languages.split(' ')[0] || "en-US"
    let currency = data.currency || "USD"
    setNewConfig({...newConfig, currency: `${local}, ${currency}`})

    /**
     *  return {
        local: data.languages || "en-US",
        currency: data.currency || "USD"
    }
     */
}

//UNCOMMENT THIS LATTER
/*
useEffect(()=>{
  getCurrencyCodeAndLocal()
}, [])
*/
  const handleSiteColorChange = (event) => {
    //alert(event.target.value)
    //newConfig.color
    setNewConfig({...newConfig, color: event.target.value})
  }

 const handleBtnColorChange = (event) => {
   setNewConfig({...newConfig, btnColor: event.target.value})
 }


//NEXT BIULD SITE CONFIG OBJECTS

    return (
      <>
        <div style={{width: "100%", margin: "50px"}} id="update-body" className="container cart-details">
               <center><h2>creat new site</h2></center>
                 <form  id="shipping-form" action="">
                  <div className="cart-details">
                    <h6>WEBSITE COLOR</h6>
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
                  <div className="cart-details">
                    <h6>WEBSITE INFORMATION</h6>
                    <div className="txt">
                      Store Name (in one word)
                      <input onChange={handelChange} name="logo" className="form-control" value={newConfig.logo}  type="text" placeholder="store  name" required />
                    </div>
                    <div className="txt">
                     Upload Business logo 
                     <input className="form-control" id="site-logo" type="file" />
                    </div>
                    <div className="txt">
                       Currency
                       <input onChange={handelChange} className="form-control" value={newConfig.currency} name="currency"  type="text" placeholder="currency" required />
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
                  <div className="cart-details">
                    <h6>Location/contact Info.</h6>
                    <div className="txt">
                       Enter store address
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
                    <button id="btn-b-cart" className="btn" style={{color: "white", background: '#8b045e', margin: "0 10px"}}>
                       Create
                    </button>
                  </div>
                </form>
            </div>
          </>
    )
}
export default CreateSite