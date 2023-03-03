import axios from "axios"

const URL = "http://localhost:3000/"

// newSale - { token, address, contact, customer, logo, oderId, products }
export const addNewSale = (newSale) => {
  return  axios.post(`${URL}api/sale/sale`, newSale)
}


// info - { token, logo, date }
export const getSalse = (info) => {
  return  axios.post(`${URL}api/sale/getsalse`, info) 
}


