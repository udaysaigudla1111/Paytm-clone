import React from 'react'
import { useSetRecoilState } from 'recoil'
import {  nameAtom } from '../store/atoms/authNameAtom'
import Header from './Header'
import InputComponent from './InputComponent'
import { ufirstName,ulastName,uPassword } from '../store/atoms/userUpdateAtom'
import { useRecoilState } from 'recoil'
import { modalAtom } from '../store/atoms/modalAtom'
import axios from 'axios'

const Modal = () => {
    const [modalValue,setModalValue] = useRecoilState(modalAtom);
    const [firstName,setFirstName] = useRecoilState(ufirstName)
    const [lastName,setLastName] = useRecoilState(ulastName);
    const [password,setPassword] = useRecoilState(uPassword);

    const setName = useSetRecoilState(nameAtom)
    
    if(!modalValue)
    {
        return null;
    }

    const updateDetails = async (e)=>{

        const obj = {
            firstName:firstName?firstName:undefined,
            lastName:lastName?lastName:undefined,
            password:password?password:undefined
        }
        try {
            
              await axios.put("http://localhost:3000/api/v1/user/update",obj,{
            headers:{
                token:localStorage.getItem("token")
            }
            })

            setName(firstName);
            setModalValue(false);
            setFirstName("");
            setLastName("");
            setPassword("");

        } catch (error) {
            console.log(error);
            
        }
 
        e.stopPropagation();
    } 

  return (
    <div className='fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center' onClick={()=>{setModalValue((prev)=>{return !prev})}} >
        <div className='w-[450px] bg-white rounded-xl shadow-lg text-center p-5 flex flex-col' onClick={(e)=>{e.stopPropagation()}}>
            <Header label={"Update Details"}/>
            <div className='mt-3'>
            <InputComponent placeholder={"Enter FirstName"} value={firstName} label={"FirstName"} onChange={(e)=>{setFirstName(e.target.value)}} /> 
            <InputComponent placeholder={"Enter LastName"} value={lastName} label={"LastName"} onChange={(e)=>{setLastName(e.target.value)}} /> 
            <InputComponent placeholder={"Enter Password"} value={password} label={"Password"} onChange={(e)=>{setPassword(e.target.value)}} /> 
            <div className='pt-4'>
                <button className='bg-yellow-500 px-4 py-2 rounded-lg text-white font text-lg hover:bg-yellow-400 hover:scale-[1.01] active:scale-[0.98] active:duration-75 transition-all ease-in-out' onClick={updateDetails} >Update!!</button>
            </div>
            </div>
        </div>
        </div>
  )
}

export default Modal