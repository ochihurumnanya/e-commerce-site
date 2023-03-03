import axios from "axios"


const URL = "http://localhost:3000/"
/**
 * createSite - creates new site
 * @param data cntains all store information
 * @returns 
 */
export const createSite = (data) => {
    return  axios.post(`${URL}api/site/site`, data)
  }

  /**
 * updateSite - creates new site
 * @param data cntains all store information
 * @returns 
 */
export const updateSite = (data) => {
  return  axios.put(`${URL}api/site/site`, data)
}
 
  /**
   * 
   * @param data contains site name (logo)
   * @returns 
   */
  export const verifysitename = (data) => {
    return  axios.post(`${URL}api/site/verifysitename`, data)
  }

  export const getSiteconfig = (data) => {
    return  axios.post(`${URL}api/site/getsiteconfig`, data)
  }