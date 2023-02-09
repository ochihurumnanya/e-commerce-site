import  Slides  from "../elements/home/Slides";
import  Products  from "../elements/home/Products";
//setSiteConfiq  will be called on dynamic rout [].js
import { getSiteConfig, setSiteConfig } from "../components/LocalStorage"
import { useEffect, useState } from "react";
//import SellectCart from "../components/SellectCart";
import { ProductsData } from '../context/context';
import { useContext } from 'react';



const Home = () => {
    //using global context
    const {allProducts, setAllproducts, siteConfig, setUserCurencyCodeAndLocal} = useContext(ProductsData);
    
    //useEffect(()=>{
      //setUserCurencyCodeAndLocal(siteConfig.currency)
    //}, [])
    
   /*
    useEffect(()=>{
      setSiteConfig(siteConfigs)
    }, [])
    */
   

    
    
     //const products = allProducts || [];
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
          </>
        )
      } else {
        return (<center><h1 style={{paddingBottom: "200px"}}>{siteConfig.logo} is under construction</h1></center>)
      }
  }
  
export default Home;

