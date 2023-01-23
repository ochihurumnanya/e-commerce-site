import Modal from 'react-bootstrap/Modal'
import { Hint } from 'react-autocomplete-hint'
import {  getSiteConfig, setSiteConfig } from '../../../../components/LocalStorage'
import { useState, useEffect } from 'react';
//initialize edit product modal
const EditProductModal = (props) => {

const [siteColor, setSiteColor] = useState('orange')


    useEffect(() => {
        setSiteColor(getSiteConfig().color)
        //console.log()
      }, [])
    
    return (
      <Modal {...props} size="lg" aria-labelledby="contained-modal-title-vcenter">
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Edit product
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
      <div className="txt">
            Enter product name/brand
            <input className="form-control" onChange={props.handelChange} value={props.fields.name} name="name"  type="text" placeholder="product name" required />
            </div>
            <div className="txt">
              Enter product price
              <input className="form-control" onChange={props.handelChange} value={props.fields.price}  name="price" type="number" placeholder="product price" />
            </div>
            <div className="txt">
              Enter available quantity <b>Note</b> total quantity should by {props.fields.qty} + new quantity
              <input className="form-control" onChange={props.handelChange} value={props.fields.qty}  name="qty" type="number" placeholder="available quantity" />
            </div>
            <div className="txt">
              Enter product category
              <Hint options={props.hintData} allowTabFill>
              <input  className="form-control input-with-hint" onChange={props.handelChange} value={props.fields.cat} name="cat"  type="text" placeholder="product category" />
              </Hint>
            </div>
            <div className="txt">
              Enter product description
              <textarea className="form-control" onChange={props.handelChange} value={props.fields.dsc} name="dsc" placeholder="product description" ></textarea>
            </div>
            <div className="txt">
                      <img
                        style={{width: '400px', height: '300px'}}
                        src={props.fields.img}
                        alt={props.fields.name}
                      />
            </div>
            <div className="txt">
              <label class="form-label" for="customFile">Upload Product Image</label>
              <input type="file" class="form-control" id="customFile" />
            </div>
      </Modal.Body>
      <Modal.Footer>
        <button className="btn" style={{background: "#FF5733", marginRight: "20px", color: "white"}} onClick={props.onHide}>Close</button>
        <button className="btn" style={{background: siteColor, marginRight: "20px", color: "white"}} onClick={props.updateProduct}>Update</button>
      </Modal.Footer>
    </Modal>
    )
  }

  export default EditProductModal;