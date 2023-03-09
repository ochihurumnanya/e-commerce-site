import axios from "axios"


const URL = "http://localhost:3000/"



export const addNewAdmin = (newAdminInfo) => {
  return  axios.post(`${URL}api/admin/createadmin`, newAdminInfo)
}

/**
 * 
 * @param {object containing product} product 
 * @returns 
 */
export const deleteAdmin = (admin) => {
  return  axios.post(`${URL}api/admin/deleteadmin`, admin) 
}

