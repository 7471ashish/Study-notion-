import React, { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { fetchInstructorCourses } from "../../../../services/operations/courseDetailsAPI"
import { getInstructorData } from "../../../../services/operations/profileAPI"
import InstructorChart from "./InstructorChart"
import { Link } from "react-router-dom"
import { FaGraduationCap, FaRupeeSign, FaBookOpen } from "react-icons/fa"
import { HiPlus } from "react-icons/hi"

export default function Instructor() {
  const { token } = useSelector((state) => state.auth)
  const { user } = useSelector((state) => state.profile)
  const [loading, setLoading] = useState(false)
  const [instructorData, setInstructorData] = useState(null)
  const [courses, setCourses] = useState([])

  useEffect(() => {
    ;(async () => {
      setLoading(true)
      try {
        const instructorApiData = await getInstructorData(token)
        const result = await fetchInstructorCourses(token)
        if (instructorApiData && instructorApiData.length) {
          setInstructorData(instructorApiData)
        }
        if (result) {
          setCourses(result)
        }
      } catch (err) {
        console.error("Error loading instructor data:", err)
      }
      setLoading(false)
    })()
  }, [token])

  const totalAmount = instructorData?.reduce(
    (acc, curr) => acc + Number(curr.totalAmountGenerated || 0),
    0
  ) || 0

  const totalStudents = instructorData?.reduce(
    (acc, curr) => acc + Number(curr.totalStudentsEnrolled || 0),
    0
  ) || 0

  return (
    <div className="flex flex-col gap-8 pb-10">
      {/* Welcome Banner */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-richblack-800 pb-6">
        <div>
          <h1 className="text-3xl font-extrabold text-richblack-5 tracking-tight">
            Hi, {user?.firstName} 👋
          </h1>
          <p className="text-sm text-richblack-400 mt-1">
            Track student engagement, course revenue, and publish new content.
          </p>
        </div>
        <Link
          to="/dashboard/add-course"
          className="flex items-center gap-2 rounded-xl bg-yellow-50 px-5 py-2.5 text-sm font-bold text-richblack-900 hover:bg-yellow-100 transition-colors shadow-lg shadow-yellow-50/20 active:scale-95"
        >
          <HiPlus size={16} /> Create Course
        </Link>
      </div>

      {loading ? (
        <div className="grid min-h-[40vh] place-items-center">
          <div className="spinner"></div>
        </div>
      ) : courses.length > 0 ? (
        <div className="flex flex-col gap-8">
          {/* Top Row: Chart + Stats Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
            {/* Chart Area */}
            <div className="lg:col-span-8 flex">
              <InstructorChart
                courses={
                  instructorData && instructorData.length > 0
                    ? instructorData
                    : courses.map((c) => ({
                        courseName: c.courseName,
                        totalStudentsEnrolled:
                          c.studentsEnrolled?.length ?? c.studentsEnroled?.length ?? 0,
                        totalAmountGenerated:
                          (c.studentsEnrolled?.length ?? c.studentsEnroled?.length ?? 0) * (c.price || 0),
                      }))
                }
              />
            </div>

            {/* Quick Stats Column */}
            <div className="lg:col-span-4 flex flex-col justify-between gap-4">
              <div className="flex items-center gap-4 rounded-2xl border border-richblack-700 bg-gradient-to-br from-richblack-800 to-richblack-850 p-6 backdrop-blur-md shadow-xl shadow-black/20">
                <div className="p-3.5 rounded-xl bg-yellow-50/10 text-yellow-50 border border-yellow-50/20">
                  <FaBookOpen size={24} />
                </div>
                <div>
                  <p className="text-xs font-semibold text-richblack-400 uppercase tracking-wider">
                    Total Courses
                  </p>
                  <p className="text-2xl font-black text-richblack-5 mt-0.5">
                    {courses.length}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4 rounded-2xl border border-richblack-700 bg-gradient-to-br from-richblack-800 to-richblack-850 p-6 backdrop-blur-md shadow-xl shadow-black/20">
                <div className="p-3.5 rounded-xl bg-caribbeangreen-100/10 text-caribbeangreen-100 border border-caribbeangreen-100/20">
                  <FaGraduationCap size={24} />
                </div>
                <div>
                  <p className="text-xs font-semibold text-richblack-400 uppercase tracking-wider">
                    Total Students
                  </p>
                  <p className="text-2xl font-black text-richblack-5 mt-0.5">
                    {totalStudents}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4 rounded-2xl border border-richblack-700 bg-gradient-to-br from-richblack-800 to-richblack-850 p-6 backdrop-blur-md shadow-xl shadow-black/20">
                <div className="p-3.5 rounded-xl bg-blue-100/10 text-blue-100 border border-blue-100/20">
                  <FaRupeeSign size={24} />
                </div>
                <div>
                  <p className="text-xs font-semibold text-richblack-400 uppercase tracking-wider">
                    Total Revenue
                  </p>
                  <p className="text-2xl font-black text-richblack-5 mt-0.5">
                    ₹{totalAmount}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Published Courses Preview */}
          <div className="rounded-2xl border border-richblack-700 bg-richblack-800/80 p-6 backdrop-blur-md shadow-xl shadow-black/20">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-lg font-bold text-richblack-5">Your Courses</h2>
              <Link
                to="/dashboard/my-courses"
                className="text-xs font-semibold text-yellow-50 hover:underline"
              >
                View all ({courses.length})
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {courses.slice(0, 3).map((course) => {
                const enrolledCount =
                  course.studentsEnrolled?.length ?? course.studentsEnroled?.length ?? 0
                return (
                  <div
                    key={course._id}
                    className="flex flex-col rounded-xl border border-richblack-700 bg-richblack-850 p-3.5 overflow-hidden transition-all hover:border-yellow-50/40 hover:shadow-lg"
                  >
                    <img
                      src={
                        course.thumbnail ||
                        "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=600&auto=format&fit=crop"
                      }
                      alt={course.courseName}
                      className="h-36 w-full rounded-lg object-cover"
                    />
                    <div className="pt-3">
                      <p className="font-bold text-sm text-richblack-5 truncate">
                        {course.courseName}
                      </p>
                      <div className="flex items-center justify-between mt-2 text-xs text-richblack-300">
                        <span>{enrolledCount} students</span>
                        <span className="font-bold text-yellow-50">₹{course.price}</span>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-richblack-700 bg-richblack-800/40 p-12 text-center my-6">
          <div className="p-4 rounded-full bg-richblack-800 text-yellow-50 mb-4 border border-richblack-700">
            <FaBookOpen size={32} />
          </div>
          <h2 className="text-xl font-bold text-richblack-5">
            You have not created any courses yet
          </h2>
          <p className="text-sm text-richblack-400 mt-1 max-w-sm">
            Share your expertise with thousands of eager learners. Create and publish your first course now!
          </p>
          <Link
            to="/dashboard/add-course"
            className="mt-6 rounded-xl bg-yellow-50 px-6 py-2.5 text-sm font-bold text-richblack-900 hover:bg-yellow-100 transition-colors shadow-lg shadow-yellow-50/20"
          >
            Create a Course
          </Link>
        </div>
      )}
    </div>
  )
}