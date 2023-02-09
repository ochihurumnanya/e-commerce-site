  import axios from "axios"

  const URL = "http://localhost:3000/"

  export const addNewProduct = (newProduct) => {
    return  axios.post(`${URL}api/addproduct`, newProduct)
  }