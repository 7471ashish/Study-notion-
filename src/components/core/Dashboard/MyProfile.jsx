import React from "react"
import { RiEditBoxLine } from "react-icons/ri"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

import { formattedDate } from "../../../utils/dateFormatter"
import IconBtn from "../../common/IconBtn"
import { HiOutlineMail, HiOutlinePhone, HiOutlineCalendar, HiOutlineUser } from "react-icons/hi"

export default function MyProfile() {
  const { user } = useSelector((state) => state.profile)
  const navigate = useNavigate()

  return (
    <div className="flex flex-col gap-8 pb-10">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-extrabold text-richblack-5 tracking-tight">
            My Profile
          </h1>
          <p className="text-sm text-richblack-400 mt-1">
            Manage your personal details and account settings
          </p>
        </div>
        <IconBtn
          text="Edit Profile"
          onclick={() => navigate("/dashboard/settings")}
          customClasses="text-sm"
        >
          <RiEditBoxLine size={16} />
        </IconBtn>
      </div>

      {/* Profile Card Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 rounded-2xl border border-richblack-700 bg-gradient-to-b from-richblack-800 to-richblack-850 p-6 sm:p-8 backdrop-blur-md shadow-xl shadow-black/20">
        <div className="flex items-center gap-x-5">
          <img
            src={
              user?.image ||
              `https://api.dicebear.com/5.x/initials/svg?seed=${user?.firstName || "User"}`
            }
            alt={`profile-${user?.firstName}`}
            className="aspect-square w-20 rounded-full object-cover ring-4 ring-yellow-50/20 shadow-lg"
          />
          <div className="space-y-1">
            <h2 className="text-xl font-bold text-richblack-5">
              {user?.firstName + " " + (user?.lastName || "")}
            </h2>
            <p className="text-sm text-richblack-300">{user?.email}</p>
            <span className="inline-block mt-1 text-xs font-semibold px-2.5 py-0.5 rounded-full bg-yellow-50/10 text-yellow-50 border border-yellow-50/20">
              {user?.accountType || "Student"}
            </span>
          </div>
        </div>
      </div>

      {/* About Section */}
      <div className="rounded-2xl border border-richblack-700 bg-richblack-800/80 p-6 sm:p-8 shadow-xl shadow-black/20 flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-bold text-richblack-5">About</h3>
          <button
            onClick={() => navigate("/dashboard/settings")}
            className="flex items-center gap-1.5 text-xs font-semibold text-yellow-50 hover:underline cursor-pointer"
          >
            <RiEditBoxLine size={14} /> Edit
          </button>
        </div>
        <p
          className={`${
            user?.additionalDetails?.about
              ? "text-richblack-200"
              : "text-richblack-500 italic"
          } text-sm leading-relaxed`}
        >
          {user?.additionalDetails?.about ||
            "No bio added yet. Tell us a little about your journey, interests, or professional goals."}
        </p>
      </div>

      {/* Personal Details Section */}
      <div className="rounded-2xl border border-richblack-700 bg-richblack-800/80 p-6 sm:p-8 shadow-xl shadow-black/20 flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-bold text-richblack-5">
            Personal Details
          </h3>
          <button
            onClick={() => navigate("/dashboard/settings")}
            className="flex items-center gap-1.5 text-xs font-semibold text-yellow-50 hover:underline cursor-pointer"
          >
            <RiEditBoxLine size={14} /> Edit
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex flex-col gap-1.5 p-4 rounded-xl bg-richblack-900/60 border border-richblack-750">
            <span className="text-xs text-richblack-400 flex items-center gap-1.5">
              <HiOutlineUser size={14} /> First Name
            </span>
            <span className="text-sm font-semibold text-richblack-5">
              {user?.firstName || "-"}
            </span>
          </div>

          <div className="flex flex-col gap-1.5 p-4 rounded-xl bg-richblack-900/60 border border-richblack-750">
            <span className="text-xs text-richblack-400 flex items-center gap-1.5">
              <HiOutlineUser size={14} /> Last Name
            </span>
            <span className="text-sm font-semibold text-richblack-5">
              {user?.lastName || "-"}
            </span>
          </div>

          <div className="flex flex-col gap-1.5 p-4 rounded-xl bg-richblack-900/60 border border-richblack-750">
            <span className="text-xs text-richblack-400 flex items-center gap-1.5">
              <HiOutlineMail size={14} /> Email Address
            </span>
            <span className="text-sm font-semibold text-richblack-5">
              {user?.email || "-"}
            </span>
          </div>

          <div className="flex flex-col gap-1.5 p-4 rounded-xl bg-richblack-900/60 border border-richblack-750">
            <span className="text-xs text-richblack-400 flex items-center gap-1.5">
              <HiOutlinePhone size={14} /> Contact Number
            </span>
            <span className="text-sm font-semibold text-richblack-5">
              {user?.additionalDetails?.contactNumber || "Add contact number"}
            </span>
          </div>

          <div className="flex flex-col gap-1.5 p-4 rounded-xl bg-richblack-900/60 border border-richblack-750">
            <span className="text-xs text-richblack-400 flex items-center gap-1.5">
              <HiOutlineUser size={14} /> Gender
            </span>
            <span className="text-sm font-semibold text-richblack-5">
              {user?.additionalDetails?.gender || "Add gender"}
            </span>
          </div>

          <div className="flex flex-col gap-1.5 p-4 rounded-xl bg-richblack-900/60 border border-richblack-750">
            <span className="text-xs text-richblack-400 flex items-center gap-1.5">
              <HiOutlineCalendar size={14} /> Date of Birth
            </span>
            <span className="text-sm font-semibold text-richblack-5">
              {user?.additionalDetails?.dateOfBirth
                ? formattedDate(user.additionalDetails.dateOfBirth)
                : "Add date of birth"}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
