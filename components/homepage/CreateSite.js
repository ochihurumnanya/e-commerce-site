
import { useState } from "react"

const CreateSite = () => {
   const [ newConfig, setNewConfig] = useState({
      logo: "",
      logoImg: "",
      color: "",
      btnColor: "",
      about: "",
      shopDsc:"",
      address: "",
      phone: "",
      email: ""
  })


    return (
      <>
        <div style={{width: "100%", margin: "50px"}} id="update-body" className="container cart-details">
               <center><h2>creat new site</h2></center>
                 <form  id="shipping-form" action="">
                  <div className="cart-details">
                    <h6>WEBSITE COLOR</h6>
                    <div className="txt">
                       Enter website color
                       <input className="form-control" value={newConfig.color} id="site-color"  type="text" placeholder="website color" required />
                    </div>
                    <div className="txt">
                       Enter website button color 
                       <input className="form-control" value={newConfig.btnColor} id="btnsite-color"  type="text" placeholder="websiteb button color" required/>
                    </div>
                  </div>
                     <br />
                  <div className="cart-details">
                    <h6>WEBSITE INFORMATION</h6>
                    <div className="txt">
                      Store Name (in one word)
                      <input className="form-control" value={newConfig.about} id="store-name"  type="text" placeholder="store  name" required />
                    </div>
                    <div className="txt">
                     Upload Business logo 
                     <input className="form-control" id="site-logo" type="file" />
                    </div>
                    <div className="txt">
                        Short description of available product categories to be displayed on your home page
                        <textarea id="short-dsc" value={newConfig.shopDsc} className="form-control"></textarea>
                    </div>
                    <div className="txt">
                        About us (provide information about your company or business)
                        <textarea id="about-us"  value={newConfig.about} className="form-control"></textarea>
                    </div>
                  </div>
                  <br />
                  <div className="cart-details">
                    <h6>Location/contact Info.</h6>
                    <div className="txt">
                       Enter store address
                       <textarea id="store-address" value={newConfig.address} className="form-control"></textarea>
                    </div>
                    <div className="txt">
                       Enter office line
                       <input className="form-control" value={newConfig.phone} id="office-line"  type="tel" placeholder="office line" required/>
                    </div>
                    <div className="txt">
                       Enter office email address
                       <input className="form-control" value={newConfig.email} id="office-email"  type="email" placeholder="office email" required/>
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