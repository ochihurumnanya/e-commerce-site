import { storage } from "../../utils/config/firebaseConfig";

import { ref, getDownloadURL,  } from "firebase/storage";

export const uploadFile = (file, path, setProgress, setImgUrl, setError) => {
    
    const storageRef = ref(storage, path) //note public/storename/file.name

    const uploadTask = uploadBytesRsumable(storageRef, file)

    uploadTask.on("state_change", (snapshot) => {
        const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100)
        setProgress(progress)
    },
    (error) => {
        setError(error)
    },
    () => {
       getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
         
       })
    })
}

