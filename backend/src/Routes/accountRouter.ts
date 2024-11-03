import express,{Router} from "express";
import { authMiddleware } from "../Middleware/middleware";
import { CustomInterface } from "../Middleware/middleware";
import { Account } from "../db";
import { ResponseStatus } from "../ResponseCode/responseCode";
import mongoose from "mongoose";
import { formatDiagnostic } from "typescript";
const accountRouter = Router();


accountRouter.get("/balance",authMiddleware,async (req,res)=>{

    const userId = (req as CustomInterface).userId;

    const account = await Account.findOne({userId})
    
    res.status(ResponseStatus.Success).json({
        balance:account?.balance
    })
    return

})


accountRouter.post("/transfer",authMiddleware,async (req,res)=>{

    const session = await mongoose.startSession();
    try{
    session.startTransaction();

    const userId = (req as CustomInterface).userId;
    
    console.log(userId);
    
    const {amount,to} = req.body;

    const fromAccount = await Account.findOne({userId}).session(session);
    console.log(fromAccount?.balance);
    
    if(!fromAccount||fromAccount.balance<amount)
    {
        await session.abortTransaction();
        res.status(ResponseStatus.CLIENTERROR).json({
            message:"Insufficient balance"
        })
        console.log("Insufficient balance");
        return
    }

    const toAccount = await Account.findOne({userId:to}).session(session)

    if(!toAccount){
        await session.abortTransaction();
        res.status(ResponseStatus.CLIENTERROR).json({
            message:"Invalid Account"
        })
        console.log("Invalid Account!!!");
        return;
    }

    await Account.findOneAndUpdate({userId},{$inc:{balance:-amount}}).session(session)
    await Account.findOneAndUpdate({userId:to},{$inc:{balance:amount}}).session(session)

    await session.commitTransaction();

 
    res.json({
        message: "Transfer successful"
    });

    }
    catch(error:any)
    {
        session.abortTransaction();
        console.error("Transaction aborted due to error:", error);
    }
    finally{
     session.endSession();  // Always end the session
    }
})


// transfer({
//     userId:"67247145c753b1bcdb5982c5",
//     body:{
//         amount:100,
//         to:"672475b0bfe1d0d87322bce0"
//     }
// })

// transfer({
//     userId:"67247145c753b1bcdb5982c5",
//     body:{
//         amount:100,
//         to:"672475b0bfe1d0d87322bce0"
//     }
// })



export {accountRouter}