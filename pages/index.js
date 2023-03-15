import  Slides  from "../elements/home/Slides";
import  Products  from "../elements/home/Products";
//import SellectCart from "../components/SellectCart";
import { ProductsData } from '../context/context';
import { useContext } from 'react';
import WelcomeAdmin from "../elements/home/WelcomeAdmin";
import { useState, useEffect } from "react";



const Home = () => {
    //using global context
    const {allProducts, siteConfig, appuser} = useContext(ProductsData);
    const [welcomeModalShow, setWelcomeModalShow] = useState(false)
    //setModalShow(false)

    useEffect(()=>{
      if (appuser.adminLevel >= 1) {
        setWelcomeModalShow(true)
      }
    }, [])

     if (allProducts.length){
        return (
          <>
            <Slides 
              color={siteConfig.color} 
              categories={siteConfig.cart}
              shopDsc={siteConfig.shopDsc}
            />
            
            <Products 
              products={JSON.stringify(allProducts)} 
              btnColor={siteConfig.btnColor}
              color={siteConfig.color}
            />
            
            <WelcomeAdmin
                      show={welcomeModalShow}
                      onHide={() => setWelcomeModalShow(false)}
            />
          </>
        )
      } else {
        return (<center><h1 style={{paddingBottom: "200px"}}>{siteConfig.logo} is under construction</h1></center>)
      }
  }
  
export default Home;

