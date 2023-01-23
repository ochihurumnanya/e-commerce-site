
import { useState, useEffect } from "react"
import SalesItem from "./elements/salse/SalseItem"
import SalesDetails from "./elements/salse/SalesDetails"

//fill this with products from database. 
/* All available product */
//Oders object load all users oders and push to this object
let allSalse = [
    {
      id: "12356",
      address: "country, city/state, address",
      status: "paid",
      date: "date/time 1",
      contact: "email, 09060399343",
      staff: "staff name 1",
      products: [
          {
            id:"1",
            name:"dell 640",
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
        staff: "staff name 2",
        products: [
            {
              id:"1",
              name:"dell 640",
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
    const [salse, setSalse] = useState(allSalse)
    const [sale, setSale] = useState({})
    const [modalShow, setModalShow] = useState(false)

    const getTotalSale = () => {
      let products = []
      salse.forEach((sale) => {
        products.push(sale.products.reduce((a, c) => a + c.price * c.qty, 0))
      })
      return products.reduce((a, c) => a + c, 0)
    }


    const deleteSale = (id) => {
      let newSalse = salse.filter((singleSale) => singleSale.id !== id)
      //delete sale with id from database
      setSalse(newSalse)
  }

    const salseDisplay =  salse.length === 0 ? "" : salse.map(
        (sale) => 
          <SalesItem
            key={sale.id}
            setSale={setSale}
            deleteSale={deleteSale}
            setModalShow={setModalShow}
            sale={sale} 
            salse={salse}
            amount={sale.products.reduce((a, c) => a + c.price * c.qty, 0)} 
          />
        )
    
        useEffect(()=>{
          new Chartist.Line(
            '.ct-chart-line',
            {
              labels: ['nxus 230 - 13','dell 420 - 15','iphone 14 pro - 12','wrist whatch - 50'],
              series: [
                [13,15,12,50]
              ],
            },
            {
             showArea: true,
            }
            );
        }, [])
    

    return (
        <div  style={{paddingBottom: "100px"}} className="container">
          <div style={{paddingBottom: "100px"}} className="row">
            <div className="col-md-6">
                <ul className="summary-items">
                <li>
                  <div className="summary-title color2">
                    <span><i className="fa fa-users"></i> {"Salse - "} {"date/time 1"} </span>
                  </div>
                  <div className="summary-body">1000</div>
                </li>
                </ul>
              </div>
              <div className="col-md-6">
                <ul className="summary-items">
                <li>
                  <div className="summary-title color3">
                    <span><i className="fa fa-users"></i> {"Select Date"} </span>
                  </div>
                  <div className="summary-body">
                    <select className="form-select" >
                      <option selected> select salse date</option>
                      <option value="date 1">date 1</option>
                      <option value="date 2">date 2</option>
                      <option value="date 3">date 3</option>
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
                <b>Total:</b> <span>#{getTotalSale()}</span>
              </p>
            </div>

            <SalesDetails
                show={modalShow} 
                onHide={() => setModalShow(false)}
                sale={sale}
            />
           
            <div style={{marginTop: '100px'}} className="row">
              <div className="col-md-12">
                <div>
                  <h2>Sales Stat - {"date/time 1"}</h2>
                  <div class="ct-perfect-fourth ct-chart-line"></div>
                </div>
              </div>
            </div>
        </div>
    )
  }
  export default Salse;