import express from 'express'
import dotenv from 'dotenv'
dotenv.config();
const app = express();

enum ResponseStatus{
    Success=200,
    CLIENTERROR=400,
    SERVERERROR=500,
}

app.get("/",(req,res)=>{
    res.status(ResponseStatus.Success).send("hiiii")
})


app.listen(3000,()=>{
    console.log(`The server is listening on port number ${3000}`); 
})