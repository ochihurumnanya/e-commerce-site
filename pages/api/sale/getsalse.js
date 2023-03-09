
import { db, auth } from "../../../utils/db";
import dayjs from 'dayjs'



export default async (req, res) => {
    /**
     *  //id: "12356",
            token: appuser.token,
            address: fields.address,
            status: "pending",
            date: "",//to be created and returned by server
            contact: fields.email+", "+fields.phone,
            customer: fields.name, //customers name
            staff: "", //this should be set on server side
            products: getCartItems() //array of all products
     */
try{
        //date could either be [""] or ["YYYY-MM-DD"]
        const { token, logo, staff, date} = req.body;
        //POST METHOD  TO CREATE SITE
        if (
            logo.trim().length < 50
        ){ 
            if (req.method == 'POST'){
                    const now = dayjs()
                    /* qdate - salse query date */
                    const qdate = date.trim().length < 12 ? date : now.format("YYYY-MM-DD")
                    const decodedToken = await auth.verifyIdToken(token)
                    const uid = decodedToken.uid

                    //userRecord.displayName
                    const existDocSnap = await db.collection("sites").doc(logo).get()
                    if (existDocSnap.exists){
                        const adminStatus = JSON.parse(existDocSnap.data().admins).filter((el) => el.uid === uid)
                        if(adminStatus[0]){
                            if (adminStatus[0].level === 3) {
                                    let sales = []
                                    const salseRef = db.collection("stores").doc(logo).collection("sales")
                                    const salseDocSnap = staff.trim().length < 100 ? 
                                                await salseRef.where('qdate', '==', qdate).get()
                                                : 
                                                await salseRef.where('qdate', '==', qdate).where('staff', '==', staff).get()
                                        

                                    if (!salseDocSnap.empty){
                                        salseDocSnap.forEach((doc)=>{
                                            sales.push({
                                                ...doc.data(), id: doc.id, products: JSON.parse(doc.data().products)
                                            })
                                        })
                                        //success 
                                        /** salse - array of salse */
                                        res.status(200).json({sales: sales})
                                    } else {
                                        res.status(200).json({sales: sales})
                                    }
                                    
                            } else {
                                console.log("invalid access")
                                res.status(400).json({message: "invalid access"})
                            }
                        } else {
                            console.log("not an admin")
                            res.status(400).json({message: "invalid access"})
                        }          
                    } else {
                        console.log("not exist")
                        res.status(400).json({message: "invalid operation"})
                    }
            }  
        } else {
            console.log("not validated")
            res.status(400).json({message: "invalid operation"})
        }    
    }catch(error){
        console.log(error)
        res.status(400).json({message: "invalid operation"})
    }

}