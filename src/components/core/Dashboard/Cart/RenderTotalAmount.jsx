import React from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import IconBtn from "../../../common/IconBtn"
import { buyCourse } from "../../../../services/operations/studentFeaturesAPI"

export default function RenderTotalAmount() {
  const { total, cart } = useSelector((state) => state.cart)
  const { token } = useSelector((state) => state.auth)
  const { user } = useSelector((state) => state.profile)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const handleBuyCourse = () => {
    const courses = cart.map((course) => course._id)
    buyCourse(token, courses, user, navigate, dispatch)
  }

  return (
    <div className="w-full lg:w-[320px] rounded-2xl border border-richblack-700 bg-gradient-to-b from-richblack-800 to-richblack-850 p-6 shadow-xl shadow-black/20 backdrop-blur-md">
      <h3 className="text-sm font-semibold text-richblack-300">Order Summary</h3>
      <div className="my-4 flex items-baseline justify-between border-b border-richblack-700 pb-4">
        <span className="text-sm text-richblack-300">Total Price:</span>
        <span className="text-3xl font-extrabold text-yellow-50">₹{total}</span>
      </div>
      <p className="text-xs text-richblack-400 mb-6">
        Tax included. Instant course access upon checkout.
      </p>
      <IconBtn
        text="Proceed to Checkout"
        onclick={handleBuyCourse}
        customClasses="w-full justify-center py-3 text-base"
      />
    </div>
  )
}
