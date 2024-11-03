import React,{useEffect} from 'react'
import { useRecoilState } from 'recoil'
import { balanceAtom } from '../store/atoms/accountAtom'
import axios from 'axios'
const Balance = () => {

const [balance,setBalance] = useRecoilState(balanceAtom)

useEffect(()=>{
    const getBalance = async ()=>{
        const Response = await axios.get("http://localhost:3000/api/v1/account/balance",{
            headers:{
                token:localStorage.getItem("token")
            }
        })
          setBalance(Response.data.balance)
    }
  
    getBalance();
},[])

  return (
   
    <div className='flex'>
    <div className='font-bold text-xl'>Your balance</div>
    <div className='font-semibold ml-4 text-lg'>
    Rs {balance}
    </div>
    </div>
  )
}

export default Balance