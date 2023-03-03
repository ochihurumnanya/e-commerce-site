import Modal from 'react-bootstrap/Modal'
import { useState, useEffect } from 'react';
import { ProductsData } from '../../../../context/context';
import { useContext } from 'react';
import { useRouter } from 'next/router';
import Spinner from 'react-bootstrap/Spinner'
import Alert from 'react-bootstrap/Alert'
import { deleteProduct } from '../../../../api/product/functions';


//initialize edit product modal
const DeleteProductModal = (props) => {

  const { allProducts, setAllproducts, siteConfig, appuser } = useContext(ProductsData);

  const [siteColor, setSiteColor] = useState('orange')


  const [apiError, setApiError] = useState("");
  const [loading, setLoading] = useState(false)
 

    /**
     *  console.log(error)
          setLoading(false)
          setApiError("An unknown error occurred check internet connectivity and try again")
     */

    useEffect(() => {
        setSiteColor(siteConfig.color)
        //console.log()
    }, [])

    //delete product
    const deleteP = async(product, removeProduct, onHide ) => {
        //console.log(product)
        try{
            setLoading(true)
            setApiError("")
            const res = await deleteProduct({...product, token: appuser.token, logo: siteConfig.logo})
            //allProducts, setAllproducts,
            removeProduct(product.id)
            onHide()
            //setAllproducts
        }catch(error){
            setLoading(false)
            setApiError("An unknown error occurred check internet connectivity and try again")
            console.log(error)
        }
        
    }


    return (
      <Modal {...props} size="lg" aria-labelledby="contained-modal-title-vcenter">
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
             <center> { props.fields.name } </center> 
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
                { apiError && <Alert variant="danger"><center>{ apiError }</center></Alert> }
                <div style={{margin: "20px"}}>
                   <center>Are you sure you want to delete {props.fields.name}?</center> 
                </div>
          </Modal.Body>
          <Modal.Footer>
            <button className="btn" style={{background: "#FF5733", marginRight: "20px", color: "white"}} onClick={props.onHide}>Close</button>
            <button className="btn" style={{display: loading ? "none" : "block", background: siteColor, marginRight: "20px", color: "white"}} onClick={()=>deleteP(props.fields, props.removeProduct, props.onHide )}>
              Yes Delete
            </button>
            <button className="btn" style={{display: loading ? "block" : "none", background: siteColor, marginRight: "20px", color: "white"}} >
              <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" /> Deleting... 
            </button>
          </Modal.Footer>
    </Modal>
    )
  }

  export default DeleteProductModal;