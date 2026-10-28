import React from "react"
import { toast } from "react-hot-toast"
import { BsFillCaretRightFill } from "react-icons/bs"
import { FaShareSquare } from "react-icons/fa"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

import { addToCart } from "../../../slices/cartSlice"
import { ACCOUNT_TYPE } from "../../../utils/constants"

function CourseDetailsCard({ course, setConfirmationModal, handleBuyCourse }) {
  const { user } = useSelector((state) => state.profile)
  const { token } = useSelector((state) => state.auth)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const {
    thumbnail: ThumbnailImage,
    price: CurrentPrice,
    _id: courseId,
  } = course || {}

  const isEnrolled = Boolean(
    user && course?.studentsEnrolled && course.studentsEnrolled.includes(user?._id)
  )

  const handleShare = () => {
    if (navigator.clipboard?.writeText) {
      navigator.clipboard.writeText(window.location.href)
      toast.success("Link copied to clipboard!")
    } else {
      toast.success(window.location.href)
    }
  }

  const handleAddToCart = () => {
    if (user && user?.accountType === ACCOUNT_TYPE.INSTRUCTOR) {
      toast.error("Instructors cannot purchase courses.")
      return
    }
    if (token) {
      dispatch(addToCart(course))
      return
    }
    setConfirmationModal({
      text1: "You are not logged in!",
      text2: "Please login to add this course to your cart.",
      btn1Text: "Login",
      btn2Text: "Cancel",
      btn1Handler: () => navigate("/login"),
      btn2Handler: () => setConfirmationModal(null),
    })
  }

  return (
    <div className="flex flex-col gap-5 rounded-2xl bg-gradient-to-b from-richblack-800 to-richblack-900 border border-richblack-700/80 p-5 text-richblack-5 shadow-2xl shadow-black/50 backdrop-blur-md">
      {/* Course Thumbnail */}
      <div className="relative overflow-hidden rounded-xl bg-richblack-700">
        <img
          src={
            ThumbnailImage ||
            "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=600&auto=format&fit=crop"
          }
          alt={course?.courseName}
          className="max-h-[260px] min-h-[180px] w-full object-cover transition-transform duration-500 hover:scale-105"
        />
        <div className="absolute top-3 right-3 rounded-full bg-richblack-900/80 px-3 py-1 text-xs font-semibold text-caribbeangreen-100 border border-caribbeangreen-100/30 backdrop-blur-sm">
          Lifetime Access
        </div>
      </div>

      <div className="px-1 flex flex-col gap-4">
        <div className="flex items-baseline justify-between">
          <div className="text-3xl font-extrabold text-richblack-5">
            ₹{CurrentPrice}
          </div>
          <span className="text-xs font-medium text-caribbeangreen-100 bg-caribbeangreen-900/40 border border-caribbeangreen-300/20 px-2 py-0.5 rounded-full">
            Special Launch Price
          </span>
        </div>

        <div className="flex flex-col gap-3">
          <button
            className="w-full py-3 px-6 rounded-xl font-bold bg-yellow-50 hover:bg-yellow-100 text-richblack-900 shadow-lg shadow-yellow-50/20 transition-all duration-200 active:scale-[0.98] cursor-pointer"
            onClick={
              isEnrolled
                ? () => navigate("/dashboard/enrolled-courses")
                : handleBuyCourse
            }
          >
            {isEnrolled ? "Go To Course" : "Buy Now"}
          </button>

          {!isEnrolled && (
            <button
              onClick={handleAddToCart}
              className="w-full py-3 px-6 rounded-xl font-semibold bg-richblack-700 hover:bg-richblack-600 text-richblack-5 border border-richblack-600 transition-all duration-200 active:scale-[0.98] cursor-pointer"
            >
              Add to Cart
            </button>
          )}
        </div>

        <p className="text-center text-xs text-richblack-300">
          30-Day Money-Back Guarantee • Certificate on Completion
        </p>

        <div className="pt-4 border-t border-richblack-700/60">
          <p className="text-sm font-semibold text-richblack-5 mb-3">
            This Course Includes:
          </p>
          <div className="flex flex-col gap-2.5 text-xs text-caribbeangreen-100">
            {course?.instructions && course.instructions.length > 0 ? (
              course.instructions.map((item, i) => (
                <div className="flex items-start gap-2" key={i}>
                  <BsFillCaretRightFill className="mt-0.5 flex-shrink-0 text-yellow-50" />
                  <span className="text-richblack-200">{item}</span>
                </div>
              ))
            ) : (
              <>
                <div className="flex items-center gap-2">
                  <BsFillCaretRightFill className="text-yellow-50 flex-shrink-0" />
                  <span className="text-richblack-200">Full lifetime access & free future updates</span>
                </div>
                <div className="flex items-center gap-2">
                  <BsFillCaretRightFill className="text-yellow-50 flex-shrink-0" />
                  <span className="text-richblack-200">Access on mobile, tablet and TV</span>
                </div>
                <div className="flex items-center gap-2">
                  <BsFillCaretRightFill className="text-yellow-50 flex-shrink-0" />
                  <span className="text-richblack-200">Downloadable code files and resources</span>
                </div>
              </>
            )}
          </div>
        </div>

        <div className="text-center pt-2">
          <button
            className="inline-flex items-center gap-2 text-xs font-semibold text-yellow-50 hover:text-yellow-100 transition-colors py-2 px-4 rounded-lg bg-yellow-50/10 border border-yellow-50/20"
            onClick={handleShare}
          >
            <FaShareSquare size={13} /> Share this Course
          </button>
        </div>
      </div>
    </div>
  )
}

export default CourseDetailsCard
