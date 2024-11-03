import React from 'react'

const InputComponent = ({placeholder,label,onChange,value}) => {
  return (
    <div>
    <div className='text-left text-md font-medium py-2'>
        {label}
    </div>
    <input type="text" onChange={onChange} className='w-full border rounded px-2 py-1 border-slate-200 ' value={value} placeholder={placeholder} />
    </div>
  )
}

export default InputComponent