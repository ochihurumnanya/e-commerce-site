import axios from "axios"

const URL = "http://localhost:3000/"


export const makeNewOder = (oder) => {
  return  axios.post(`${URL}api/oder/oder`, oder)
}

//info contains. token, logo, admin(true/false)
export const getOders = (info) => {
  return  axios.post(`${URL}api/oder/getoders`, info)
}

//info contains. token, logo, id (oderId)
export const deleteOder = (info) => {
  return  axios.post(`${URL}api/oder/deleteoder`, info)
}

