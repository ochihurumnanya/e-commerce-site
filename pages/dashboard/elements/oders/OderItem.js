
 /**
  * 
  *{
      id: "1235",
      address: "country, city/state, address",
      status: "pending",
      date: "date/time 2",
      contact: "email, 09060399343",
      staff: "",
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

    setModalShow={setModalShow}
          getTotalItems={getTotalItems}
          getTotalAmount={getTotalAmount}
          getTotalQty={getTotalQty}
  */

//setSale={setSale}
//setModalShow={setModalShow}setSale
const OderItem = ({ oder, oders, showSale, deleteOder, getTotalItems, getTotalAmount, getTotalQty }) => {
  

    return (
        <tr>
            <td>{getTotalItems(oder)}</td>
            <td>{getTotalAmount(oder)}</td>
            <td>{getTotalQty(oder)}</td>
            <td>{oder.date}</td>
            <td><button onClick={() => {showSale(oder)}}  className="btn-edit">Details</button></td>
            <td><button onClick={() => {deleteOder(oder.id)}} className="btn-delete">Delete</button></td>
        </tr>
    )
}
export default OderItem;