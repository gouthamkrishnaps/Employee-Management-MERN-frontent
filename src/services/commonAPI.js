import axios from "axios"


export const commonApi = async(httpRequest,url,reqBody,reqHeader)=>{

    const reqConfig = {
        method:httpRequest,
        url,
        data:reqBody,
        headers:reqHeader?reqHeader:{"Content-Type":"application/json"}//since we have 2 types of contents to upload 
    }

    return await axios(reqConfig).then((result)=>{
        return result 
    }).catch((err)=>{
        return err
    })
}