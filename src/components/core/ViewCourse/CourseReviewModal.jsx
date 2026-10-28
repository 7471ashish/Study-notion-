import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { RxCross2 } from "react-icons/rx"
import { FaStar } from "react-icons/fa"
import { useSelector } from "react-redux"

import { createRating } from "../../../services/operations/courseDetailsAPI"
import IconBtn from "../../common/IconBtn"

export default function CourseReviewModal({ setReviewModal }) {
  const { user } = useSelector((state) => state.profile)
  const { token } = useSelector((state) => state.auth)
  const { courseEntireData } = useSelector((state) => state.viewCourse)

  const [rating, setRating] = useState(0)
  const [hoverRating, setHoverRating] = useState(0)

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm()

  useEffect(() => {
    setValue("courseExperience", "")
    setValue("courseRating", 0)
  }, [setValue])

  const handleStarClick = (val) => {
    setRating(val)
    setValue("courseRating", val)
  }

  const onSubmit = async (data) => {
    await createRating(
      {
        courseId: courseEntireData?._id,
        rating: data.courseRating || rating,
        review: data.courseExperience,
      },
      token
    )
    setReviewModal(false)
  }

  return (
    <div className="fixed inset-0 z-[1000] !mt-0 grid h-screen w-screen place-items-center overflow-auto bg-richblack-900/80 backdrop-blur-md p-4">
      <div className="my-10 w-11/12 max-w-[600px] rounded-2xl border border-richblack-700 bg-richblack-800 shadow-2xl shadow-black/60 overflow-hidden">
        {/* Modal Header */}
        <div className="flex items-center justify-between border-b border-richblack-700 bg-richblack-750 px-6 py-4">
          <p className="text-lg font-bold text-richblack-5">Add Course Review</p>
          <button
            onClick={() => setReviewModal(false)}
            className="p-1 rounded-lg text-richblack-300 hover:text-richblack-5 hover:bg-richblack-700 transition-colors"
          >
            <RxCross2 className="text-xl" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 md:p-8">
          <div className="flex items-center justify-center gap-x-4">
            <img
              src={
                user?.image ||
                `https://api.dicebear.com/5.x/initials/svg?seed=${user?.firstName || "Student"}`
              }
              alt={user?.firstName}
              className="aspect-square w-[52px] rounded-full object-cover ring-2 ring-yellow-50/20"
            />
            <div>
              <p className="font-bold text-richblack-5">
                {user?.firstName} {user?.lastName}
              </p>
              <p className="text-xs text-caribbeangreen-100">Posting publicly</p>
            </div>
          </div>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="mt-6 flex flex-col items-center"
          >
            {/* Interactive Star Rating */}
            <div className="flex items-center gap-2 my-3">
              {[1, 2, 3, 4, 5].map((star) => {
                const isFilled = (hoverRating || rating) >= star
                return (
                  <button
                    type="button"
                    key={star}
                    onClick={() => handleStarClick(star)}
                    onMouseEnter={() => setHoverRating(star)}
                    onMouseLeave={() => setHoverRating(0)}
                    className="p-1 transition-transform hover:scale-125 focus:outline-none cursor-pointer"
                  >
                    <FaStar
                      size={28}
                      className={
                        isFilled
                          ? "text-yellow-50 drop-shadow-[0_0_6px_rgba(255,214,10,0.5)]"
                          : "text-richblack-600"
                      }
                    />
                  </button>
                )
              })}
            </div>
            <p className="text-xs text-richblack-300 mb-4">
              {rating > 0 ? `${rating} out of 5 stars` : "Click to rate"}
            </p>

            <div className="flex w-full flex-col space-y-2">
              <label
                className="text-sm font-medium text-richblack-200"
                htmlFor="courseExperience"
              >
                Add Your Experience <sup className="text-pink-200">*</sup>
              </label>
              <textarea
                id="courseExperience"
                rows={4}
                placeholder="What did you think of the instructor, course content, and pace?..."
                {...register("courseExperience", { required: true })}
                className="w-full rounded-xl bg-richblack-700/80 border border-richblack-600 p-3.5 text-sm text-richblack-5 placeholder:text-richblack-400 focus:outline-none focus:border-yellow-50 transition-colors"
              />
              {errors.courseExperience && (
                <span className="text-xs text-pink-200">
                  Please describe your experience before submitting.
                </span>
              )}
            </div>

            <div className="mt-6 flex w-full justify-end gap-x-3">
              <button
                type="button"
                onClick={() => setReviewModal(false)}
                className="rounded-xl bg-richblack-700 px-5 py-2.5 text-sm font-semibold text-richblack-200 hover:bg-richblack-600 hover:text-richblack-5 transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <IconBtn text="Submit Review" type="submit" />
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
