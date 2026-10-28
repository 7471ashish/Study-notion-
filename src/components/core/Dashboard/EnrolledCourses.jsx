import React, { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { getUserEnrolledCourses } from "../../../services/operations/profileAPI"
import { FaGraduationCap, FaPlay } from "react-icons/fa"

export default function EnrolledCourses() {
  const { token } = useSelector((state) => state.auth)
  const navigate = useNavigate()

  const [enrolledCourses, setEnrolledCourses] = useState(null)

  const getEnrolledCourses = async () => {
    try {
      const res = await getUserEnrolledCourses(token)
      setEnrolledCourses(res || [])
    } catch (error) {
      console.error("Could not fetch enrolled courses:", error)
      setEnrolledCourses([])
    }
  }

  useEffect(() => {
    if (token) {
      getEnrolledCourses()
    }
  }, [token])

  return (
    <div className="flex flex-col gap-6 pb-10">
      <div>
        <h1 className="text-3xl font-extrabold text-richblack-5 tracking-tight">
          Enrolled Courses
        </h1>
        <p className="text-sm text-richblack-400 mt-1">
          Continue learning from where you left off
        </p>
      </div>

      {!enrolledCourses ? (
        <div className="grid min-h-[40vh] place-items-center">
          <div className="spinner"></div>
        </div>
      ) : enrolledCourses.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-richblack-700 bg-richblack-800/40 p-12 text-center my-6">
          <div className="p-4 rounded-full bg-richblack-800 text-yellow-50 mb-4 border border-richblack-700">
            <FaGraduationCap size={32} />
          </div>
          <h2 className="text-xl font-bold text-richblack-5">No enrolled courses yet</h2>
          <p className="text-sm text-richblack-400 mt-1 max-w-sm">
            You haven&apos;t enrolled in any courses. Explore our catalog and start learning today!
          </p>
          <button
            onClick={() => navigate("/catalog/web-development")}
            className="mt-6 rounded-xl bg-yellow-50 px-6 py-2.5 text-sm font-bold text-richblack-900 hover:bg-yellow-100 transition-colors cursor-pointer shadow-lg shadow-yellow-50/20"
          >
            Explore Courses
          </button>
        </div>
      ) : (
        <div className="flex flex-col gap-4 mt-2">
          {enrolledCourses.map((course, i) => {
            const firstSectionId = course.courseContent?.[0]?._id
            const firstSubSectionId =
              course.courseContent?.[0]?.subSection?.[0]?._id
            const progress = course.progressPercentage || 0

            return (
              <div
                key={course._id || i}
                onClick={() => {
                  if (firstSectionId && firstSubSectionId) {
                    navigate(
                      `/view-course/${course._id}/section/${firstSectionId}/sub-section/${firstSubSectionId}`
                    )
                  }
                }}
                className="group flex flex-col md:flex-row items-start md:items-center justify-between gap-6 rounded-2xl border border-richblack-700 bg-gradient-to-b from-richblack-800 to-richblack-850 p-5 backdrop-blur-md shadow-xl shadow-black/20 hover:border-yellow-50/50 transition-all duration-300 cursor-pointer"
              >
                <div className="flex items-center gap-4 flex-1">
                  <img
                    src={
                      course.thumbnail ||
                      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=600&auto=format&fit=crop"
                    }
                    alt={course.courseName}
                    className="h-16 w-24 rounded-xl object-cover ring-1 ring-richblack-700 group-hover:scale-105 transition-transform"
                  />
                  <div>
                    <h3 className="font-bold text-base md:text-lg text-richblack-5 group-hover:text-yellow-50 transition-colors line-clamp-1">
                      {course.courseName}
                    </h3>
                    <p className="text-xs text-richblack-300 line-clamp-1 mt-1">
                      {course.courseDescription}
                    </p>
                    <span className="inline-block text-[11px] font-semibold text-yellow-50/90 mt-1">
                      {course.totalDuration || "Self-Paced"}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-6 w-full md:w-auto justify-between md:justify-end border-t md:border-t-0 border-richblack-700/60 pt-3 md:pt-0">
                  <div className="flex flex-col gap-1.5 w-40">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-richblack-400">Progress</span>
                      <span className="font-bold text-yellow-50">{progress}%</span>
                    </div>
                    <div className="w-full bg-richblack-700 h-2 rounded-full overflow-hidden">
                      <div
                        className="bg-yellow-50 h-full rounded-full transition-all duration-500"
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                  </div>

                  <button className="flex h-10 w-10 items-center justify-center rounded-full bg-yellow-50 text-richblack-900 group-hover:scale-110 shadow-md shadow-yellow-50/20 transition-transform">
                    <FaPlay size={12} className="ml-0.5" />
                  </button>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
