import express from 'express'
import dotenv from 'dotenv'
import mongoose, { Error } from 'mongoose';
import {z} from 'zod';
import {userRouter} from './Routes/userRouter'
import {accountRouter} from './Routes/accountRouter'
import { ResponseStatus } from './ResponseCode/responseCode';
import cors from 'cors'
//////////////////////////////////////////////////////////////////////////////////////

dotenv.config();         // To load env variables from .env to process.env
const app = express();   // initiliaze node app
app.use(express.json())  // parse the json string and put the content in req.body
app.use(cors());         // cors origin policy


  
 const requiredEnv = z.object({
    PORT:z.string(),
    URI:z.string().min(10),
    JWT_SECRET:z.string()
 })

 export const env = requiredEnv.safeParse(process.env)  

 const URI = env.success?env.data.URI:""
 
mongoose.connect(URI).then(()=>{
    console.log(`Sucessfully Connected to Database`);
}).catch(()=>{
    console.log(`Failed to connect to the database`);
    
})


app.use("/api/v1/user",userRouter)
app.use("/api/v1/account",accountRouter)


app.get("/",(req,res)=>{
    res.status(ResponseStatus.Success).send("hiiii")
})



const port = env.success?env.data.PORT:null
app.listen(port,()=>{
    console.log(`The server is listening on port number ${port}`); 
})