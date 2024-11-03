import React, { Fragment } from 'react'
import AppBar from '../Components/AppBar'
import Balance from '../Components/Balance'
import Users from '../Components/Users'
import Modal from '../Components/Modal'

const Dashboard = () => {

  return (
   <Fragment>
   {/* <AppBar /> */}
   <div className='m-8'>
   <Balance/>
   <Users />
   </div>
    <Modal/>
   </Fragment>
  )
}

export default Dashboard