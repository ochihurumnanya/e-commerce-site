import { ProductsData } from '../context/context';
import { useContext } from 'react';

const  about = () => {

    const { siteConfig } = useContext(ProductsData);

    return (
        <section id="about" class="contact_section layout_padding">
            <div class="container  ">
                <div class="row">
                    <div class="col-md-6 col-lg-5 ">
                        <div class="img-box">
                        <img
                            src={siteConfig.logoImg}
                            alt="First slide"
                            width={"300px"}
                            height={"300px"}
                        />
                        </div>
                    </div>
                    <div class="col-md-6 col-lg-7">
                        <div class="detail-box">
                            <div class="heading_container">
                                <h2>
                                About Us 
                                </h2>
                            </div>
                            <p>
                              { siteConfig.about }
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
export default about;