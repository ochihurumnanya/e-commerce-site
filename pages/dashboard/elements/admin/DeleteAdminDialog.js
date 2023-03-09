import Modal from 'react-bootstrap/Modal'
import { useState, useEffect } from 'react';
import { ProductsData } from '../../../../context/context';
import { useContext } from 'react';
import { useRouter } from 'next/router';
import Spinner from 'react-bootstrap/Spinner'
import Alert from 'react-bootstrap/Alert'
import { deleteProduct } from '../../../../api/product/functions';
import { deleteAdmin } from '../../../../api/admin/functions';


//initialize edit product modal
const DeleteAdminModal = (props) => {

  const {  siteConfig, appuser } = useContext(ProductsData)
  const [allAdmins, setAllAdmins] = useState(appuser.admins.admins)
  const [siteColor, setSiteColor] = useState('orange')


  const [apiError, setApiError] = useState("");
  const [loading, setLoading] = useState(false)
 

    /**
     *  const newAdmin = {
                    email: fields.email,
                    token: appuser.token,
                    logo: siteConfig.logo
                }
     */

    useEffect(() => {
        setSiteColor(siteConfig.color)
        //console.log()
    }, [])

    //delete admin
    const deleteA = async(admin, removeAdmin, onHide ) => {
        //console.log(product)
        if (allAdmins.length >= 0){
            try{
                setLoading(true)
                setApiError("")
                const res = await deleteAdmin({uid: admin.uid, token: appuser.token, logo: siteConfig.logo})
                //allProducts, setAllproducts,
                removeAdmin(admin.uid)
                onHide()
                //setAllproducts
            }catch(error){
                setLoading(false)
                setApiError("An unknown error occurred check internet connectivity and try again")
                console.log(error)
            }
        } else {
          setLoading(false)
          setApiError("You cannot remove all admins")
        }
    
        
    }


    return (
      <Modal {...props} size="lg" aria-labelledby="contained-modal-title-vcenter">
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
             <center> Admin removal dialog </center> 
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
                { apiError && <Alert variant="danger"><center>{ apiError }</center></Alert> }
                <div style={{margin: "20px"}}>
                   <center>Are you sure you want to remove {props.admin.name} from admin?</center> 
                </div>
          </Modal.Body>
          <Modal.Footer>
            <button className="btn" style={{background: "#FF5733", marginRight: "20px", color: "white"}} onClick={props.onHide}>Close</button>
            <button className="btn" style={{display: loading ? "none" : "block", background: siteColor, marginRight: "20px", color: "white"}} onClick={()=>deleteA(props.admin, props.removeAdmin, props.onHide )}>
              Yes Delete
            </button>
            <button className="btn" style={{display: loading ? "block" : "none", background: siteColor, marginRight: "20px", color: "white"}} >
              <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" /> Deleting... 
            </button>
          </Modal.Footer>
    </Modal>
    )
  }

  export default DeleteAdminModal;