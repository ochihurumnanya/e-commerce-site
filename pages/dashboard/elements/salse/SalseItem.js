import { ProductsData } from '../../../../context/context';
import { useContext } from 'react';

//setSale={setSale}
//setModalShow={setModalShow}setSale
const SalesItem = ({ sale, amount, salse, setSale, deleteSale, setModalShow }) => {

    const { formatPrice } = useContext(ProductsData)

    const showSale = (sale) => {
        setSale(sale);
        setModalShow(true)
    }


    return (
        <tr>
            <td>{sale.staff}</td>
            <td>{ amount }</td>
            <td>{sale.createdAt}</td>
            <td><button onClick={() => {showSale(sale)}}  className="btn-edit">Details</button></td>
            
        </tr>
    )
}
export default SalesItem;
//<td><button onClick={() => {deleteSale(sale.id)}} className="btn-delete">Delete</button></td>