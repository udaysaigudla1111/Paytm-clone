import mongoose from "mongoose";
import { string } from "zod";

const Schema  = mongoose.Schema

interface IUser{
    username:string;
    password:string;
    firstName:string;
    lastName:string;
}

interface IAccounts
{
    userId:mongoose.Types.ObjectId,
    balance:number,       
}

const userSchema = new Schema<IUser>({
    username:{
        type:String,
        unique:true,
        required:true,
        lowercase:true,
        minlength:3,
        maxlength:20,
        trim:true
    },
    password:{
        type:String,
        minlength:4,
        maxlength:100,
        required:true
    },
    firstName:{
        type:String,
        maxlength:30,
        required:true,
    },
    lastName:{
        type:String,
        maxlength:30,
        required:true,
    }
},{
    timestamps:true
})

const accountSchema = new Schema<IAccounts>({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user',
        required:true
    },
    balance:{
        type:Number,
        required:true
    }
})

const User = mongoose.model<IUser>('user',userSchema)
const Account = mongoose.model<IAccounts>('account',accountSchema)

export {User,Account}