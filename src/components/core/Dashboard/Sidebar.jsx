import React from 'react'
import {sidebarLinks} from '../../../data/dashboard-links'
import { logout } from '../../../services/operations/authApi'
import { useDispatch, useSelector } from 'react-redux'
import SideBarLink from './SideBarLink'
import { IoMdSettings } from "react-icons/io";
import { useNavigate } from 'react-router-dom'
import { VscSignOut } from "react-icons/vsc";
import ConfirmationModal from '../../common/ConfirmationModal'
import { useState } from 'react'
const Sidebar = () => {

    const{user,loading:profileLoading}=useSelector((state)=>state.profile);
    const {loading:authLoading}=useSelector((state)=>state.auth)
    const dispatch=useDispatch();
    const navigate=useNavigate();
    const [confirmationModal,setConfirmationModal]=useState(null);
    if(profileLoading || authLoading){
        return (
            <div>
                loading..
            </div>
        )
    }
  return (
    <div>
        <div>
            <div>
                {
                    sidebarLinks.map((link)=>{
                        if(link.type && user?.accountType!==link.type) return null;
                        return(
                            <SideBarLink link={link} iconName={link.icon} key={link.id} ></SideBarLink>
                        )
                    })
                }
            </div>

            <div className='flex-auto mt-6 h-[1px] w-10/12 bg-[#424854]'>
            </div>


            <div className='flex flex-col'>
                <SideBarLink link={{name:"Settings",path:'/dashboard/settings'}} iconName={"IoMdSettings"}></SideBarLink>



               <button onClick={()=> {
                    setConfirmationModal({
                        text1: "Are you sure?",
                        text2: "You will be logged out of your account.",
                        btn1Text: "Logout",
                        btn2Text: "Cancel",
                        btn1Handler: ()=> dispatch(logout(navigate)),
                        btn2Handler: ()=> setConfirmationModal(null),
                    })
                }}
                className="px-8 py-2 text-sm font-medium ">
                    <div className="flex items-center gap-x-2">
                    <VscSignOut className="text-lg" />
                    <span>Logout</span>
                    </div>
                </button>
                
            </div>
        </div>

        {confirmationModal && <ConfirmationModal modalData={confirmationModal}></ConfirmationModal>}
    </div>
  )
}

export default Sidebar
