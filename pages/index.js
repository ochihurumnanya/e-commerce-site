import  Slides  from "../elements/home/Slides";
import  Products  from "../elements/home/Products";
//import SellectCart from "../components/SellectCart";
import { ProductsData } from '../context/context';
import { useContext } from 'react';



const Home = () => {
    //using global context
    const {allProducts, siteConfig} = useContext(ProductsData);
    
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

