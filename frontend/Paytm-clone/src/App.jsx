import React, { useEffect } from 'react'
import SignUp from './Pages/SignUp'
import { BrowserRouter as Router,Routes,Route, Navigate } from 'react-router-dom'
import SignIn from './Pages/SignIn';
import SendMoney from './Pages/SendMoney';
import Dashboard from './Pages/Dashboard';
import { authAtom, nameAtom } from './store/atoms/authNameAtom';
import { useRecoilState } from 'recoil';
import axios from 'axios';
import { useSetRecoilState } from 'recoil';
import AppBar from './Components/AppBar';

const App = () => {
  const [auth,setAuth] = useRecoilState(authAtom);
  const setName = useSetRecoilState(nameAtom);
  useEffect(()=>{
    const getUser = async()=>{
      try {
           const Response = await axios.get("http://localhost:3000/api/v1/user/me",{
        headers:{
          token:localStorage.getItem("token")
        }
      })

      setAuth(true);
      setName(Response.data.firstName);

      } catch (error) {
        console.log(error);
       
      }
     
    }
    if(localStorage.getItem("token"))
    getUser();
  },[])

  return (
    <Router>
       <AppBar />
      <Routes>
      <Route path='/signup' element={auth?<Navigate to="/dashboard"/>:<SignUp/>}/>
      <Route path='/signin' element={auth?<Navigate to="/dashboard"/>:<SignIn/>} />
      <Route path='/dashboard' element={auth?<Dashboard />:<Navigate to="/signup"/>} />
      <Route path='/send'  element={auth?<SendMoney/>:<Navigate to="/signup" />}/>
      <Route path="/" element={auth?<Navigate to="/dashboard"/>:<Navigate to="/signup"/>} />
      </Routes>
    </Router>

  );
} 

export default App
