import  Slides  from "../elements/home/Slides";
import  Products  from "../elements/home/Products";
//setSiteConfiq  will be called on dynamic rout [].js
import { getSiteConfig, setSiteConfig } from "../components/LocalStorage"
import { useEffect, useState } from "react";
//import SellectCart from "../components/SellectCart";
import { ProductsData } from '../context/context';
import { useContext } from 'react';


//({prodImgmg, name, price, productDsc, btnColor})
//fill this with product from database limit to 20
const products = [
  {
        id:"a1",
        name:"dell 640tttt",
        price:50000,
        dsc:"Intel 64 bits os",
        category:"laptops",
        qty: 1,
        img: "/img/img4.png"
},
{
     id:"g2",
     name:"dell 640ttttt",
     price:50000,
     dsc:"Intel 64 bits os",
     category:"smart watches",
     qty: 1,
     img: "/img/img5.png"
  },
  {
     id:"u63",
     name:"dell 640tttt",
     price:50000,
     dsc:"Intel 64 bits os",
     category:"electronics",
     qty: 1,
     img: "/img/img6.jpg"
  },
  {
    id:"u69tttt",
    name:"dell 640",
    price:50000,
    dsc:"Intel 64 bits os",
    category:"electronics",
    qty: 1,
    img: "/img/img6.jpg"
},
{
    id:"u690ttt",
    name:"dell 640",
    price:50000,
    dsc:"Intel 64 bits os",
    category:"electronics",
    qty: 1,
    img: "/img/img4.png"
},
{
    id:"u670ttt",
    name:"dell 640",
    price:50000,
    dsc:"Intel 64 bits os",
    category:"electronics",
    qty: 1,
    img: "/img/img6.jpg"
}
];



//note add created at field optional
let siteConfigs = {
  logo: "Float",
  logoImg: "/img/img4.png",
  color: "red",
  btnColor: "orange",
  about: "we sale all kinds of laptop, tablets and we also supply hole sale etc",
  shopDsc:"We sale all types of laptop and tablets",
  currency: "en-NG NGN",
  minProduct: 2,
  subscription : true,
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


const Home = () => {
    //using global context
    const {allProducts, setAllproducts, siteConfig, setUserCurencyCodeAndLocal} = useContext(ProductsData);
    
    useEffect(()=>{
      setUserCurencyCodeAndLocal(siteConfig.currency)
    }, [])
    
   /*
    useEffect(()=>{
      setSiteConfig(siteConfigs)
    }, [])
   */

    
    
     //const products = allProducts || [];
     if (siteConfig.cart){
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

