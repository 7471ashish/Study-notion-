import React from "react"
import { RiDeleteBin6Line } from "react-icons/ri"
import { useDispatch, useSelector } from "react-redux"
import { removeFromCart } from "../../../../slices/cartSlice"
import RatingStars from "../../../common/RatingStars"
import GetAvgRating from "../../../../utils/avgRating"

export default function RenderCartCourses() {
  const { cart } = useSelector((state) => state.cart)
  const dispatch = useDispatch()

  return (
    <div className="flex flex-1 flex-col gap-6">
      {cart.map((course, indx) => {
        const avg = GetAvgRating(course?.ratingAndReviews)
        return (
          <div
            key={course._id || indx}
            className="flex w-full flex-col sm:flex-row items-start justify-between gap-6 rounded-2xl border border-richblack-700 bg-richblack-800/80 p-5 backdrop-blur-sm transition-all hover:border-richblack-600 shadow-lg shadow-black/20"
          >
            <div className="flex flex-1 flex-col sm:flex-row gap-4">
              <img
                src={
                  course?.thumbnail ||
                  "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=600&auto=format&fit=crop"
                }
                alt={course?.courseName}
                className="h-[130px] w-full sm:w-[200px] rounded-xl object-cover"
              />
              <div className="flex flex-col justify-between space-y-1">
                <div>
                  <h3 className="text-base md:text-lg font-bold text-richblack-5 line-clamp-2">
                    {course?.courseName}
                  </h3>
                  <p className="text-xs text-yellow-50 font-medium mt-1">
                    {course?.category?.name || "Online Course"}
                  </p>
                </div>
                <div className="flex items-center gap-2 pt-2">
                  <span className="text-xs font-bold text-yellow-50">{avg || 0}</span>
                  <RatingStars Review_Count={avg} Star_Size={14} />
                  <span className="text-xs text-richblack-400">
                    ({course?.ratingAndReviews?.length || 0})
                  </span>
                </div>
              </div>
            </div>

            <div className="flex sm:flex-col items-center sm:items-end justify-between w-full sm:w-auto pt-3 sm:pt-0 border-t sm:border-t-0 border-richblack-700 gap-3">
              <span className="text-2xl font-bold text-yellow-50">
                ₹{course?.price}
              </span>
              <button
                onClick={() => dispatch(removeFromCart(course._id))}
                className="flex items-center gap-1.5 rounded-xl border border-pink-700/50 bg-pink-900/20 px-3.5 py-2 text-xs font-semibold text-pink-200 hover:bg-pink-900/40 hover:text-pink-100 transition-colors cursor-pointer"
              >
                <RiDeleteBin6Line size={14} />
                <span>Remove</span>
              </button>
            </div>
          </div>
        )
      })}
    </div>
  )
}
