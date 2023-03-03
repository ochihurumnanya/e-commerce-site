//end point
//pages/api/user  (to create new user)
//import { db, auth } from "../../../utils/db";
import { createSiteB, updateSiteB } from "../../../utils/functions/site";
import { db, auth } from "../../../utils/db/index";
import { stringify } from "@firebase/util";

export default async (req, res) => {
    try{    
            if (req.method == 'POST'){
                        //const { token, logo } = req.body
                const { userName, token, logoImg, logo, code, color, btnColor, currency, minProduct, about, shopDsc, contact} = req.body;
        
                if (
                        logoImg.trim().length < 400 && 
                        logo.trim().length < 50 && 
                        color.trim().length <= 15 &&
                        btnColor.trim().length <= 15 &&
                        currency.trim().length <= 15 &&
                        minProduct >= 0 &&
                        about.trim().length <= 500 &&
                        shopDsc.trim().length <= 300 &&
                        contact.address.trim().length <= 200 &&
                        stringify(contact.phone).trim().length <= 20 &&
                        contact.email.trim().length <= 100
                ){
                        const existDocSnap = await db.collection("sites").doc(logo).get()
                        const decodedToken = await auth.verifyIdToken(token)
                        const uid = decodedToken.uid

                        if(!existDocSnap.exists){
                            await createSiteB(req, uid)
                            //respons opject
                                    const siteConfigs = {
                                        logo: logo,
                                        logoImg: logoImg,
                                        color: color,
                                        btnColor: btnColor,
                                        about: about,
                                        shopDsc: shopDsc,
                                        currency: currency,
                                        minProduct: minProduct,
                                        subscription : true,
                                        plan: 15, //15mb
                                        usedPlan: 0, //total size of image storage mb used
                                        contact: contact, //contact: {address: address, phone: phone, email: email}
                                        admins: [ //admins will be added by api dynamically
                                            {
                                                name: userName,
                                                uid: uid,
                                                cat: "All",
                                                level: 3
                                            }   
                                        ]
                                    }
                                    //success
                                    res.status(200).json(siteConfigs)
                        } else {
                            res.status(400).json({message: "site exists already"})
                        }
                        
                    } else {
                        res.send(400).json({message: "Invalid data"})
                    }
                         
                }  else if (req.method == 'PUT') {
                    const { logoImg, token, logo, color, btnColor, currency, minProduct, about, shopDsc, contact} = req.body;
                    if (
                        logoImg.trim().length < 500 && 
                        logo.trim().length < 50 && 
                        color.trim().length <= 15 &&
                        btnColor.trim().length <= 15 &&
                        currency.trim().length <= 15 &&
                        minProduct >= 0 &&
                        about.trim().length <= 500 &&
                        shopDsc.trim().length <= 300 &&
                        contact.address.trim().length <= 200 &&
                        stringify(contact.phone).trim().length <= 15 &&
                        contact.email.trim().length <= 100
                    ) {
                        //const { logoImg, logo, color, btnColor, currency, minProduct, about, shopDsc, contact, admins } = req.body;
                        //id is product id
                        //{ level: adminStatus[0].level, admins: JSON.parse(existDocSnap.data().admins) } or { level: adminStatus[0].level }
                        const existDocSnap = await db.collection("sites").doc(logo).get()
                        const decodedToken = await auth.verifyIdToken(token)
                        const uid = decodedToken.uid
                        const adminStatus = JSON.parse(existDocSnap.data().admins).filter((el) => el.uid === uid)

                        if(existDocSnap.exists){
                            if (adminStatus[0].level === 3) { 
                                await updateSiteB(req, existDocSnap.data())
                                res.status(200).json({message:"updated successfully"})
                            } else {
                                res.status(400).json({message: "Request denied"})
                            }
                        } else {
                            res.status(400).json({message: "document do not exists"})
                        }
                    }
                }
            
    }catch(error){
        console.log(error)
        res.status(500).json({message: "An error occured"})
        
    }

}