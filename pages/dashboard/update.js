import { ProductsData } from '../../context/context';
import { useContext } from 'react';
import { useState } from 'react';
import Form from 'react-bootstrap/Form'
import Link from 'next/link';



const Update = () => {

    const { siteConfig } = useContext(ProductsData);

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
      //setNewConfig({ ...newConfig, [event.target.name]: event.target.value });
      if (event.target.name == "minProduct"){
        setNewConfig({...newConfig, [event.target.name]:Number(event.target.value) < 0 || event.target.value == '' ? '' : Number(event.target.value)})        
      } else {
        setNewConfig({ ...newConfig, [event.target.name]: event.target.value });
      }
    }

    const handleSiteColorChange = (event) => {
       //alert(event.target.value)
       //newConfig.color
       setNewConfig({...newConfig, color: event.target.value})
    }

    const handleBtnColorChange = (event) => {
      setNewConfig({...newConfig, btnColor: event.target.value})
   }



    const update = (event) => {
      event.preventDefault();
      const { logoImg, color, btnColor, currency, minProduct, about, shopDsc, address, phone, email } = newConfig;
      let updatedConfig = {
                  ...siteConfig,
                  logoImg: logoImg,
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
      console.log(updatedConfig)
    }
    if (siteConfig.subscription){
      return (
             <div style={{width: "100%", marginBottom: "100px"}} id="update-body" className="container cart-details">
                 <center><h2>UPDATE SITE</h2></center>
                 <form onSubmit={update}  id="shipping-form" action="">
                  <div className="cart-details">
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
                  <div className="cart-details">
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
                     Upload Business logo 
                     <input onChange={handelChange} className="form-control" id="site-logo" type="file" />
                    </div>
                    <div className="txt">
                       Currency
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
                  <div className="cart-details">
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
                    <button type="submit"  id="btn-b-cart" className="btn" style={{color: "white", background: siteConfig.color, margin: "0 10px"}}>
                       Update site
                    </button>
                  </div>
                </form>
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