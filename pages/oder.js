//import { ProductsData } from '../../context/context';
import { ProductsData } from '../context/context';
import { useContext } from 'react';
import { useState, useEffect } from 'react';
import { getOders } from '../api/oder/functions';
import DeleteOderModal from '../elements/oder/deleteOderDialog';
import Spinners from '../general/Spinner';


//Oders object load all users oders and push to this object
//get and initialize this with all users oders
let my_oders = [
  {
    id: "1235",
    address: "country, city/state, address",
    status: "not paid",
    date: "date/time",
    contact: "email, 09060399343",
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

const  oder = ()=>{
    const {  formatPrice, siteConfig, appuser } = useContext(ProductsData);

    const [ my_oders, setMy_oders ]  = useState([])
      //set delete modal show
    const [delModalShow, setDelModalShow] = useState(false)
    //waiting to delete oder
    const [oderId, setOderId]  = useState("")

    const [apiError, setApiError] = useState("")
    //waiting to get all user oders
    const [ loading, setLoading ]  = useState(true)


    const deleteOderById = async(id) => {
        //let delOder = {...allProducts.filter((item) => item.id === pid)[0], logo: siteConfig.logo
        setOderId(id)
        setDelModalShow(true)
    }

     //pi oder id
     //removes oder from ui
    const removeOder = (id) => {
        const updatedOder = my_oders.filter((item) => item.id !== id)
        //for all products
        setMy_oders(updatedOder)
    }

    useEffect(()=>{
        const getOder = async() => {
            try{
                //token, logo, admin(true/false)
                const res = await getOders({token: appuser.token, logo: siteConfig.logo, admin: false})
                setMy_oders(res.data.oders)
                setLoading(false)
                //console.log(my_oders)
            } catch(error) {
                setApiError("An error occured check internet connectivity")
                console.log(error)
            }
        }
        getOder();
    }, [])

    //my_oders
   let  userOders = my_oders.length ? my_oders.map((oder, index) =>
   <div key={index} style={{padding: "15px", marginTop:"20px", marginBottom:"20px"}} className="order-details">
       <h2>Order Id: {oder.id}</h2>
       <p></p>
       <h4>Shipping Info.</h4>
       <p></p>
       <b>ADDRESS :</b> {oder.address}
       <p></p>
       <b>STATUS :</b> <span style={{color: oder.status == "paid" ? "green" : "red" }}>{oder.status}</span>
       <p></p>
       <b>DATE :</b> {oder.date}
       <h4>Contact Info.</h4>
       {oder.contact}
       <h4>Shopping Cart</h4>
       <div>
           <table style={{width: "95%"}} id="std-rec">
               <tbody>
                   <tr>
                       <th>image</th>
                       <th>Product</th>
                       <th>Price</th>
                       <th>Qty</th>
                   </tr>
                   {
                       oder.products.map(
                           (item, index) => 
                               <tr key={"i"+index}>
                                   <td><img className="cat-img" src={item.img} /></td>
                                   <td>{item.name}</td>
                                   <td>{item.price}</td>
                                   <td>{item.qty}</td>
                               </tr>
                       )
                   }
                   <tr>
                       <td>
                           <b>Total:</b> <span>{formatPrice(oder.products.reduce((a, c) => a + c.price * c.qty, 0))}</span>
                       </td>
                   </tr>
                   <tr>
                       <td></td>
                       <td></td>
                       <td></td>
                       <td>
                                <button className="btn" style={{ background: "#FF5733", marginRight: "20px", color: "white"}} onClick={()=>deleteOderById(oder.id)}>
                                    Delete
                                </button>
                       </td>
                   </tr>
               </tbody>
           </table>
       </div>
   </div>
) : (
    <div className="container" style={{marginBottom: "200px", margingTop: "50px"}}>
        <center>{apiError == "" ? <h1>no available oder</h1> : <h1 style={{color: "red"}} >{apiError}</h1>  }</center>
    </div>
)
//<span className="btn" style={{background: "#FF5733", marginRight: "40px", float:"right", color: "white"}} >delete</span>
    


    if (loading == false) {
        return (
            <>
                <div className="container">
                    { userOders }
                    <DeleteOderModal
                        show={delModalShow} 
                        onHide={() => setDelModalShow(false)}
                        oderId={oderId}
                        removeOder={removeOder}
                  />
                </div>
            </>
        )
    } else {
       <Spinners />
    }
 
}
export default oder;
//{ apiError && <Alert variant="danger"><center>{ apiError }</center></Alert> }