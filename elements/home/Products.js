import { useState, useEffect } from 'react'
import Product from "./Pruduct"
import ReactPaginate from "react-paginate";


/**
 * 
 * @products {*array of products containing the following [{name,id,price,dsc,category,img}] } param0
 * @btnColor {*Site button color} param1
 * @returns product box
 */
const Products = ({products, btnColor, color}) => {
    let parsedProduct = JSON.parse(products)
    const [page, setPage] = useState(0);
    const [pageProducts, setPageProducts] = useState(parsedProduct);

    const productPerPage = 2;
    const numberOfRecordsVisited = page * productPerPage;
    const totalPage = Math.ceil(pageProducts.length / productPerPage )


    const changePage = ({ selected }) => {
        setPage(selected)
        
       
    }

   

    const displayProducts = pageProducts
        .slice(
            numberOfRecordsVisited,
            numberOfRecordsVisited + productPerPage
        ).map((product)=>{
            return(
                <Product 
                key={product.id}
                btnColor={btnColor}
                color={color}
                product={JSON.stringify(product)}
            />
            )
        })
     
    return (
                <>
                    <section id="products" className="shop_section layout_padding">
                     <div className="container">
                      <div id="display-cat" className="row">
                        {
                            displayProducts
                        }
                       </div>
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
                      </div>
                    </section>
                    
                </>
            )
}
export default Products;