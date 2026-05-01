import React from 'react'
import { Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Sidebar from '../components/core/Dashboard/Sidebar';
const Dashboard = () => {
    const {loading:authLoading}=useSelector((state)=>state.auth)
    const {loading:profileLoading}=useSelector((state)=>state.profile);
    

    if(authLoading ||profileLoading){
        return (
            <div>Loading..</div>
        )
    }
  return (
    <div className='relative flex items-center '>
      <Sidebar></Sidebar>
      <div>
        <div>
            <Outlet></Outlet>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
