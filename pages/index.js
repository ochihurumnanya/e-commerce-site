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


const Home = () => {
  //using context in app
    const {allProducts, setAllproducts, siteConfig} = useContext(ProductsData);
     
    //this should be initialize from product comming from db by site logo Name
    useEffect(()=>{
      setAllproducts(allProducts)
    }, [])
           
     //const products = allProducts || [];
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
    }
export default Home;

