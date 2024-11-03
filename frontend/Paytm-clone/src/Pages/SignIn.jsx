import React from 'react'
import Header from '../Components/Header'
import SubHeading from '../Components/SubHeading'
import InputComponent from '../Components/InputComponent'
import Button from '../Components/Button'
import BottomWarning from '../Components/BottomWarning'
import { usernameState,passwordState } from '../store/atoms/userAtom'
import { useRecoilState } from 'recoil'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useSetRecoilState } from 'recoil'
import { authAtom } from '../store/atoms/authNameAtom'
import { nameAtom } from '../store/atoms/authNameAtom'

const SignIn = () => {

  const setAuth = useSetRecoilState(authAtom)
  const setName = useSetRecoilState(nameAtom)
  const navigate = useNavigate();

  const [username,setUserName] = useRecoilState(usernameState);
  const [password,setPassword] = useRecoilState(passwordState);

  const signInSubmit = async ()=>{

      try {
        const Response = await axios.post("http://localhost:3000/api/v1/user/signin",{
          username,
          password
        })

        alert(Response.data.token)
        localStorage.setItem("token",Response.data.token)
        setAuth(true);
        setName(username.split("@")[0].toUpperCase());
        navigate("/dashboard")
        setPassword("");
        setUserName("");
        
      } catch (error) {
        console.log(error);
        
      }
  }


  return (
   <div className='bg-slate-300 h-[92vh] flex justify-center items-center'>
    <div className='bg-white w-[450px] rounded-xl shadow-lg text-center p-2 px-4 flex flex-col justify-center'>
       <Header label={"SignIn"} />
        <SubHeading label={"Enter your credentials to access your account"} />
        <InputComponent placeholder={"John"} label={"Email"} value={username} onChange={(e)=>setUserName(e.target.value)} />
        <InputComponent placeholder={"12345"} label={"Password"} value={password} onChange={(e)=>setPassword(e.target.value)} />
        <div className='pt-4'>
        <Button label={"SignIn"} color={"bg-gray-800"} onClick={signInSubmit} />
        </div>
        <div className='pt-3'>
          <Button color={"bg-red-600"} label={"Login with Google"} />
        </div>
        <BottomWarning label={"Don't have an account?"} buttonText={"SignIp"} to={"/signup"} />
    </div>
   </div>
  )
}

export default SignIn