import React, { useEffect, useState } from "react"
import RatingStars from "../../common/RatingStars"
import GetAvgRating from "../../../utils/avgRating"
import { Link } from "react-router-dom"
import { HiOutlineUser } from "react-icons/hi"

const Course_Card = ({ course, Height = "h-[200px]" }) => {
  const [avgReviewCount, setAvgReviewCount] = useState(0)

  useEffect(() => {
    const count = GetAvgRating(course?.ratingAndReviews)
    setAvgReviewCount(count)
  }, [course])

  return (
    <Link to={`/courses/${course?._id}`} className="group block h-full">
      <div className="flex flex-col h-full rounded-2xl bg-gradient-to-b from-richblack-800 to-richblack-900 border border-richblack-700/80 p-3.5 transition-all duration-300 hover:border-yellow-50/50 hover:shadow-[0_10px_30px_rgba(0,0,0,0.5)] hover:-translate-y-1">
        <div className="relative overflow-hidden rounded-xl bg-richblack-700">
          <img
            src={
              course?.thumbnail ||
              "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=600&auto=format&fit=crop"
            }
            alt={course?.courseName}
            className={`${Height} w-full object-cover transition-transform duration-500 group-hover:scale-105`}
          />
          <div className="absolute top-2.5 right-2.5 rounded-full bg-richblack-900/80 px-2.5 py-1 text-xs font-semibold text-yellow-50 backdrop-blur-md border border-yellow-50/20">
            ₹{course?.price}
          </div>
        </div>

        <div className="flex flex-col flex-1 justify-between gap-2.5 pt-3.5 px-1">
          <div>
            <h3 className="text-base md:text-lg font-semibold text-richblack-5 line-clamp-2 group-hover:text-yellow-50 transition-colors">
              {course?.courseName}
            </h3>
            <p className="text-xs text-richblack-300 flex items-center gap-1.5 mt-1">
              <HiOutlineUser className="text-richblack-400" />
              <span>
                {course?.instructor?.firstName} {course?.instructor?.lastName}
              </span>
            </p>
          </div>

          <div>
            <div className="flex items-center gap-2">
              <span className="text-yellow-50 font-bold text-xs">
                {avgReviewCount || 0}
              </span>
              <RatingStars Review_Count={avgReviewCount} Star_Size={14} />
              <span className="text-[11px] text-richblack-400">
                ({course?.ratingAndReviews?.length || 0})
              </span>
            </div>

            <div className="mt-2.5 pt-2.5 border-t border-richblack-700/60 flex items-center justify-between">
              <span className="text-xs text-richblack-300">Enrollment</span>
              <span className="text-sm font-bold text-yellow-50">
                ₹{course?.price}
              </span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}

export default Course_Card
