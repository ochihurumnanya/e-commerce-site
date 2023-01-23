
//Oders object load all users oders and push to this object
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

    return (
            <>
                <div className="container">
                    {my_oders.map((oder, index) =>
                    <div key={index} style={{padding: "15px"}} className="order-details">
                        <h2>Order Id: {oder.id}</h2>
                        <p></p>
                        <h4>Shipping Info.</h4>
                        <p></p>
                        <b>ADDRESS :</b> {oder.address}
                        <p></p>
                        <b>STATUS :</b> <span style={{color: oder.status == "delivered" ? "green" : "red" }}>{oder.status}</span>
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
                                </tbody>
                            </table>
                            <p>
                              <b>Total:</b> <span>#{oder.products.reduce((a, c) => a + c.price * c.qty, 0)}</span>
                            </p>
                        </div>
                    </div>
                    )}
                </div>
            </>
        )
}
export default oder;