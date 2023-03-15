import { ProductsData } from '../../context/context';
import { useContext } from 'react';
import { getUserInfo } from '../../components/LocalStorage'
import Modal from 'react-bootstrap/Modal'

const WelcomeAdmin = (props) => {
    const {  appuser } = useContext(ProductsData)

    const adminLevel1 = <p>
                            <b>1. Process sale(s):</b> Add product(s) to cart and generate reciept
                            for customers.
                        </p>

    const adminLevel2 = <p>
                            <b>1. Process sale(s):</b> Add product(s) to cart and generate reciept
                            for customers. <br />
                            <b>2. Manage product(s):</b> Add new product, update and delete product. <br />
                        </p>

    const adminLevel3 = <p>
                            <b>1. Process sale(s):</b> Add product(s) to cart and generate reciept
                            for customers. <br />
                            <b>2. Manage product(s):</b> Add new product, update and delete product. <br />
                            <b>3. Manage sale(s):</b> View daily sale(s) and statistics. <br />
                            <b>4. Manage admin(s):</b> Add and remove admin(s) <br />
                            <b>5. Manage subscription:</b> Make anual subscription payments/upgrade plane
                        </p>
    let currentLevel = ""
    if (appuser.adminLevel == 1) {
        currentLevel = adminLevel1
    } else if (appuser.adminLevel == 2) {
        currentLevel = adminLevel2
    } else if (appuser.adminLevel == 3) {
        currentLevel = adminLevel3
    }
    

    return(
        <Modal {...props} size="lg" aria-labelledby="contained-modal-title-vcenter">
            <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
            <center> Admin </center> 
            </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="container" style={{margin: "20px"}}>
                        Welcome {getUserInfo().u_name} admin level {appuser.adminLevel} you have the 
                        following privilage(s)
                        <br />
                        { currentLevel }
                  
                </div>
            </Modal.Body>
            <Modal.Footer>
            
            </Modal.Footer>
        </Modal>
    )
}
export default WelcomeAdmin;