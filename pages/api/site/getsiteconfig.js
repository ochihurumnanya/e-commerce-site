//end point
//pages/api/user  (to create new user)
//import { db, auth } from "../../../utils/db";
import { db } from "../../../utils/db";
//import moment  from "moment"
import dayjs from 'dayjs'

export default async (req, res) => {
    
    try{
             //POST METHOD  TO CREATE SITE
        if (req.method == 'POST'){
            const { logo } = req.body;
            if (logo.trim().length < 50) {
                const existDocSnap = await db.collection("sites").doc(logo).get()
                if(existDocSnap.exists){
                    const now = dayjs()
                    //get site subscription expiary date
                    const siteExpDate = dayjs(existDocSnap.data().subExpDate)
                    //subscription: 15,
                    const currentSub = existDocSnap.data().subscription
                    
                    const substatus = now.diff(siteExpDate) <= 0 ? false : true
                    //respons opject
                    const siteConfigs = {
                        ...JSON.parse(existDocSnap.data().siteConfig),
                        subscription : currentSub > 15 ? substatus  : true,
                        plan: currentSub, //15mb
                        usedPlan: existDocSnap.data().usedSub, //total size of image storage mb used to be updated each time admin adds or delete products
                    }
                    //success
                    res.status(200).json(siteConfigs)
                
                }else{
                        res.status(400).json({message: "Exist"})
                }
            }else{
                res.status(400).json({message: "invalid operation"})
            }
        } 
    }catch(error){
        //console.log(logo)
        //console.log(error)
        res.status(501).json({message: "An error occured"})
    }

}