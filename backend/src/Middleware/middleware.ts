import jwt from 'jsonwebtoken'
import {ResponseStatus} from '../ResponseCode/responseCode'
import {env} from '../index'
import {Request,Response,NextFunction} from 'express'
import { z } from 'zod'


export interface CustomInterface extends Request{
    userId:string
}


const authMiddleware = async (req:Request,res:Response,next:NextFunction)=>{

    try {   
        const token:string = req.headers.token as string;
    if(!token)
    {

        res.status(ResponseStatus.CLIENTERROR).json({
            message:"Token Not Found"
        })

    }
            const secret = env.success?env.data.JWT_SECRET:"";

            const decodedInfo = jwt.verify(token,secret) as jwt.JwtPayload;
            
            (req as CustomInterface).userId = decodedInfo.userId;
            
            next();
    
    }
     catch (error) {
            console.log(error);
            res.status(ResponseStatus.CLIENTERROR).json({
                message:"INVALID TOKEN"
            })
        }

}

export {authMiddleware}