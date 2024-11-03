import React from 'react'
import { useNavigate } from 'react-router-dom'

const BottomWarning = ({label,buttonText,to}) => {
    const navigate = useNavigate();
  return (
    <div className='py-2 text-md flex justify-center'>
    <div >
        {label}
    </div>
    <div onClick={()=>{navigate(to)}} className='underline cursor-pointer pl-1'>
    {buttonText}
    </div>
    </div>
  )
}

export default BottomWarning