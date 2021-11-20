import { Request,Response,NextFunction } from "express";
import Unauthorized from "../components/exceptions/Unauthorized";
import { verify } from "../services/TokenService";
export const auth = (req:Request,res:Response,next:NextFunction)=>{
    try {
        const token = req.headers?.authorization
        if(!token){
           throw new Unauthorized('unauthorized!')
        }
        const verifyResult = verify(token as string)
        if(!verifyResult){
            throw new Unauthorized('unauthorized!')
        }
        next()
    } catch (error) {
        next(error)
    }
}