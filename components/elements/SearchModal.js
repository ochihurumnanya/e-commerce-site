import Modal from 'react-bootstrap/Modal'
import { ProductsData } from '../../context/context';
import { useContext } from 'react';

const SearchModal = (props) => {
    const {  
        siteConfig,
        addRemoveCartItems, 
        btnValue, 
        setBtnValue,
        formatPrice
      } = useContext(ProductsData);

    return (
        <Modal {...props} size="lg" aria-labelledby="contained-modal-title-vcenter">
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Product
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <div className="mx-auto mt-4 mb-5 col-md-12" style={{width:"300px"}}>
            <div className="box">
            <div  className="img-box">
                <img style={{ width:"300px" }}  src={ props.searchedProduct.img } alt="" />
            </div>
            <div className="detail-box">
                <h6>
                    { props.searchedProduct.name }
                </h6>
            </div>
            <div>
                <b>Description:</b> { props.searchedProduct.dsc }
                <p>
                 <b>Price:</b> { formatPrice(props.searchedProduct.price) }
                </p>
              
            </div>
            <div style={{ background: btnValue[props.searchedProduct.id] ? siteConfig.color : siteConfig.btnColor }} className="add-to-cart btn-cat"  onClick={()=>{addRemoveCartItems(props.searchedProduct, siteConfig.btnColor, siteConfig.color, setBtnValue)}} > { btnValue[props.searchedProduct.id] ? "Remove From Cart" : "Add To Cart"}</div>
        </div> 
        </div>
        </Modal.Body>
        <Modal.Footer>
                  </Modal.Footer>
      </Modal>
    )
}
export default SearchModal;

/*
      <b>Available Qty:</b> { props.searchedProduct.qty }
*/