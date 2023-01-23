import { ProductsData } from '../../context/context';
import { useContext } from 'react';
import { useState } from 'react';



//({color, data, shopDsc})
let siteConfigs = {
  logo: "Float",
  logoImg: "/img/img4.png",
  color: "red",
  btnColor: "orange",
  about: "we sale all kinds of laptop, tablets and we also supply hole sale etc",
  shopDsc: "We sale all types of laptop and tablets",
  contact: {
    address: "Office address/location",
    phone: "+2349060399343",
    email: "Office@gmail.com"
  },
  //Array of object [{img:["url","url"...], category:["cart","cart"]}]
  cart:[
        {
          category: "laptop",
          imgurl: "/img/img4.png"
        },
        {
          category: "Tablets",
          imgurl: "/img/img5.png"
        }
  ]

}

const Update = () => {

    const { siteConfig } = useContext(ProductsData);

    const [ newConfig, setNewConfig] = useState({
        logo: siteConfig.logo,
        logoImg: siteConfig.logoImg,
        color: siteConfig.color,
        btnColor: siteConfig.btnColor,
        about: siteConfig.about,
        shopDsc: siteConfig.shopDsc,
        address: siteConfig.contact.address,
        phone: siteConfig.contact.phone,
        email: siteConfig.contact.email
    })

    const handelChange = (event) =>{
      setNewConfig({ ...newConfig, [event.target.name]: event.target.value });
    }


    const update = (event) => {
      event.preventDefault();
      const { logoImg, color, btnColor, about, shopDsc, address, phone, email } = newConfig;
      let updatedConfig = {
                  ...siteConfig,
                  logoImg: logoImg,
                  color: color,
                  btnColor: btnColor,
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

    return (
             <div style={{width: "100%", marginBottom: "100px"}} id="update-body" className="container cart-details">
                 <form onSubmit={update}  id="shipping-form" action="">
                  <div className="cart-details">
                    <h6>WEBSITE COLOR</h6>
                    <div className="txt">
                       Enter website color
                       <input onChange={handelChange} className="form-control" value={newConfig.color} name="color"  type="text" placeholder="website color" required />
                    </div>
                    <div className="txt">
                       Enter website button color 
                       <input onChange={handelChange} className="form-control" value={newConfig.btnColor} name="btnColor"  type="text" placeholder="websiteb button color" required/>
                    </div>
                  </div>
                     <br />
                  <div className="cart-details">
                    <h6>WEBSITE INFORMATION</h6>
                    <div className="txt">
                     Upload Business logo 
                     <input onChange={handelChange} className="form-control" id="site-logo" type="file" />
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
}
export default Update