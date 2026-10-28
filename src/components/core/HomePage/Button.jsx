import React from 'react'
import {Link} from 'react-router-dom'

const Button = ({children,active,linkto}) => {
  return (
    <div>
      <Link to={linkto}>
        <div
          className={`text-center text-[13px] sm:text-[14px] px-6 py-3 rounded-lg font-semibold tracking-wide transition-all duration-200 shadow-sm ${
            active
              ? "bg-yellow-50 text-richblack-900 shadow-yellow-500/20 hover:bg-yellow-25 hover:shadow-md"
              : "bg-richblack-800 text-richblack-200 border border-richblack-700/80 hover:bg-richblack-700 hover:text-white hover:border-richblack-600"
          } hover:-translate-y-0.5 active:scale-95`}
        >
          {children}
        </div>
      </Link>
    </div>
  )
}

export default Button
