
import { ProductsData } from '../../../../context/context';
import { useContext } from 'react';

const MinProducts = ({sellectEditProduct, product, color}) => {
     //using global context
     const { formatPrice } = useContext(ProductsData);

    return (
        <div id="products" className="col-md-3 ">
                    <div className="box">
                    <div  className="img-box">
                        <img style={{width: "250px", heigth:"150px"}} src={ product.img } alt="" />
                    </div>
                    <div className="detail-box">
                        <h6>
                            { product.name }
                        </h6>
                    </div>
                    <div>
                        <b>Description:</b> { product.dsc }
                        <p>
                            <b>Price:</b> { formatPrice(product.price ) }
                            <div style={{color: "red"}}><b>Quantity:</b> {product.qty}. running out of stock </div>
                        </p>
                    </div>
                    <div style={{ background: color }} onClick={() => {sellectEditProduct(product)}} className="add-to-cart btn-cat"> Edit product </div>
                </div> 
            </div>
    )
}
export default MinProducts;