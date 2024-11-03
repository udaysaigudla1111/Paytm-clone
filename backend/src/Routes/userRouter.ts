import { Response, Router } from 'express';
import {z} from 'zod';
import { User,Account } from '../db';
import bcrypt from 'bcrypt'
import { ResponseStatus } from '../ResponseCode/responseCode';
import { env } from '..';
import jwt from 'jsonwebtoken'

import {authMiddleware, CustomInterface} from '../Middleware/middleware'
import mongoose from 'mongoose';


const userRouter = Router();

userRouter.post("/signup",async (req,res)=>{

    const {username,password,firstName,lastName} = req.body;

    const requiredBody = z.object({
        username:z.string().min(5).max(30).email(),
        password:z.string().min(3).max(20),
        firstName:z.string().min(3).max(20),
        lastName:z.string().min(4).max(20)
    })

    const parsedBody = requiredBody.safeParse(req.body);

    if(!parsedBody.success)
    {
         res.status(ResponseStatus.CLIENTERROR).json({
            message:"PLEASE ENTER THE DETAILS CORRECTLY"
        })
        return
    }

    try {

        const userExists = await User.findOne({username})
        
        if(userExists)
        {
             res.status(ResponseStatus.CLIENTERROR).json({
                message:"USER ALREADY EXISTS PLEASE SIGNIN"
            })
            return;
        }

        const hashedPassword = await bcrypt.hash(password,5);

        const user = await User.create({
            username,
            password:hashedPassword,
            firstName,
            lastName
        })

        await Account.create({
            userId:user._id,
            balance:Math.floor(1+Math.random()*10000)
        })

         res.status(ResponseStatus.Success).json({
            message:"USER SIGNUP SUCCESSFULLY!!!",
            user
        })

    } catch (error) {
        console.log(error);
          res.status(ResponseStatus.SERVERERROR).json({
            message:"INTERNAL SERVER ERROR"
        })
        return
    }

    
})

userRouter.post("/signin",async (req,res)=>{
    
    const {username,password} = req.body;
    console.log(username);
    
     const requiredBody = z.object({
        username:z.string().min(5).max(30).email(),
        password:z.string().min(3).max(20)
    })

    const parsedBody = requiredBody.safeParse(req.body);

    if(!parsedBody.success)
    {
         res.status(ResponseStatus.CLIENTERROR).json({
            message:"PLEASE ENTER THE DETAILS CORRECTLY"
        })
        return
    }

    try {

        const userExists = await User.findOne({username})
        const secret = env.success?env.data.JWT_SECRET:""
        if(!userExists)
        {
            res.status(ResponseStatus.CLIENTERROR).json({
                message:"USER NOT FOUND PLEASE SIGNUP"
            })
            return;
        }

        const isPasswordMatched = await bcrypt.compare(password,userExists.password);

        if(isPasswordMatched)
        {
            const token = jwt.sign({
                userId:userExists._id
            },secret)

            res.status(ResponseStatus.Success).json({
                message:"USER SIGNIN SUCCESSFULLY",
                token
            })
            console.log(token);
            
            return
        }
        else{
            res.status(ResponseStatus.CLIENTERROR).json({
                message:"USER PASSWORD DID NOT MATCH"
            })
            return
        }

        
    } catch (error) {
        console.log(error);
        res.status(ResponseStatus.SERVERERROR).json({
            message:"INTERNAL SERVER ERROR"
        })
        return
    }


})

userRouter.put("/update",authMiddleware,async (req,res:Response)=>{

    const userId = (req as CustomInterface).userId
    let {password,firstName,lastName} = req.body;

    const requiredBody = z.object({
        password:z.string().min(4).max(50).optional(),
        firstName:z.string().min(3).max(20).optional(),
        lastName:z.string().min(3).max(30).optional()
    })

    const parsedBody = requiredBody.safeParse(req.body)

    if(!parsedBody.success)
    {
        res.status(ResponseStatus.CLIENTERROR).json({
            message:parsedBody.error
        })
        return
    }
    console.log(lastName);
    
    if(password)
    { password = await bcrypt.hash(password,5);} 
    const updatedUser = await User.findByIdAndUpdate({_id:userId},{
        password,
        firstName,
        lastName
    },{
        new:true,
        runValidators:true
    })


    res.status(ResponseStatus.Success).json({
        message:"USER UPDATED SUCCESSFULLY",
        updatedUser
    })
   return  


})

interface IUserData{
     username:string,
    _id:mongoose.Types.ObjectId,
    firstName:string,
    lastName:string
}

userRouter.get("/bulk",authMiddleware,async (req,res)=>{
    const userId = (req as CustomInterface).userId;
    const filter = req.query.filter||"";

    try {
        
    let users = await User.find({
        $or:[{
            firstName:{"$regex":filter,"$options":"i"}
        },
        {
            lastName:{"$regex":filter,"$options":"i"}
        }]
    })
    users = users.filter((user)=>{
            return user._id.toString()!==userId
    })
    const UserData:IUserData[] = users.map((user)=>{

        return {
            username:user.username,
            _id:user._id,
            firstName:user.firstName,
            lastName:user.lastName
        }
    }) 

    res.status(ResponseStatus.Success).json({
        UserData
    })
    }
    catch (error) {
        console.log(error);
        res.status(ResponseStatus.SERVERERROR).json({
            message:"INTERNAL SERVER ERROR"
        })
    }

})

userRouter.get("/me",authMiddleware,async (req,res)=>{

    const userId = (req as CustomInterface).userId;

    try {
        
        const user = await User.findOne({_id:userId});

        res.status(ResponseStatus.Success).json({
            firstName:user?.firstName
        })
        return

    } catch (error) {
        console.log(error);
        res.status(ResponseStatus.SERVERERROR).json({
            message:"INTERNAL SERVER ERROR"
        })
        
    }

})


export {userRouter}