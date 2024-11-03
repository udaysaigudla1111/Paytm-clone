import React from 'react'
import Header from '../Components/Header'
import { useSearchParams } from 'react-router-dom'
import { amountAtom } from '../store/atoms/accountAtom'
import { useRecoilState } from 'recoil'
import axios from 'axios'

const SendMoney = () => {

  let [amount,setAmount] = useRecoilState(amountAtom);

  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");
  const firstName = searchParams.get("name")


  const TransferAmount = async ()=>{
    if(amount==="")
    {
      alert("Please enter the amount")
      return
    }
    amount = parseInt(amount);
      try {
        const Response = await axios.post("http://localhost:3000/api/v1/account/transfer",{
      amount,
      to:id
    },{
      headers:{
        token:localStorage.getItem("token")
      }
    }) 

    alert(Response.data.message)

    setAmount("")

      } catch (error) {

        console.log(error.response.data);
       alert(error.response.data.message)
       console.log(error);
       
       
        setAmount("");
        
      }
    

  }

  
  return (
   <div className='bg-slate-300 min-h-screen flex justify-center items-center'>
    <div className='bg-white w-[470px] shadow-lg rounded-lg p-5 text-center'>
      <Header label={"Send Money"} />
      <div className='pt-20'>
        <div className='flex items-center'>
          <div className='bg-green-500 rounded-full flex justify-center items-center h-14 w-14'>
            <div className='text-white text-2xl'>{firstName[0].toUpperCase()}</div>
          </div>
          <div className='ml-4 font-semibold text-2xl'>{firstName}</div>
        </div>
        <div className=''>
          <div className='text-left py-2 font-medium text-lg'>Amount (in Rs)</div>
          <input type="number" className='w-full px-2 py-2 border rounded-lg border-gray-200' placeholder='Enter amount' value={amount} onChange={(e)=>{setAmount(e.target.value)}} />
        </div>
        <div className='pt-4'>
          <button className='px-4 py-2 w-full hover:bg-green-600 hover:scale-[1.01] active:scale-[0.98] active:duration-75 transition-all bg-green-500 text-white rounded-lg font-medium text-lg ' onClick={TransferAmount}>Initiate Transfer</button>
        </div>
      </div>
    </div>
   </div>
  )
}

export default SendMoney