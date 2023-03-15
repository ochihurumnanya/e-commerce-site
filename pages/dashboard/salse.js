
import { useState, useEffect } from "react"
import SalesItem from "./elements/salse/SalseItem"
import SalesDetails from "./elements/salse/SalesDetails"
import { ProductsData } from '../../context/context'
import { useContext } from 'react'
import Link from 'next/link'
import { getSalse } from "../../api/sale/functions"
import Alert from 'react-bootstrap/Alert'
import dayjs from 'dayjs'
import SalseStat from "./elements/salse/SalseStat"
import Spinners from "../../general/Spinner"
import Spinner from 'react-bootstrap/Spinner'


//{props.sale.products.reduce((a, c) => a + c.price * c.qty, 0)}
  const Salse = () => {
    const { formatPrice, siteConfig, appuser } = useContext(ProductsData);
    const [salse, setSalse] = useState([]) //all salse
    const [sale, setSale] = useState({}) //Single sale
    const [salseDate, setSalseDate] = useState("")//salse date
    const [salseUserDate, setSalseUserDate] = useState("")//salse user date
    const [salseStaff, setSalseStaff] = useState("")//salse staff
    const [modalShow, setModalShow] = useState(false)
    const [apiError, setApiError] = useState("")
    const [ apiLoading, setApiLoading ]  = useState(false)
    //waiting to get all user oders
    const [ loading, setLoading ]  = useState(true)


   
    /**
     * 
     * siteConfig.admins.admins
      [ 
                    {
                        name: userName,
                        uid: uid,
                        cat: "All",
                        level: 3
                    }  
      ]
     */

    const getTotalSale = () => {
      let products = []
      salse.forEach((sale) => {
        products.push(sale.products.reduce((a, c) => a + c.price * c.qty, 0))
      })
      return formatPrice(products.reduce((a, c) => a + c, 0))
    }

    const getAllProductsStatFromSalse = (salse) => {
      //get all products from all salse
      let allproducts = []
      salse.forEach((sale) =>{
       const saleProducts = sale.products.map((product) => product )
       let tempProducts = [...allproducts, ...saleProducts]
       allproducts = tempProducts
      }) 
      
      //sorted product stat
      const productStats = []
      //sorted product name
      const productNames = []

      allproducts.forEach((product) => {
          if (!productNames.includes(product.name)) {
              productNames.push(product.name)
              productStats.push(0)
          }

          if (productNames.includes(product.name)) {
            const index = productNames.indexOf(product.name)
            productStats[index] += product.qty
          }
      })
      return {
        productNames: [...productNames.map((name, index) => name+" - "+productStats[index])],
        productStats: productStats
      }

    }


    const deleteSale = (id) => {
      let newSalse = salse.filter((singleSale) => singleSale.id !== id)
      //delete sale with id from database
      setSalse(newSalse)
    }


        const handleSelseDateChange = (e) => {
            setSalseUserDate(e.target.value);
            //salseUserDate, setSalseUserDate
            const now = dayjs(e.target.value)
            const qdate = now.format("YYYY-MM-DD")
            setSalseDate(qdate)
        }

        const handleStaffSelectChange = (e) => {
            const staff = e.target.value
            setSalseStaff(staff)
        }

        
        /**
         * 
         * @param {Query by date} qdate 
         * @param {Query by staff name} qstaff 
         */
        const getSalseByDate = async() => {
          try{
              setApiLoading(true)
              setApiError("")
              
              //document.getElementById("qdate").value = qdate
              const res = await getSalse({token: appuser.token, logo: siteConfig.logo, staff: salseStaff,  date: salseDate})
              setSalse(res.data.sales)//allSalse
              setApiLoading(false)
              setLoading(false)
              setApiError("")
                const labels = getAllProductsStatFromSalse(res.data.sales).productNames.length > 0  ? getAllProductsStatFromSalse(res.data.sales).productNames : []
                const stat = getAllProductsStatFromSalse(res.data.sales).productStats.length > 0 ? getAllProductsStatFromSalse(res.data.sales).productStats : []
                //console.log(labels)
                if (res.data.sales.length >= 0) {
                  new Chartist.Line(
                    '.ct-chart-line',
                    {
                      //labels: ['nxus 230 - 13','dell 420 - 15','iphone 14 pro - 12','wrist whatch - 50'],
                      labels: labels,
                      series: [
                        //[13,15,12,50]
                        stat
                      ],
                    },
                    {
                      showArea: true,
                    }
                    );
                } else {
                  new Chartist.Line(
                    '.ct-chart-line',
                    {
                      //labels: ['nxus 230 - 13','dell 420 - 15','iphone 14 pro - 12','wrist whatch - 50'],
                      labels: ['0'],
                      series: [
                        //[13,15,12,50]
                        [0]
                      ],
                    },
                    {
                      showArea: true,
                    }
                    );
                }
               
            } catch(error) {
                setApiError("An error occured check internet connectivity")
                setApiLoading(false)
                setLoading(false)
                //alert("error")
                console.log(error)
            }
        }

        useEffect(()=>{
            const now = dayjs()
            // qdate - salse query date 
            const qdate = now.format("YYYY-MM-DD")
            setSalseDate(qdate)
            setSalseStaff("")
            getSalseByDate()
            
        }, [])
  
        
        //const apiStatus = <tr><center>{apiError == "" ? <h1>No sale was recorded today</h1> : <h1 style={{color: "red"}} >{apiError}</h1>  }</center></tr>

        const salseDisplay =  salse.length === 0 ? "" : salse.map(
            (sale) => 
              <SalesItem
                key={sale.id}
                setSale={setSale}
                deleteSale={deleteSale}
                setModalShow={setModalShow}
                sale={sale} 
                salse={salse}
                amount={formatPrice(sale.products.reduce((a, c) => a + c.price * c.qty, 0))} 
              />
        )
        
      //NOTE SORT ANS DISPLAY FIRST 50 SALSE DATE IN ACCENDING ODER
      //if (loading == false) {
            if (siteConfig.subscription){
              return (
                <div  style={{paddingBottom: "100px"}} className="container">
                  <div style={{paddingBottom: "20px"}} className="row">
                    { apiError && <Alert variant="danger"><center>{ apiError }</center></Alert> }
                    <div className="col-md-6">
                        <label>Select salse date</label>
                        <input type="date" id="qdate" value={salseUserDate} onChange={handleSelseDateChange} class="form-control" />
                    </div>
                    <div className="col-md-6">
                        <label>Get staff salse</label>
                        <select onChange={handleStaffSelectChange} className="form-select" >
                          <option value="">select staff name</option>
                          {
                            appuser.admins.admins.map((admin) => 
                            <option value={admin.name}>{admin.name}</option>
                            )
                          }
                        </select>
                    </div>
                  </div>
                  <div style={{paddingBottom: "20px"}} className="row">
                    <div className="col-md-6">
                      <button className="btn" style={{display: apiLoading ? "none" : "block", background: siteConfig.color, marginRight: "20px", color: "white"}} onClick={()=>getSalseByDate()}>
                        Get Salse
                      </button>
                      <button className="btn" style={{display: apiLoading ? "block" : "none", background: siteConfig.color, marginRight: "20px", color: "white"}} >
                        <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" /> Loading... 
                      </button>
                    </div>
                  </div>
                  <div style={{paddingBottom: "100px"}} className="row">
                      <div className="col-xl-8" style={{marginLeft: "60px"}}>
                        <p className="float-end"
                          style={{fontSize: "30px", color: "red", fontWeight: "400", fontFmily: "Arial, Helvetica, sans-serif"}}>
                          Total:
                          <span>{ getTotalSale() }</span>
                        </p>
                    </div>
                  </div>
                    
                    <center>
                        <table style={{width: "100%", paddingBottom: "30px"}}>
                            <tbody>
                                <tr>
                                    <th>Staff</th>
                                    <th>Amount</th>
                                    <th>Date</th>
                                    <th>action</th>
                                    <th></th>
                                </tr>
                                { salseDisplay }
                            </tbody>
                        </table> 
                    </center>

                    <div class="col-md-12">
                      <h2>Sales Stat</h2>
                      <div class="ct-perfect-fourth ct-chart-line"></div>
                    </div>
                    <SalesDetails
                        show={modalShow} 
                        onHide={() => setModalShow(false)}
                        sale={sale}
                    />
                </div>
              )
          
          } else {
            return (
              <div className="container" style={{paddingBottom: "100px", paddingTop: "50px"}}>
                <center>
                  <h3>your annual subscription has expired and you don't have enough credit for automatic renewal. kindly <Link href="/dashboard/credit">click here to subscibe</Link></h3>
                </center>
              </div>
            )
          }
     

  }
  export default Salse;