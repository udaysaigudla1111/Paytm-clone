import React from 'react'
import { useRecoilValue } from 'recoil'
import { nameAtom } from '../store/atoms/authNameAtom'
import { useSetRecoilState } from 'recoil'
import { modalAtom } from '../store/atoms/modalAtom'
const AppBar = () => {

  const setModal = useSetRecoilState(modalAtom);

  const Name = useRecoilValue(nameAtom);
  console.log("In the App bar component ",Name);
  
  return (
    <div className='h-[8vh] shadow flex justify-between p-4 items-center '>
    <div className='font-medium'>
        PayTM App
    </div>
    <div className='flex justify-center items-center gap-3'>
      <div className='font-semibold'>
       {Name?`Hello ${Name.toUpperCase()}`:'Hello'}
      </div>
      <div className='bg-slate-200 rounded-full flex justify-center h-12 w-12 items-center cursor-pointer' onClick={()=>{setModal(true)}}>
            <div className='text-xl'>{Name?Name[0].toUpperCase():'!'}</div>
      </div>
    </div>
    </div>
  )
}

export default AppBar