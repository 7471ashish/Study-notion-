import React, { useState } from "react"
import { VscSignOut, VscSettingsGear } from "react-icons/vsc"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

import { sidebarLinks } from "../../../data/dashboard-links"
import { logout } from "../../../services/operations/authAPI"
import ConfirmationModal from "../../common/ConfirmationModal"
import SidebarLink from "./SidebarLink"

export default function Sidebar() {
  const { user, loading: profileLoading } = useSelector(
    (state) => state.profile
  )
  const { loading: authLoading } = useSelector((state) => state.auth)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [confirmationModal, setConfirmationModal] = useState(null)

  if (profileLoading || authLoading) {
    return (
      <div className="grid h-[calc(100vh-3.5rem)] min-w-[220px] items-center border-r border-richblack-700 bg-richblack-800">
        <div className="spinner"></div>
      </div>
    )
  }

  return (
    <>
      <div className="flex h-[calc(100vh-3.5rem)] min-w-[220px] flex-col justify-between border-r border-richblack-700 bg-richblack-850 py-6 select-none">
        <div className="flex flex-col">
          <div className="px-6 pb-4">
            <span className="text-[10px] uppercase font-bold tracking-wider text-richblack-400">
              Dashboard Navigation
            </span>
          </div>

          <div className="flex flex-col">
            {sidebarLinks.map((link) => {
              if (link.type && user?.accountType !== link.type) return null
              return (
                <SidebarLink key={link.id} link={link} iconName={link.icon} />
              )
            })}
          </div>

          <div className="mx-auto my-6 h-[1px] w-10/12 bg-richblack-700" />

          <div className="flex flex-col">
            <SidebarLink
              link={{ name: "Settings", path: "/dashboard/settings" }}
              iconName="VscSettingsGear"
            />
            <button
              onClick={() =>
                setConfirmationModal({
                  text1: "Are you sure?",
                  text2: "You will be logged out of your account.",
                  btn1Text: "Logout",
                  btn2Text: "Cancel",
                  btn1Handler: () => dispatch(logout(navigate)),
                  btn2Handler: () => setConfirmationModal(null),
                })
              }
              className="px-6 py-2.5 text-xs md:text-sm font-medium text-richblack-300 hover:text-pink-200 hover:bg-richblack-750/50 transition-colors text-left cursor-pointer"
            >
              <div className="flex items-center gap-x-3">
                <VscSignOut className="text-base" />
                <span>Logout</span>
              </div>
            </button>
          </div>
        </div>

        {/* User Mini Card at bottom of sidebar */}
        <div className="mx-4 p-3 rounded-xl bg-richblack-900/60 border border-richblack-750 flex items-center gap-3">
          <img
            src={
              user?.image ||
              `https://api.dicebear.com/5.x/initials/svg?seed=${user?.firstName || "User"}`
            }
            alt="avatar"
            className="w-8 h-8 rounded-full object-cover ring-2 ring-yellow-50/20"
          />
          <div className="truncate">
            <p className="text-xs font-semibold text-richblack-5 truncate">
              {user?.firstName} {user?.lastName || ""}
            </p>
            <p className="text-[11px] text-yellow-50 truncate">
              {user?.accountType}
            </p>
          </div>
        </div>
      </div>
      {confirmationModal && <ConfirmationModal modalData={confirmationModal} />}
    </>
  )
}
