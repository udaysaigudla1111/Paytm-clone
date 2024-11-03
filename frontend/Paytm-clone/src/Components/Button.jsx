import React from 'react'

const Button = ({label,color,onClick}) => {
  return (
    <button className={` ${color} w-full rounded-lg py-2 text-white hover:scale-[1.01] active:scale-[0.98] active:duration-75 transition-all ease-in-out`} onClick={onClick} >{label}</button>
  )
}

export default Button