import { formatPrice } from "../../../../currency/Currency"


/**
 * 
 * @product {*Single product object} param0 
 * @products {*All products array} param0
 * @setProducts {*Products setter function in products component/page} param0
 * @returns 
 */
const Product = ({product, deleteProduct, sellectEditProduct, low}) => {
    
    return (
        <tr style={{color: low ? "red" : ""}}>
            <td><img className="cat-img" src={product.img} /></td>
            <td>{product.name}</td>
            <td>{formatPrice(product.price)}</td>
            <td>{product.qty} {low ? "Running out of stock" : ""}</td>
            <td><button onClick={() => {sellectEditProduct(product)}}  className="btn-edit">Edit</button></td>
            <td><button onClick={()=>{deleteProduct(product.id)}} className="btn-delete">Delete</button></td>
        </tr>
    )
}
export default Product;