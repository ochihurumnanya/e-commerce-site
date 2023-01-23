import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Form from 'react-bootstrap/Form';
import { useRouter } from 'next/router';
import SiteHeader from "./SiteHeader";
import DashboardHeader from "./DashboardHeader";
import { Hint } from 'react-autocomplete-hint'
//this will be set in the landing page ie /storename
import { ProductsData } from '../context/context';
import { useContext } from 'react';
import { setSiteConfig, getSiteConfig, getUserInfo } from "../components/LocalStorage"
import { useState, useEffect } from 'react'
import SearchModal from './elements/SearchModal';
import Link from "next/link";







const  Header = ()=>{
  let router = useRouter();

  const { 
          allProducts, 
          siteConfig,
          setAppuser, 
          appuser,
        } = useContext(ProductsData);

  //also dashboard sttate will be set at the landing page /storename
  const [dashboard, setDashboard] = useState('false');

  const [hintData, setHintData] = useState(["laptop"]);
  
  const [modalShow, setModalShow] = useState(false)
  
  const [searchedProduct, setSearchedProduct] = useState({})

  const[fields, setFields] = useState({
    search: ''
  })

 

  useState(()=>{
    const  productName = allProducts.map((product)=>{
         return product.name;
     })
     setHintData(productName)
   }, []);

  const searchProduct = () => {
    let newProduct = allProducts.filter((product) => product.name === fields.search)
    //find and display product for editing
   if (newProduct.length !== 0) {
        console.log(newProduct);
        setSearchedProduct(newProduct[0])
        setModalShow(true) 
       
   } else {
        alert("product not found")
   }
    //setAllproducts
  }

  useState(()=>{
   const  productName = allProducts.map((product)=>{
        return product.name;
    })
    setHintData(productName)
  },[]);




  const handelChange = (event) =>{
    setFields({ ...fields, [event.target.name]: event.target.value });
  }

    return (
        <header className="header_section">
        <div className="container-fluid">
        <Navbar  expand="lg">
        <Container fluid>
        
            <a className="navbar-brand" href="/">
              <span id="logo" className="home">
                { siteConfig.logo }
              </span>
            </a>
       
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">

          <div style={{display: dashboard == "true" ? "none" : ""}}>
              <SiteHeader setDashboard={setDashboard} color={siteConfig.color} />
          </div>
          <div style={{display: dashboard == "false" ? "none" : ""}}>
             <DashboardHeader  setDashboard={setDashboard} color={siteConfig.color} />
          </div>

          <div className={ dashboard == "true" ? "d-none" : "d-block" }>
            <Form className="d-flex">
                <Hint options={hintData} allowTabFill>
                  <input 
                    type="text"
                    placeholder="Search"
                    className="form-control me-2 input-with-hint"
                    name="search"
                    onChange={handelChange}
                    aria-label="Search"
                  />
                </Hint>
                  <button onClick={()=>searchProduct()} style={{color: "white", marginLeft: "15px", background:siteConfig.color, boder:siteConfig.color}} type="button" className="btn">Search</button>
              </Form>
          </div>
          
              
            </Navbar.Collapse>
        </Container>
    </Navbar>
        </div>
        
        <SearchModal
                show={modalShow} 
                onHide={() => setModalShow(false)}
                searchedProduct={searchedProduct}
            />
      </header>
    )
}
export default Header;
