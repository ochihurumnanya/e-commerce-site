import { useState, useEffect } from "react";
import Product from "./elements/products/product";
//import {  getSiteConfig, setSiteConfig } from '../../components/LocalStorage'
import EditProductModal from "./elements/products/EditProductModal";
import { ProductsData } from '../../context/context';
import { useContext } from 'react';
import ProductSearch from "./elements/products/ProductSearch";
import ReactPaginate from "react-paginate";
import Link from 'next/link';
import { createSlides } from "./elements/products/functions";
//import { deleteProduct } from "../../api/product/functions";
import DeleteProductModal from "./elements/products/DeleteDialogModal";



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

   //set edit modal show
   const [modalShow, setModalShow] = useState(false)

   //set delete modal show
   const [delModalShow, setDelModalShow] = useState(false)

   const [editProduct, setEditProduct] = useState({})

  const [hintData, setHintData] = useState(["laptop"])

  const [formatedPrice, setFormatedPrice] = useState('')

  //product hint data
  const [productHintData, setProductHintData] = useState(["laptop"]);

  //total product qty
  const [totalQty, setTotalQty] = useState(0);

  //available product qty
  const [availableQty, setAvailableQty] = useState(0);




   
  
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
      size: 0,
      logo: '',
      img: '',
      filename: '',
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


  //pid product id
  const deleteProduct = (pid) => {
    let delProduct = {...allProducts.filter((item) => item.id === pid)[0], logo: siteConfig.logo}
    setFields(delProduct)
    //console.log(delProduct)
    setDelModalShow(true)
  }

    //removes product from ui
    const removeProduct = (pid) => {
      const updatedProduct = pageProducts.filter((item) => item.id !== pid)
      //for all products
      setAllproducts(updatedProduct)
      //for pagination
      setPageProducts(updatedProduct)
      //hide modal
    }

  const searchProduct = () => {
    let newProduct = pageProducts.filter((product) => product.name === fields.search)
    //find and display product for editing
    newProduct.length !== 0 ? sellectEditProduct(newProduct[0]) : alert("product not found")
    //setAllproducts
  }
 /**
  * 
  * @param { Contains the newly updated product } newProduct 
  */
  const updatePageProduct = (newProduct) => {
     
      let updatedProducts = pageProducts.map((product) => {
        if (product.id ===  newProduct.id) {
          return newProduct
        }else{
          return  product
        }
      })
  
      setPageProducts(updatedProducts)
      setAllproducts(updatedProducts)
      setModalShow(false)
    }
    
  
  
  

 //sellected product to be edited
 const sellectEditProduct = (product) => {
  //let nproduct = {...allProducts.filter((item) => item.id === product.id)[0], logo: siteConfig.logo}
  
  let nproduct = {
      id: product.id,
      logo: siteConfig.logo,
      name: product.name,
      price: product.price,
      qty: product.qty,
      cat: product.cat,
      dsc: product.dsc,
      img: product.img,
      filename: product.filename,
      size: product.size
  }
  setTotalQty(nproduct.qty)
  setAvailableQty(nproduct.qty)
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
                      updatePageProduct={updatePageProduct}
                      handelChange={handelChange}
                      formatedPrice={formatedPrice}
                      fields={fields}
                      setFields={setFields}
                      hintData={hintData}
                      totalQty={totalQty}
                  />
                  <DeleteProductModal
                     show={delModalShow} 
                     onHide={() => setDelModalShow(false)}
                     setPageProducts={setPageProducts}
                     fields={fields}
                     setFields={setFields}
                     removeProduct={removeProduct}
                  />
                  
                  </div>
        )
    } else {
      return (
        <div className="container" style={{paddingBottom: "100px", paddingTop: "50px"}}>
          <center>
            <h3>your annual subscription has expired and you don't have enough bonus for automatic renewal. kindly <Link href="/dashboard/credit">click here to subscibe</Link></h3>
          </center>
        </div>
      )
    }
}
export default Products;


/**
 * 
 */