  import axios from "axios"


  const URL = "http://localhost:3000/"

  

  export const addNewProduct = (newProduct) => {
    return  axios.post(`${URL}api/product/product`, newProduct)
  }

  export const updateProduct = (Product) => {
    return  axios.put(`${URL}api/product/product`, Product)
  }
 
  export const getProducts = (store) => {
    return  axios.post(`${URL}api/product/getproduct`, store) 
  }

  /**
   * 
   * @param {object containing product} product 
   * @returns 
   */
  export const deleteProduct = (product) => {
    return  axios.post(`${URL}api/product/deleteproduct`, product) 
  }

 