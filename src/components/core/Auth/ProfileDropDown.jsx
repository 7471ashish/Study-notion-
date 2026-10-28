import { useRef, useState } from "react"
import { AiOutlineCaretDown } from "react-icons/ai"
import { VscDashboard, VscSignOut, VscSettingsGear } from "react-icons/vsc"
import { useDispatch, useSelector } from "react-redux"
import { Link, useNavigate } from "react-router-dom"

import useOnClickOutside from "../../../hooks/useOnClickOutside"
import { logout } from "../../../services/operations/authAPI"

const ProfileDropDown = () => {
  const { user } = useSelector((state) => state.profile)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [open, setOpen] = useState(false)
  const ref = useRef(null)

  useOnClickOutside(ref, () => setOpen(false))

  if (!user) return null

  const avatar =
    user?.image ||
    `https://api.dicebear.com/5.x/initials/svg?seed=${user?.firstName || "User"}`

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-x-1.5 p-1 rounded-full hover:bg-richblack-800 transition-colors cursor-pointer"
        aria-label="User profile menu"
      >
        <img
          src={avatar}
          alt={`profile-${user?.firstName}`}
          className="aspect-square w-8 rounded-full object-cover ring-2 ring-yellow-50/20"
        />
        <AiOutlineCaretDown
          size={12}
          className={`text-richblack-300 transition-transform ${
            open ? "rotate-180" : "rotate-0"
          }`}
        />
      </button>

      {open && (
        <div
          onClick={(e) => e.stopPropagation()}
          className="absolute right-0 top-full mt-2 w-48 rounded-2xl border border-richblack-700 bg-richblack-800/95 p-1.5 shadow-2xl backdrop-blur-xl z-[1000] divide-y divide-richblack-700/60"
        >
          {/* User info header */}
          <div className="px-3 py-2 text-xs">
            <p className="font-bold text-richblack-5 truncate">
              {user?.firstName} {user?.lastName || ""}
            </p>
            <p className="text-[11px] text-yellow-50 truncate mt-0.5">
              {user?.accountType || "Student"}
            </p>
          </div>

          <div className="py-1">
            <Link
              to="/dashboard/my-profile"
              onClick={() => setOpen(false)}
              className="flex items-center gap-x-2.5 rounded-xl px-3 py-2 text-xs font-semibold text-richblack-100 hover:bg-richblack-700 hover:text-yellow-50 transition-colors"
            >
              <VscDashboard size={16} />
              <span>Dashboard</span>
            </Link>

            <Link
              to="/dashboard/settings"
              onClick={() => setOpen(false)}
              className="flex items-center gap-x-2.5 rounded-xl px-3 py-2 text-xs font-semibold text-richblack-100 hover:bg-richblack-700 hover:text-yellow-50 transition-colors"
            >
              <VscSettingsGear size={16} />
              <span>Settings</span>
            </Link>
          </div>

          <div className="pt-1">
            <button
              onClick={() => {
                dispatch(logout(navigate))
                setOpen(false)
              }}
              className="flex w-full items-center gap-x-2.5 rounded-xl px-3 py-2 text-xs font-semibold text-pink-200 hover:bg-pink-900/30 transition-colors cursor-pointer text-left"
            >
              <VscSignOut size={16} />
              <span>Log out</span>
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default ProfileDropDown
