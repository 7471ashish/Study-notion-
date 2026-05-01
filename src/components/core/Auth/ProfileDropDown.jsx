import { useRef, useState } from "react"
import { AiOutlineCaretDown } from "react-icons/ai"
import { VscDashboard, VscSignOut } from "react-icons/vsc"
import { useDispatch, useSelector } from "react-redux"
import { Link, useNavigate } from "react-router-dom"


import useOnClickOutside from "../../../hooks/useOnClickOutside"
import { logout } from "../../../services/operations/authApi"
const ProfileDropDown = () => {
  const {user}=useSelector((state)=>state.profile);
  console.log("user is:",user);
  const dispatch=useDispatch()
  const navigate=useNavigate()
  const [open,setOpen]=useState(false);
  const ref=useRef(null)
  useOnClickOutside(ref, () => setOpen(false))
  if(!user){
    return null;
  }
  return (
    <div>
        <button className="relative" onClick={() => setOpen(true)}>
      <div className="flex items-center gap-x-1">
        <img
          src={user?.image}
          alt={`profile-${user?.firstName}`}
          className="aspect-square w-[30px] rounded-full object-cover"
        />
        <AiOutlineCaretDown className="text-sm text-[#47A5C5]" />
      </div>
      {open && (
        <div
          onClick={(e) => e.stopPropagation()}
         
          className="absolute top-[118%] right-0 z-[1000] divide-y-[1px] divide-[#053B48] overflow-hidden rounded-md border-[1px] border-[#053B48] bg-[#022B32]"
          ref={ref}
        >
          <Link to="/dashboard/my-profile" onClick={() => setOpen(false)}>
            <div className="flex w-full items-center gap-x-1 py-[10px] px-[12px] text-sm text-[#F1F2FF] hover:bg-[#2C333F] hover:text-[#DBDDEA]">
              <VscDashboard className="text-lg" />
              Dashboard
            </div>
          </Link>
          <div
            onClick={() => {
              dispatch(logout(navigate))
              setOpen(false)
            }}
            className="flex w-full items-center gap-x-1 py-[10px] px-[12px] text-sm text-[#AFB2BF] hover:bg-[#2C333F] hover:text-[#DBDDEA]"
          >
            <VscSignOut className="text-lg" />
            Logout
          </div>
        </div>
      )}
    </button>
    </div>
  )
}

export default ProfileDropDown
