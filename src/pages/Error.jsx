import React from "react"
import { Link } from "react-router-dom"
import { HiOutlineArrowNarrowLeft } from "react-icons/hi"

const Error = () => {
  return (
    <div className="flex min-h-[calc(100vh-3.5rem)] flex-col items-center justify-center bg-richblack-900 px-4 text-center">
      <div className="relative">
        <h1 className="text-8xl md:text-9xl font-black text-richblack-800 tracking-widest select-none">
          404
        </h1>
        <p className="absolute inset-0 flex items-center justify-center text-2xl md:text-3xl font-extrabold text-yellow-50">
          Page Not Found
        </p>
      </div>

      <p className="mt-4 max-w-md text-sm md:text-base text-richblack-300">
        The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
      </p>

      <Link
        to="/"
        className="mt-8 flex items-center gap-2 rounded-xl bg-yellow-50 px-6 py-3 font-bold text-richblack-900 hover:bg-yellow-100 transition-all shadow-lg shadow-yellow-50/20 active:scale-95 cursor-pointer"
      >
        <HiOutlineArrowNarrowLeft size={18} />
        <span>Back to Home</span>
      </Link>
    </div>
  )
}

export default Error
