import { useRef } from "react"
import axios from "axios";
import { useSetRecoilState } from "recoil";
import { UsersAtom } from "../store/atoms/UsersAtom";
const useDebounce =  ()=>{
    let Timer = useRef();
    const setUsers = useSetRecoilState(UsersAtom)
    const getUsers = async(filter)=>{
        console.log(filter);
        
        const Response =await axios.get(`http://localhost:3000/api/v1/user/bulk?filter=${filter}`,{
            headers:{
                token:localStorage.getItem("token")
            }
        })
        
        
        setUsers(Response.data.UserData)

    }

    const DebouncedSearchBackend = (filter)=>{
        clearTimeout(Timer);
        Timer = setTimeout(()=>{

            getUsers(filter)
            
        },500);
    }

    return DebouncedSearchBackend;

}

export {useDebounce}