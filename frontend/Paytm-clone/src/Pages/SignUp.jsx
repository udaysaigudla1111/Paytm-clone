import React from 'react'
import Header from '../Components/Header'
import SubHeading from '../Components/SubHeading'
import InputComponent from '../Components/InputComponent'
import Button from '../Components/Button'
import BottomWarning from '../Components/BottomWarning'
import { useRecoilState } from 'recoil'
import axios from 'axios'
import { usernameState,passwordState,firstNameState,lastNameState } from '../store/atoms/userAtom'


const SignUp = () => {

  const [username,setUserName] = useRecoilState(usernameState);
  const [password,setPassword] = useRecoilState(passwordState);
  const [firstName,setFirstName] = useRecoilState(firstNameState);
  const [lastName,setLastName] = useRecoilState(lastNameState); 

  const signupSubmit = async ()=>{
    console.log("in the submit button");
    
    try {

      const Response = await axios.post("http://localhost:3000/api/v1/user/signup",{
      username,
      password,
      lastName,
      firstName
    })

      alert(Response.data.message)
    

      setFirstName("");
      setLastName("");
      setUserName("");
      setPassword("");

    } catch (error) {
        console.log(error);
        
    }
    



  }

  return (
   <div className='bg-slate-300 min-h-[92vh] flex justify-center items-center'>
        <div className='bg-white rounded-xl shadow-lg w-[450px] text-center p-2 px-4 flex flex-col justify-center'>
        <Header label={"SignUp"} />
        <SubHeading label={"Enter your information to create an account"} />
        <InputComponent onChange={(e)=>setFirstName(e.target.value)} value={firstName} placeholder={"John"} label={"FirstName"}/>
        <InputComponent onChange={(e)=>setLastName(e.target.value)} value={lastName} placeholder={"Gudla"} label={"LastName"}/>
        <InputComponent onChange={(e)=>setUserName(e.target.value)} value={username} placeholder={"harkirat@gmail.com"} label={"Email"}/>
        <InputComponent onChange={(e)=>setPassword(e.target.value)} value={password} placeholder={"12345"} label={"Password"}/>
        <div className='pt-4'>
        <Button label={"SignUp"} color={"bg-gray-800"} onClick={signupSubmit} />
        </div>
        <div className='pt-3'>
          <Button label={"Login With Google"} color={"bg-red-600"}/>
        </div>
        <BottomWarning label={"Already have an account?"} buttonText={"SignIn"} to={"/signin"} />
        </div>
   </div>
  )
}

export default SignUp