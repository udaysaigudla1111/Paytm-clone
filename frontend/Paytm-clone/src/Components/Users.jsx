import React,{useEffect} from 'react'
import User from './User'
import { useRecoilValue } from 'recoil'
import { UsersAtom } from '../store/atoms/UsersAtom'
import axios from 'axios'
import { useDebounce } from '../CustomHooks/useDebounce'
import {DragDropContext,Droppable,Draggable} from 'react-beautiful-dnd'
import { useSetRecoilState } from 'recoil'
import { useRef } from 'react'

const Users = () => {
  
    const users = useRecoilValue(UsersAtom);
    const setUsers = useSetRecoilState(UsersAtom);

    const searchUsersFunction = useDebounce();

    useEffect(()=>{
         searchUsersFunction("");
    },[])

   console.log(users);

   const handleOnDragEnd = (result)=>{
      let userArray = [...users];

      if(!result.destination) return;

      let [selectedRow] = userArray.splice(result.source.index,1);

      userArray.splice(result.destination.index,0,selectedRow);

      setUsers(userArray);

   }
   
  return (
    <div className='mt-6'>
        <div className='font-bold text-lg'>Users</div>
        <div className='my-2'>
        <input type="text" className='w-full px-2 py-1 border border-slate-200 rounded' placeholder='Search Users...' onChange={(e)=>{ searchUsersFunction(e.target.value)}} />
        </div>
        <DragDropContext onDragEnd={handleOnDragEnd}>
        <Droppable droppableId='Users-1'>
          {(provided)=>{
            return  <div ref={provided.innerRef} {...provided.droppableProps}  className='mt-4'>
               {users.map((user,index)=>{
              return <Draggable draggableId={user._id.toString()} key={user._id} index={index}>
                {(provided)=>{
                    return <User key={user._id} user={user} innerRef={provided.innerRef} provided={provided} />
                }}
                </Draggable>
               })}
               {provided.placeholder}
        </div>
          }}
       
        </Droppable>
        </DragDropContext>
    </div>
  )
}

export default Users



 // const users = [
    //     {
    //         username: "rajesh@gmail.com",
    //         _id: "67247145c753b1bcdb5982c5",
    //         firstName: "rajesh",
    //         lastName: "gudla"
    //     },
    //     {
    //         username: "uday@gmail.com",
    //         _id: "672475b0bfe1d0d87322bce0",
    //         firstName: "uday",
    //         lastName: "gudla"
    //     },
    //     {
    //         username: "ajay@gmail.com",
    //         _id: "6724b8a53fc326d4c3c52efc",
    //         firstName: "vijay",
    //         lastName: "puli"
    //     },
    //     {
    //         username: "harkirat@gmail.com",
    //         _id: "6725f759a97dbe1d6c3ea026",
    //         firstName: "harkirat",
    //         lastName: "Singh"
    //     },
    //     {
    //         username: "vikram@gmail.com",
    //         _id: "6725f931a97dbe1d6c3ea02b",
    //         firstName: "vikram",
    //         lastName: "aditya"
    //     }
    // ]