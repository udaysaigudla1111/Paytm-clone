import React from 'react'
import { useNavigate } from 'react-router-dom'

const User = ({user,innerRef,provided}) => {
    const navigate = useNavigate();
  return (
    
    <div ref={innerRef}  {...provided.draggableProps} className='flex justify-between items-center my-2'>
        <div className='flex justify-center items-center'>
        <div className='bg-slate-200 rounded-full h-12 w-12 flex justify-center items-center'>
            <div className='text-xl'>{user.firstName.split("")[0].toUpperCase()}</div>
        </div>
        <div {...provided.dragHandleProps} className='ml-2 text-xl'>
            {user.firstName} {user.lastName} 
        </div>
        </div>
        <div>
        <button className='bg-gray-900 text-white rounded-lg px-3 py-2 hover:bg-gray-700 hover:scale-[1.02] active:scale-[0.98] active:duration-75 transition-all ease-in-out' onClick={()=>{
            navigate(`/send?id=${user._id}&name=${user.firstName}`)
        }} >Send Money</button>
        </div>
    </div>
  
  )
}

export default User

