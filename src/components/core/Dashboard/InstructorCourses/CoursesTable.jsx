import React, { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { FaCheck } from "react-icons/fa"
import { FiEdit2 } from "react-icons/fi"
import { HiClock } from "react-icons/hi"
import { RiDeleteBin6Line } from "react-icons/ri"
import { useNavigate } from "react-router-dom"

import { formatDate } from "../../../../services/formatDate"
import {
  deleteCourse,
  fetchInstructorCourses,
} from "../../../../services/operations/courseDetailsAPI"
import { COURSE_STATUS } from "../../../../utils/constants"
import ConfirmationModal from "../../../common/ConfirmationModal"

export default function CoursesTable({ courses, setCourses }) {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { token } = useSelector((state) => state.auth)
  const [loading, setLoading] = useState(false)
  const [confirmationModal, setConfirmationModal] = useState(null)
  const TRUNCATE_LENGTH = 28

  const handleCourseDelete = async (courseId) => {
    setLoading(true)
    await deleteCourse({ courseId }, token)
    const result = await fetchInstructorCourses(token)
    if (result) {
      setCourses(result)
    }
    setConfirmationModal(null)
    setLoading(false)
  }

  return (
    <>
      <div className="overflow-x-auto rounded-2xl border border-richblack-700 bg-richblack-800/80 shadow-xl shadow-black/20">
        <table className="w-full text-left text-sm text-richblack-200">
          <thead className="bg-richblack-750 text-xs uppercase tracking-wider text-richblack-300 border-b border-richblack-700">
            <tr>
              <th scope="col" className="px-6 py-4 font-semibold">
                Course Details
              </th>
              <th scope="col" className="px-6 py-4 font-semibold hidden md:table-cell">
                Duration
              </th>
              <th scope="col" className="px-6 py-4 font-semibold">
                Price
              </th>
              <th scope="col" className="px-6 py-4 font-semibold text-right">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-richblack-700/60">
            {!courses || courses.length === 0 ? (
              <tr>
                <td colSpan="4" className="py-12 text-center text-base text-richblack-400">
                  No courses created yet. Click "Add Course" above to publish your first course!
                </td>
              </tr>
            ) : (
              courses.map((course) => {
                const desc = course.courseDescription || ""
                const isTruncated = desc.split(" ").length > TRUNCATE_LENGTH
                const shortDesc = isTruncated
                  ? desc.split(" ").slice(0, TRUNCATE_LENGTH).join(" ") + "..."
                  : desc

                return (
                  <tr
                    key={course._id}
                    className="hover:bg-richblack-750/40 transition-colors"
                  >
                    {/* Course Info */}
                    <td className="px-6 py-5">
                      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                        <img
                          src={
                            course?.thumbnail ||
                            "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=600&auto=format&fit=crop"
                          }
                          alt={course?.courseName}
                          className="h-20 w-32 rounded-xl object-cover ring-1 ring-richblack-700 flex-shrink-0"
                        />
                        <div className="flex flex-col gap-1">
                          <p className="text-base font-bold text-richblack-5">
                            {course.courseName}
                          </p>
                          <p className="text-xs text-richblack-300 max-w-md line-clamp-2">
                            {shortDesc}
                          </p>
                          <div className="flex items-center gap-3 mt-1 text-[11px] text-richblack-400">
                            <span>Created: {formatDate(course.createdAt)}</span>
                            {course.status === COURSE_STATUS.DRAFT ? (
                              <span className="inline-flex items-center gap-1 rounded-full bg-pink-900/30 border border-pink-700/40 px-2 py-0.5 text-[10px] font-semibold text-pink-200">
                                <HiClock size={11} /> Draft
                              </span>
                            ) : (
                              <span className="inline-flex items-center gap-1 rounded-full bg-caribbeangreen-900/30 border border-caribbeangreen-700/40 px-2 py-0.5 text-[10px] font-semibold text-caribbeangreen-100">
                                <FaCheck size={9} /> Published
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </td>

                    {/* Duration */}
                    <td className="px-6 py-5 text-sm text-richblack-200 font-mono hidden md:table-cell">
                      {course.totalDuration || "2hr 30m"}
                    </td>

                    {/* Price */}
                    <td className="px-6 py-5 text-base font-bold text-yellow-50">
                      ₹{course.price}
                    </td>

                    {/* Actions */}
                    <td className="px-6 py-5 text-right whitespace-nowrap">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          disabled={loading}
                          onClick={() => {
                            navigate(`/dashboard/edit-course/${course._id}`)
                          }}
                          title="Edit Course"
                          className="p-2 rounded-lg bg-richblack-700 text-richblack-200 hover:text-caribbeangreen-100 hover:bg-richblack-600 transition-all cursor-pointer"
                        >
                          <FiEdit2 size={16} />
                        </button>
                        <button
                          disabled={loading}
                          onClick={() => {
                            setConfirmationModal({
                              text1: "Delete this course?",
                              text2:
                                "All associated sections, lectures, and progress data will be permanently deleted.",
                              btn1Text: !loading ? "Delete" : "Deleting...",
                              btn2Text: "Cancel",
                              btn1Handler: !loading
                                ? () => handleCourseDelete(course._id)
                                : () => {},
                              btn2Handler: !loading
                                ? () => setConfirmationModal(null)
                                : () => {},
                            })
                          }}
                          title="Delete Course"
                          className="p-2 rounded-lg bg-richblack-700 text-richblack-200 hover:text-pink-200 hover:bg-richblack-600 transition-all cursor-pointer"
                        >
                          <RiDeleteBin6Line size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                )
              })
            )}
          </tbody>
        </table>
      </div>
      {confirmationModal && <ConfirmationModal modalData={confirmationModal} />}
    </>
  )
}