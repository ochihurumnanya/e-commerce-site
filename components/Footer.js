import { ProductsData } from '../context/context';
import { useContext } from 'react';


//{color, btnColor, location, phone, email }
const Footer = () => {

    const {allProducts, setAllproducts, siteConfig} = useContext(ProductsData);

    return (
        <footer  id="contact" style={{background: siteConfig.color}} className="footer_section">
            <div className="container">
                <div className="row">
                    <div className="col-md-6 col-lg-3 footer-col">
                     <div className="footer_detail">
                      <div className="footer_social">
                       <a href="">
                        <i className="fa fa-facebook" aria-hidden="true"></i>
                       </a>
                       <a href="">
                        <i className="fa fa-twitter" aria-hidden="true"></i>
                       </a>
                       <a href="">
                        <i className="fa fa-linkedin" aria-hidden="true"></i>
                       </a>
                      </div>
                     </div>
                    </div>
                    <div className="col-md-6 col-lg-3 footer-col">
                        <div className="footer_contact">
                          <h4>
                            Reach at...
                          </h4>
                          <div className="contact_link_box">
                            <a href="">
                                <i className="fa fa-map-marker" aria-hidden="true"></i>
                                <span>
                                {siteConfig.contact.address}
                                </span>
                            </a>
                            <a href="">
                             <i className="fa fa-phone" aria-hidden="true"></i>
                             <span>
                             {siteConfig.contact.phone}
                             </span>
                            </a>
                            <a href="">
                             <i className="fa fa-envelope" aria-hidden="true"></i>
                             <span>
                             {siteConfig.contact.email}
                             </span>
                            </a>
                        </div>
                        </div>
                    </div>
                    <div className="col-md-6 col-lg-3 footer-col">
                        <div className="footer_contact">
                            <form action="#">
                                <button style={{background: siteConfig.btnColor}} >
                                    Report this site
                                </button>
                            </form>
                        </div>
                    </div>
                    <div className="col-md-6 col-lg-3 footer-col">
                        <div className="map_container">
                            <div className="map">
                                <div id="googleMap"></div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="footer-info">
                    <p>
                    &copy; <span id="displayYear"></span> All Rights Reserved By
                    <a href="">CodeRealm</a>
                    </p>
                </div>
            </div>
        </footer>
    )
}
export default Footer;