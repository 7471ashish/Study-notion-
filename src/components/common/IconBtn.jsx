import React from "react"

const IconBtn = ({
  text,
  onclick,
  onClick,
  children,
  disabled,
  outline = false,
  customClasses = "",
  type,
}) => {
  const handleClick = onclick || onClick

  return (
    <button
      disabled={disabled}
      onClick={handleClick}
      type={type}
      className={`flex items-center justify-center gap-x-2 rounded-xl py-2.5 px-5 font-semibold transition-all duration-200 active:scale-[0.98] cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed ${
        outline
          ? "border border-yellow-50 bg-transparent text-yellow-50 hover:bg-yellow-50/10"
          : "bg-yellow-50 text-richblack-900 hover:bg-yellow-100 shadow-md shadow-yellow-50/20"
      } ${customClasses}`}
    >
      {children ? (
        <>
          <span>{text}</span>
          {children}
        </>
      ) : (
        <span>{text}</span>
      )}
    </button>
  )
}

export default IconBtn
