import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Outlet, useParams } from "react-router-dom"

import CourseReviewModal from "../components/core/ViewCourse/CourseReviewModal"
import VideoDetailsSidebar from "../components/core/ViewCourse/VideoDetailsSidebar"
import { getFullDetailsOfCourse } from "../services/operations/courseDetailsAPI"
import {
  setCompletedLectures,
  setCourseSectionData,
  setEntireCourseData,
  setTotalNoOfLectures,
} from "../slices/viewCourseSlice"

export default function ViewCourse() {
  const { courseId } = useParams()
  const { token } = useSelector((state) => state.auth)
  const dispatch = useDispatch()
  const [reviewModal, setReviewModal] = useState(false)

  useEffect(() => {
    ;(async () => {
      try {
        const courseData = await getFullDetailsOfCourse(courseId, token)
        if (courseData?.courseDetails) {
          dispatch(setCourseSectionData(courseData.courseDetails.courseContent || []))
          dispatch(setEntireCourseData(courseData.courseDetails))
          dispatch(setCompletedLectures(courseData.completedVideos || []))
          let lectures = 0
          courseData.courseDetails.courseContent?.forEach((sec) => {
            lectures += sec.subSection?.length || 0
          })
          dispatch(setTotalNoOfLectures(lectures))
        }
      } catch (err) {
        console.error("Error loading course details:", err)
      }
    })()
  }, [courseId, token, dispatch])

  return (
    <>
      <div className="relative flex min-h-[calc(100vh-3.5rem)] bg-richblack-900">
        <VideoDetailsSidebar setReviewModal={setReviewModal} />
        <div className="h-[calc(100vh-3.5rem)] flex-1 overflow-auto">
          <div className="mx-4 md:mx-8">
            <Outlet />
          </div>
        </div>
      </div>
      {reviewModal && <CourseReviewModal setReviewModal={setReviewModal} />}
    </>
  )
}
