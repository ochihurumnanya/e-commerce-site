
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

//fill this with products from database. 
/*All available product */
//Oders object load all users oders and push to this object
let allSalse = [
    {
      id: "12356",
      address: "country, city/state, address",
      status: "paid",
      date: "date/time 1",
      discount: 0,
      contact: "email, 09060399343",
      staff: "staff name 1",
      products: [
          {
            id:"1",
            name:"nexus 640",
            price:50000,
            dsc:"Intel 64 bits os",
            category:"laptops",
            qty: 5,
            img: "/img/img5.png"
          },
          {
            id:"2",
            name:"dell 640",
            price:50000,
            dsc:"Intel 64 bits os",
            category:"smart watches",
            qty: 2,
            img: "/img/img4.png"
          },
      ],
    },
    {
        id: "1235",
        address: "country, city/state, address",
        status: "paid",
        date: "date/time 2",
        contact: "email, 09060399343",
        discount: 0,
        staff: "staff name 2",
        products: [
            {
              id:"1",
              name:"nexus 640",
              price:50000,
              dsc:"Intel 64 bits os",
              category:"laptops",
              qty: 5,
              img: "/img/img5.png"
            },
            {
              id:"2",
              name:"dell 640",
              price:50000,
              dsc:"Intel 64 bits os",
              category:"smart watches",
              qty: 2,
              img: "/img/img4.png"
            },
        ],
      }
  ]


//{props.sale.products.reduce((a, c) => a + c.price * c.qty, 0)}
  const Salse = () => {
    const { formatPrice, siteConfig, appuser } = useContext(ProductsData);
    const [salse, setSalse] = useState([]) //all salse
    const [sale, setSale] = useState({}) //Single sale
    const [salseDate, setSalseDate] = useState("date 0")//salse date
    const [modalShow, setModalShow] = useState(false)
    const [apiError, setApiError] = useState("")
    //waiting to get all user oders
    const [ loading, setLoading ]  = useState(true)


   
    /**
     * 
     * siteConfig.admins
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


    const deleteSale = (id) => {
      let newSalse = salse.filter((singleSale) => singleSale.id !== id)
      //delete sale with id from database
      setSalse(newSalse)
    }


        const handleSelseDateChange = (e) => {
          setSalseDate(e.target.value);
          const now = dayjs(e.target.value)
          /* qdate - salse query date */
          const qdate = now.format("YYYY-MM-DD")
          alert(qdate)
          //run a new query to get salse by date
        }

        const handleStaffSelectChange = (e) => {
          alert(e.target.value)
          //get staff salse
        }

        useEffect(()=>{
          //console.log(appuser)
          const getSalseByDate = async() => {
              try{
                  //token, logo, admin(true/false)
                  const now = dayjs()
                    // qdate - salse query date 
                    const qdate = now.format("YYYY-MM-DD")
                    //document.getElementById("qdate").value = qdate
                    const res = await getSalse({token: appuser.token, logo: siteConfig.logo, date: qdate})
                    setSalse(res.data.sales)//allSalse
                    setLoading(false)
                } catch(error) {
                    setApiError("An error occured check internet connectivity")
                    console.log(error)
                    setLoading(false)
                }
            }
            getSalseByDate();
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
      if (loading == false) {
            if (siteConfig.subscription){
              return (
                <div  style={{paddingBottom: "100px"}} className="container">
                  <div style={{paddingBottom: "100px"}} className="row">
                  { apiError && <Alert variant="danger"><center>{ apiError }</center></Alert> }
                    <div className="col-md-6">
                        <ul className="summary-items">
                          <li>
                            <div className="summary-title color2">
                              <span><i className="fa fa-users"></i> Select salse date </span>
                            </div>
                            <div className="summary-body">
                              <input type="date" id="qdate" value="" onChange={handleSelseDateChange} class="form-control" />
                            </div>
                          </li>
                        </ul>
                      </div>
                      <div className="col-md-6">
                        <ul className="summary-items">
                        <li>
                          <div className="summary-title color3">
                            <span><i className="fa fa-users"></i> Get staff salse </span>
                          </div>
                          <div className="summary-body">
                            <select onChange={handleStaffSelectChange} className="form-select" >
                              <option value="">select staff name</option>
                              {
                                appuser.admins.admins.map((admin) => 
                                  <option value={admin.name}>{admin.name}</option>
                                )
                              }
                            </select>
                          </div>
                        </li>
                        </ul>
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
                    <div style={{margin: '10px', width: "100%"}}>
                      <p>
                        <b>Total:</b> <span>{getTotalSale()}</span>
                      </p>
                    </div>

                  <SalseStat
                      salse={salse}
                  />
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
      } else {
        <Spinners />
      }

  }
  export default Salse;