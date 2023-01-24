import { useState, useEffect } from "react";
import Product from "./elements/products/product";
import {  getSiteConfig, setSiteConfig } from '../../components/LocalStorage'
import EditProductModal from "./elements/products/ProductModal";
import { ProductsData } from '../../context/context';
import { useContext } from 'react';
import ProductSearch from "./elements/products/ProductSearch";
import ReactPaginate from "react-paginate";



const Products = () => {
  const { allProducts, setAllproducts, siteConfig } = useContext(ProductsData);
   //const [products, setProducts] = useState(allProducts);
   
   const [page, setPage] = useState(0);
   const [pageProducts, setPageProducts] = useState(allProducts);

   const productPerPage = 4;
   const numberOfRecordsVisited = page * productPerPage;
   const totalPage = Math.ceil(pageProducts.length / productPerPage )

   const changePage = ({ selected }) => {
       setPage(selected)
   }

   const [siteColor, setSiteColor] = useState('orange')

   const [modalShow, setModalShow] = useState(false)

   const [editProduct, setEditProduct] = useState({})
   
    //cartegory hint data
  const [hintData, setHintData] = useState(["laptop"])

  //product hint data
  const [productHintData, setProductHintData] = useState(["laptop"]);


  /*
  * createSlides - Create slides based on available categories
  * Returns: An object containing Arrays of sorted images and 
  * categories based on available categories
  */
 const createSlides = (products) => {
  let catImg = [];
  let categories = [];
  let allCartName =  [];

  products.forEach((product)=>{
  if (!allCartName.includes(product.category)){
    categories.push(
                  {
                    category: product.category,
                    imgurl: product.img
                  }
                );

    allCartName.push(product.category);
  }
  });
  return categories
}

   
  
   //let siteConfig=getSiteConfig();

   useEffect(()=>{

    setAllproducts(pageProducts)
  }, [pageProducts])

 

  const[fields, setFields] = useState({
    name: '',
    price: '',
    qty: '',
    cat: '',
    dsc: '',
    img: '',
    search:''
 })
 

 




 /////////////////////
 useState(()=>{
  const  productName = pageProducts.map((product)=>{
       return product.name;
   })
   setProductHintData(productName)
 }, [pageProducts]);


 
 useEffect(() => {
  const cartegories =  createSlides(pageProducts);
  setHintData(cartegories.map((category)=> category.category ));
  
  //update users sitconfig db ref
   // @cartegories-Array of object [{img:["url","url"...], category:["cart","cart"]}]
  //save site newConfig to user config db ref
  let newConfig = {...siteConfig, cart:cartegories };
  
}, [pageProducts])



const handelChange = (event) =>{
  setFields({ ...fields, [event.target.name]: event.target.value });
}
  
  //////////////////////


  const deleteProduct = (id) => {
    let newProduct = pageProducts.filter((product) => product.id !== id)
    //delete product with id from database
    setPageProducts(newProduct)
    //setAllproducts
  }

  const searchProduct = () => {
    let newProduct = pageProducts.filter((product) => product.name === fields.search)
    //find and display product for editing
    newProduct.length !== 0 ? sellectEditProduct(newProduct[0]) : alert("product not found")
    //setAllproducts
  }

  const updateProduct = () => {
    alert('hi there');
  }
  
  
  

 //sellected product to be edited
 const sellectEditProduct = (product) => {
  let nproduct = {
    name: product.name,
    price: product.price,
    qty: product.qty,
    cat: product.category,
    dsc: product.dsc,
    img: product.img

  }
 
  setFields(nproduct)
  setModalShow(true)
}


  const productsDisplay =  pageProducts.length === 0 ? "" : pageProducts
  .slice(
      numberOfRecordsVisited,
      numberOfRecordsVisited + productPerPage
  ).map(
      (product) => 
        <Product
          key={product.id}
          product={product} 
          deleteProduct={deleteProduct}  
          setProducts={setPageProducts}
          sellectEditProduct={sellectEditProduct}
        />
      )

    return (
            <div  style={{paddingBottom: "100px"}} className="container">
                   <center>
                <div className="mx-auto mt-4 mb-5" style={{width:"300px"}}>
                  <ProductSearch
                    handelChange={handelChange}
                    productHintData={ productHintData}
                    searchProduct={searchProduct}
                    siteConfig={siteConfig}
                  />
                </div>
                

                <table style={{width: "100%", paddingBottom: "30px"}}>
                    <tbody>
                        <tr>
                            <th>Image</th>
                            <th>Name</th>
                            <th>Price</th>
                            <th>Qty</th>
                            <th>action</th>
                            <th></th>
                        </tr>
                        { productsDisplay }
                    </tbody>
                  </table> 
                  <ReactPaginate 
                            previousLabel={"Previous"}
                            nextLabel={"Next"}
                            pageCount={totalPage}
                            onPageChange={changePage}
                            containerClassName={"navigationButtons"}
                            previousLinkClassName={"previousButton"}
                            nextLinkClassName={"nextButton"}
                            disabledClassName={"navigationDisabled"}
                            activeClassName={"navigationActive"}
                       />
                </center>
            <EditProductModal
                show={modalShow} 
                onHide={() => setModalShow(false)}
                updateProduct={() => updateProduct()}
                handelChange={handelChange}
                fields={fields}
                hintData={hintData}
            />
            </div>
        )
}
export default Products;


/**
 * 
 */