import { useState, useEffect } from "react";
import Product from "./elements/products/product";
import {  getSiteConfig, setSiteConfig } from '../../components/LocalStorage'
import EditProductModal from "./elements/products/EditProductModal";
import { ProductsData } from '../../context/context';
import { useContext } from 'react';
import ProductSearch from "./elements/products/ProductSearch";
import ReactPaginate from "react-paginate";
import Link from 'next/link';



const Products = () => {
  const { allProducts, setAllproducts, siteConfig, formatPrice } = useContext(ProductsData);
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

  const [hintData, setHintData] = useState(["laptop"])

  const [formatedPrice, setFormatedPrice] = useState('')

  //product hint data
  const [productHintData, setProductHintData] = useState(["laptop"]);

  //total product qty
  const [totalQty, setTotalQty] = useState(0);

  //available product qty
  const [availableQty, setAvailableQty] = useState(0);
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
    id: '',
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
}, [pageProducts])


const handelChange = (event) =>{
  if (event.target.name == "qty" || event.target.name == "price"){
    setFields({...fields, [event.target.name]:Number(event.target.value) < 0 || event.target.value == '' ? '' : Number(event.target.value)})
    //formatPrice
    if (event.target.name == "price") setFormatedPrice(formatPrice(Number(event.target.value)))
    if (event.target.name == "qty") {
      Number(event.target.value) < 0 || event.target.value == '' ? setTotalQty(availableQty) : setTotalQty(Number(event.target.value)+availableQty)
    }
    //availableQty}
  } else {
    setFields({ ...fields, [event.target.name]: event.target.value });
  }
}



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
  
    
    let newProductFields = {
         id: fields.id,
         name: fields.name,
         price: fields.price,
         dsc: fields.dsc,
         cat: fields.cat,
         qty:totalQty,
         img: fields.img,
  }

  //update product with product id newProductFields to db befor proceeding 
     
      let updatedProducts = pageProducts.map((product) => {
        if (product.id ===  newProductFields.id) {
          //alert("ok")
          return newProductFields
        }else{
          //alert("no")
          return  product
        }
      })
  
      setPageProducts(updatedProducts)
      setModalShow(false)
    
    }
    
  
  
  

 //sellected product to be edited
 const sellectEditProduct = (product) => {
  let nproduct = {
    id: product.id,
    name: product.name,
    price: product.price,
    qty: product.qty,
    cat: product.category,
    dsc: product.dsc,
    img: product.img

  }
  setTotalQty(product.qty)
  setAvailableQty(product.qty)
  setFields(nproduct)
  setModalShow(true)
}


  const productsDisplay =  pageProducts.length === 0 ? "" : pageProducts
                              .slice(
                                  numberOfRecordsVisited,
                                  numberOfRecordsVisited + productPerPage
                              ).map(
                                  (product) => 
                                    {
                                      if (product.qty > siteConfig.minProduct){
                                        return(
                                          <Product
                                          key={product.id}
                                          product={product} 
                                          deleteProduct={deleteProduct}  
                                          setProducts={setPageProducts}
                                          sellectEditProduct={sellectEditProduct}
                                          low={false}
                                        />
                                        )
                                      }
                                    
                                  }
                                  )
                                  
      //filter out products that are less than minProduct allowed
      //const minProducts = pageProducts.filter((product)=> product.qty <= siteConfig.minProduct)
      //display minProducts
      const displayMinProducts = pageProducts.filter((product)=> product.qty <= siteConfig.minProduct).map(
        (product) => 
        <Product
          key={product.id}
          product={product} 
          deleteProduct={deleteProduct}  
          setProducts={setPageProducts}
          sellectEditProduct={sellectEditProduct}
          low={true}
        />
        )
    

      if (siteConfig.subscription){
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
                    </center>
                    <center>
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
                              { displayMinProducts }

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
                      updateProduct={updateProduct}
                      handelChange={handelChange}
                      formatedPrice={formatedPrice}
                      fields={fields}
                      hintData={hintData}
                      totalQty={totalQty}
                  />
                  </div>
        )
    }else{
      return (
        <div className="container" style={{paddingBottom: "100px", paddingTop: "50px"}}>
          <center>
            <h3>your annual subscription has expired and you don't have enough credit for automatic renewal. kindly <Link href="/dashboard/credit">click here to subscibe</Link></h3>
          </center>
        </div>
      )
    }
}
export default Products;


/**
 * 
 */