import React, { useEffect, useState } from "react"
import { BsChevronDown } from "react-icons/bs"
import { IoIosArrowBack } from "react-icons/io"
import { useSelector } from "react-redux"
import { useLocation, useNavigate, useParams } from "react-router-dom"
import IconBtn from "../../common/IconBtn"
import { FaCheckCircle, FaPlayCircle } from "react-icons/fa"

export default function VideoDetailsSidebar({ setReviewModal }) {
  const [activeStatus, setActiveStatus] = useState("")
  const [videoBarActive, setVideoBarActive] = useState("")
  const navigate = useNavigate()
  const location = useLocation()
  const { sectionId, subSectionId } = useParams()
  const {
    courseSectionData = [],
    courseEntireData = {},
    totalNoOfLectures = 0,
    completedLectures = [],
  } = useSelector((state) => state.viewCourse)

  useEffect(() => {
    if (!courseSectionData.length) return
    const currentSectionIndx = courseSectionData.findIndex(
      (data) => data._id === sectionId
    )
    if (currentSectionIndx !== -1) {
      const currentSubSectionIndx = courseSectionData[
        currentSectionIndx
      ]?.subSection?.findIndex((data) => data._id === subSectionId)
      const activeSubSectionId =
        courseSectionData[currentSectionIndx]?.subSection?.[
          currentSubSectionIndx
        ]?._id
      setActiveStatus(courseSectionData[currentSectionIndx]?._id)
      setVideoBarActive(activeSubSectionId)
    }
  }, [courseSectionData, sectionId, subSectionId, location.pathname])

  const completionPercentage = totalNoOfLectures
    ? Math.round((completedLectures.length / totalNoOfLectures) * 100)
    : 0

  return (
    <div className="flex h-[calc(100vh-3.5rem)] w-[320px] max-w-[360px] flex-shrink-0 flex-col border-r border-richblack-700 bg-richblack-850 select-none">
      {/* Header */}
      <div className="flex flex-col gap-3 border-b border-richblack-700 p-5">
        <div className="flex w-full items-center justify-between">
          <button
            onClick={() => navigate("/dashboard/enrolled-courses")}
            className="flex h-9 w-9 items-center justify-center rounded-full bg-richblack-700 text-richblack-200 hover:text-richblack-5 hover:bg-richblack-600 transition-all active:scale-95 cursor-pointer"
            title="Back to Enrolled Courses"
          >
            <IoIosArrowBack size={20} />
          </button>
          <IconBtn
            text="Add Review"
            customClasses="text-xs py-2 px-3.5"
            onclick={() => setReviewModal(true)}
          />
        </div>

        <div>
          <h2 className="font-bold text-sm text-richblack-5 line-clamp-2">
            {courseEntireData?.courseName || "Course Curriculum"}
          </h2>
          <div className="flex items-center justify-between text-xs text-richblack-400 mt-2">
            <span>
              {completedLectures.length} of {totalNoOfLectures} lectures ({completionPercentage}%)
            </span>
          </div>
          {/* Progress bar */}
          <div className="w-full bg-richblack-700 h-1.5 rounded-full mt-1.5 overflow-hidden">
            <div
              className="bg-yellow-50 h-full rounded-full transition-all duration-300"
              style={{ width: `${completionPercentage}%` }}
            />
          </div>
        </div>
      </div>

      {/* Curriculum Sections List */}
      <div className="flex-1 overflow-y-auto divide-y divide-richblack-750">
        {courseSectionData.map((section, index) => {
          const isSectionOpen = activeStatus === section?._id
          return (
            <div key={section?._id || index} className="text-sm text-richblack-5">
              {/* Section Header */}
              <div
                className={`flex cursor-pointer items-center justify-between px-5 py-3.5 transition-colors ${
                  isSectionOpen ? "bg-richblack-750 font-semibold text-yellow-50" : "bg-richblack-800/80 hover:bg-richblack-750/60"
                }`}
                onClick={() =>
                  setActiveStatus(isSectionOpen ? "" : section?._id)
                }
              >
                <div className="w-[75%] font-medium text-xs md:text-sm truncate">
                  {section?.sectionName}
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[11px] text-richblack-400">
                    {section?.subSection?.length || 0}
                  </span>
                  <BsChevronDown
                    size={12}
                    className={`transition-transform duration-300 ${
                      isSectionOpen ? "rotate-180 text-yellow-50" : "text-richblack-400"
                    }`}
                  />
                </div>
              </div>

              {/* Sub-sections / Lectures */}
              {isSectionOpen && (
                <div className="bg-richblack-900/60 py-1">
                  {section?.subSection?.map((topic) => {
                    const isCurrent = videoBarActive === topic._id
                    const isCompleted = completedLectures.includes(topic?._id)
                    return (
                      <div
                        key={topic._id}
                        onClick={() => {
                          navigate(
                            `/view-course/${courseEntireData?._id}/section/${section?._id}/sub-section/${topic?._id}`
                          )
                          setVideoBarActive(topic._id)
                        }}
                        className={`flex items-center gap-3 px-5 py-2.5 text-xs transition-colors cursor-pointer ${
                          isCurrent
                            ? "bg-yellow-50/15 text-yellow-50 font-semibold border-l-4 border-yellow-50"
                            : "text-richblack-200 hover:bg-richblack-800/80 hover:text-richblack-5"
                        }`}
                      >
                        {isCompleted ? (
                          <FaCheckCircle className="text-caribbeangreen-100 flex-shrink-0" size={13} />
                        ) : (
                          <FaPlayCircle className="text-richblack-400 flex-shrink-0" size={13} />
                        )}
                        <span className="truncate flex-1">{topic.title}</span>
                        {topic.timeDuration && (
                          <span className="text-[10px] text-richblack-400 font-mono">
                            {topic.timeDuration}
                          </span>
                        )}
                      </div>
                    )
                  })}
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
