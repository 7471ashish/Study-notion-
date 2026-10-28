import React, { useEffect, useState } from "react"
import { BiInfoCircle } from "react-icons/bi"
import { HiOutlineGlobeAlt } from "react-icons/hi"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate, useParams } from "react-router-dom"

import ConfirmationModal from "../components/common/ConfirmationModal"
import Footer from "../components/common/Footer"
import RatingStars from "../components/common/RatingStars"
import CourseAccordionBar from "../components/core/Course/CourseAccordionBar"
import CourseDetailsCard from "../components/core/Course/CourseDetailsCard"
import { formatDate } from "../services/formatDate"
import { fetchCourseDetails } from "../services/operations/courseDetailsAPI"
import { buyCourse } from "../services/operations/studentFeaturesAPI"
import GetAvgRating from "../utils/avgRating"
import Error from "./Error"
import { BsCheckCircleFill } from "react-icons/bs"

function CourseDetails() {
  const { user } = useSelector((state) => state.profile)
  const { token } = useSelector((state) => state.auth)
  const { loading } = useSelector((state) => state.profile)
  const { paymentLoading } = useSelector((state) => state.course)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { courseId } = useParams()

  const [response, setResponse] = useState(null)
  const [confirmationModal, setConfirmationModal] = useState(null)
  const [isActive, setIsActive] = useState([])

  useEffect(() => {
    ;(async () => {
      try {
        const res = await fetchCourseDetails(courseId)
        setResponse(res)
      } catch (error) {
        console.error("Could not fetch Course Details:", error)
      }
    })()
  }, [courseId])

  const [avgReviewCount, setAvgReviewCount] = useState(0)
  useEffect(() => {
    const count = GetAvgRating(response?.data?.courseDetails?.ratingAndReviews)
    setAvgReviewCount(count)
  }, [response])

  const handleActive = (id) => {
    setIsActive(
      !isActive.includes(id)
        ? isActive.concat([id])
        : isActive.filter((e) => e !== id)
    )
  }

  const [totalNoOfLectures, setTotalNoOfLectures] = useState(0)
  useEffect(() => {
    let lectures = 0
    response?.data?.courseDetails?.courseContent?.forEach((sec) => {
      lectures += sec.subSection?.length || 0
    })
    setTotalNoOfLectures(lectures)
  }, [response])

  if (loading || !response) {
    return (
      <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
        <div className="spinner"></div>
      </div>
    )
  }

  if (!response?.success || !response?.data?.courseDetails) {
    return <Error />
  }

  const {
    _id: course_id,
    courseName,
    courseDescription,
    thumbnail,
    price,
    whatYouWillLearn,
    courseContent = [],
    ratingAndReviews = [],
    instructor = {},
    studentsEnrolled = [],
    createdAt,
  } = response.data.courseDetails

  const handleBuyCourse = () => {
    if (token) {
      buyCourse(token, [courseId], user, navigate, dispatch)
      return
    }
    setConfirmationModal({
      text1: "You are not logged in!",
      text2: "Please login to purchase this course.",
      btn1Text: "Login",
      btn2Text: "Cancel",
      btn1Handler: () => navigate("/login"),
      btn2Handler: () => setConfirmationModal(null),
    })
  }

  if (paymentLoading) {
    return (
      <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
        <div className="spinner"></div>
      </div>
    )
  }

  // Parse whatYouWillLearn lines
  const learningPoints = (whatYouWillLearn || "")
    .split("\n")
    .map((s) => s.replace(/^[-*•]\s*/, "").trim())
    .filter(Boolean)

  return (
    <div className="min-h-screen bg-richblack-900 text-richblack-5">
      {/* Top Hero Section */}
      <div className="relative bg-gradient-to-b from-richblack-800 via-richblack-850 to-richblack-900 border-b border-richblack-800">
        <div className="mx-auto w-11/12 max-w-maxContent py-10 lg:py-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Content */}
            <div className="lg:col-span-8 flex flex-col gap-4">
              <span className="text-xs uppercase tracking-wider font-semibold text-yellow-50 bg-yellow-50/10 px-3 py-1 rounded-full w-fit border border-yellow-50/20">
                Course Overview
              </span>
              <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-richblack-5">
                {courseName}
              </h1>
              <p className="text-base md:text-lg text-richblack-200 leading-relaxed">
                {courseDescription}
              </p>

              <div className="flex flex-wrap items-center gap-3 text-sm pt-2">
                <span className="text-yellow-50 font-bold">{avgReviewCount || 0}</span>
                <RatingStars Review_Count={avgReviewCount} Star_Size={18} />
                <span className="text-richblack-400">({ratingAndReviews.length} reviews)</span>
                <span className="text-richblack-500">•</span>
                <span className="text-richblack-300 font-medium">
                  {studentsEnrolled.length} student{studentsEnrolled.length === 1 ? "" : "s"} enrolled
                </span>
              </div>

              <div className="text-sm text-richblack-300">
                Created by{" "}
                <span className="text-yellow-50 font-semibold underline underline-offset-4">
                  {instructor?.firstName} {instructor?.lastName}
                </span>
              </div>

              <div className="flex flex-wrap items-center gap-6 text-xs md:text-sm text-richblack-300 pt-2">
                <div className="flex items-center gap-1.5">
                  <BiInfoCircle className="text-yellow-50" />
                  <span>Created {formatDate(createdAt)}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <HiOutlineGlobeAlt className="text-yellow-50" />
                  <span>English</span>
                </div>
              </div>

              {/* Mobile Buy Card */}
              <div className="lg:hidden mt-4 pt-4 border-t border-richblack-700 flex flex-col gap-3">
                <div className="text-3xl font-extrabold text-richblack-5">
                  ₹{price}
                </div>
                <button
                  onClick={handleBuyCourse}
                  className="w-full py-3 rounded-xl bg-yellow-50 font-bold text-richblack-900 shadow-lg shadow-yellow-50/20"
                >
                  Buy Now
                </button>
              </div>
            </div>

            {/* Desktop Sticky Course Card */}
            <div className="hidden lg:block lg:col-span-4 sticky top-6">
              <CourseDetailsCard
                course={response?.data?.courseDetails}
                setConfirmationModal={setConfirmationModal}
                handleBuyCourse={handleBuyCourse}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Main Body */}
      <div className="mx-auto w-11/12 max-w-maxContent py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-8 flex flex-col gap-10">
            {/* What you'll learn */}
            {learningPoints.length > 0 && (
              <div className="rounded-2xl border border-richblack-700 bg-richblack-800/60 p-6 md:p-8 backdrop-blur-sm">
                <h2 className="text-2xl font-bold text-richblack-5 mb-5 flex items-center gap-2">
                  What you&apos;ll learn
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  {learningPoints.map((point, index) => (
                    <div key={index} className="flex items-start gap-2.5 text-sm text-richblack-100">
                      <BsCheckCircleFill className="text-caribbeangreen-100 mt-1 flex-shrink-0" size={14} />
                      <span className="leading-snug">{point}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Course Content Accordion */}
            <div className="flex flex-col gap-4">
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-richblack-800 pb-3">
                <div>
                  <h2 className="text-2xl font-bold text-richblack-5">Course Content</h2>
                  <p className="text-xs md:text-sm text-richblack-400 mt-1">
                    {courseContent.length} section{courseContent.length === 1 ? "" : "s"} • {totalNoOfLectures} lecture{totalNoOfLectures === 1 ? "" : "s"}
                    {response.data?.totalDuration ? ` • ${response.data.totalDuration} total length` : ""}
                  </p>
                </div>
                <button
                  className="text-xs md:text-sm font-semibold text-yellow-50 hover:underline cursor-pointer"
                  onClick={() => setIsActive([])}
                >
                  Collapse all sections
                </button>
              </div>

              <div className="mt-2">
                {courseContent.map((section, index) => (
                  <CourseAccordionBar
                    course={section}
                    key={section?._id || index}
                    isActive={isActive}
                    handleActive={handleActive}
                  />
                ))}
              </div>
            </div>

            {/* Author Profile */}
            <div className="rounded-2xl border border-richblack-700 bg-richblack-800/60 p-6 md:p-8 backdrop-blur-sm">
              <h2 className="text-xl font-bold text-richblack-5 mb-4">Instructor</h2>
              <div className="flex items-center gap-4">
                <img
                  src={
                    instructor?.image ||
                    `https://api.dicebear.com/5.x/initials/svg?seed=${instructor?.firstName || "Instructor"} ${instructor?.lastName || ""}`
                  }
                  alt="Instructor"
                  className="h-16 w-16 rounded-full object-cover ring-2 ring-yellow-50/20"
                />
                <div>
                  <h3 className="text-lg font-bold text-richblack-5">
                    {instructor?.firstName} {instructor?.lastName}
                  </h3>
                  <p className="text-xs text-yellow-50 font-medium">Instructor</p>
                </div>
              </div>
              {instructor?.additionalDetails?.about && (
                <p className="text-sm text-richblack-300 mt-4 leading-relaxed">
                  {instructor.additionalDetails.about}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      <Footer />
      {confirmationModal && <ConfirmationModal modalData={confirmationModal} />}
    </div>
  )
}

export default CourseDetails
