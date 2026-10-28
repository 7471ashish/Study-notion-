import React from "react"
import IconBtn from "./IconBtn"

const ConfirmationModal = ({ modalData }) => {
  if (!modalData) return null

  const {
    text1,
    text,
    text2,
    btn1Text,
    btnText,
    btn2Text,
    btn2text,
    btn1Handler,
    btnHandler,
    btn2Handler,
  } = modalData

  const primaryText = text1 || text
  const primaryBtnText = btn1Text || btnText || "Confirm"
  const secondaryBtnText = btn2Text || btn2text || "Cancel"
  const onPrimary = btn1Handler || btnHandler
  const onSecondary = btn2Handler

  return (
    <div className="fixed inset-0 z-[1000] !mt-0 grid place-items-center overflow-auto bg-richblack-900/70 backdrop-blur-sm p-4">
      <div className="w-11/12 max-w-[420px] rounded-2xl border border-richblack-700 bg-gradient-to-b from-richblack-800 to-richblack-900 p-6 shadow-2xl shadow-black/60">
        <p className="text-xl font-bold text-richblack-5">{primaryText}</p>
        <p className="mt-2 text-sm text-richblack-300 leading-relaxed">{text2}</p>
        <div className="mt-6 flex items-center justify-end gap-x-3">
          <button
            onClick={onSecondary}
            className="rounded-xl bg-richblack-700 px-4 py-2.5 text-sm font-semibold text-richblack-200 hover:bg-richblack-600 hover:text-richblack-5 transition-colors cursor-pointer"
          >
            {secondaryBtnText}
          </button>
          <IconBtn
            onclick={onPrimary}
            text={primaryBtnText}
            customClasses="text-sm py-2 px-4"
          />
        </div>
      </div>
    </div>
  )
}

export default ConfirmationModal
