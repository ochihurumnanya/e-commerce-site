import Form from 'react-bootstrap/Form';
import { Hint } from 'react-autocomplete-hint'

const ProductSearch = ({ handelChange, productHintData, searchProduct, siteConfig }) => {
    return (
        <Form className="d-flex">
        <Hint options={productHintData} allowTabFill>
          <input 
            type="text"
            placeholder="Search"
            className="form-control me-2 input-with-hint"
            name="search"
            onChange={handelChange}
            aria-label="Search"
          />
        </Hint>
          <button onClick={ ()=>searchProduct() } style={{color: "white", marginLeft: "15px", background:siteConfig.color, boder:siteConfig.color}} type="button" className="btn">Search</button>
      </Form>
    )
}

export default ProductSearch