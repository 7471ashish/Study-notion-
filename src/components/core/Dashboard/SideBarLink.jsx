import React from "react"
import * as VscIcons from "react-icons/vsc"
import * as IoIcons from "react-icons/io"
import * as Io5Icons from "react-icons/io5"
import { useDispatch } from "react-redux"
import { NavLink, matchPath, useLocation } from "react-router-dom"
import { resetCourseState } from "../../../slices/courseSlice"

export default function SidebarLink({ link, iconName }) {
  const Icon =
    VscIcons[iconName] ||
    IoIcons[iconName] ||
    Io5Icons[iconName] ||
    VscIcons.VscCircle

  const location = useLocation()
  const dispatch = useDispatch()

  const matchRoute = (route) => {
    return matchPath({ path: route }, location.pathname)
  }

  const isActive = matchRoute(link.path)

  return (
    <NavLink
      to={link.path}
      onClick={() => dispatch(resetCourseState())}
      className={`relative flex items-center px-6 py-2.5 text-xs md:text-sm font-medium transition-all duration-200 ${
        isActive
          ? "bg-yellow-50/15 text-yellow-50 font-semibold"
          : "text-richblack-300 hover:text-richblack-5 hover:bg-richblack-750/50"
      }`}
    >
      <span
        className={`absolute left-0 top-0 h-full w-[3px] bg-yellow-50 rounded-r transition-opacity ${
          isActive ? "opacity-100" : "opacity-0"
        }`}
      />
      <div className="flex items-center gap-x-3">
        {Icon && <Icon className="text-base" />}
        <span>{link.name}</span>
      </div>
    </NavLink>
  )
}
