import jwt from 'jsonwebtoken'
import { ApiError } from '../utils/apiError.js'

const authMiddleware = async (req,res,next)=>{
    const {token} = req.headers
    if(!token){
        throw new ApiError(401,"Not authorized login again.")
    }

    const decodedtoken = jwt.verify(token,process.env.REFRESH_TOKEN_SECRET)

    console.log(decodedtoken)
    if(!decodedtoken){
        throw new ApiError(401,"error while decoding.")
    }

    console.log("inside auth middleware.",decodedtoken)
    console.log(decodedtoken.id)
    //need to change this
    req.user = {
        user_id : decodedtoken.id
    }
    next()
}

export {authMiddleware}