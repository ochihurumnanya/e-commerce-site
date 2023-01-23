
/**
 * 
 * @product {*Single product object} param0 
 * @products {*All products array} param0
 * @setProducts {*Products setter function in products component/page} param0
 * @returns 
 */
const Product = ({product, deleteProduct, sellectEditProduct}) => {
    
    return (
        <tr>
            <td><img className="cat-img" src={product.img} /></td>
            <td>{product.name}</td>
            <td>{product.price}</td>
            <td>{product.qty}</td>
            <td><button onClick={() => {sellectEditProduct(product)}}  className="btn-edit">Edit</button></td>
            <td><button onClick={()=>{deleteProduct(product.id)}} className="btn-delete">Delete</button></td>
        </tr>
    )
}
export default Product;