import React, { useEffect, useRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate, useParams, useLocation } from "react-router-dom"
import { markLectureAsComplete } from "../../../services/operations/courseDetailsAPI"
import { updateCompletedLectures } from "../../../slices/viewCourseSlice"
import IconBtn from "../../common/IconBtn"
import { FaPlay, FaPause, FaRedo, FaChevronLeft, FaChevronRight, FaCheck } from "react-icons/fa"

const VideoDetails = () => {
  const { courseId, sectionId, subSectionId } = useParams()
  const navigate = useNavigate()
  const location = useLocation()
  const videoRef = useRef(null)
  const dispatch = useDispatch()
  const { token } = useSelector((state) => state.auth)
  const { courseSectionData = [], courseEntireData = {}, completedLectures = [] } =
    useSelector((state) => state.viewCourse)

  const [videoData, setVideoData] = useState(null)
  const [videoEnded, setVideoEnded] = useState(false)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!courseSectionData.length) return
    if (!courseId || !sectionId || !subSectionId) {
      navigate(`/dashboard/enrolled-courses`)
    } else {
      const filteredSection = courseSectionData.find(
        (course) => course._id === sectionId
      )
      const currentLecture = filteredSection?.subSection?.find(
        (data) => data._id === subSectionId
      )
      setVideoData(currentLecture || null)
      setVideoEnded(false)
    }
  }, [courseSectionData, courseEntireData, location.pathname, courseId, sectionId, subSectionId, navigate])

  const isFirstVideo = () => {
    const currentSectionIndx = courseSectionData.findIndex(
      (data) => data._id === sectionId
    )
    if (currentSectionIndx === -1) return true
    const currentSubSectionIndx = courseSectionData[
      currentSectionIndx
    ]?.subSection?.findIndex((data) => data._id === subSectionId)
    return currentSectionIndx === 0 && currentSubSectionIndx === 0
  }

  const isLastVideo = () => {
    const currentSectionIndx = courseSectionData.findIndex(
      (data) => data._id === sectionId
    )
    if (currentSectionIndx === -1) return true
    const noOfSubsections =
      courseSectionData[currentSectionIndx]?.subSection?.length || 0
    const currentSubSectionIndx = courseSectionData[
      currentSectionIndx
    ]?.subSection?.findIndex((data) => data._id === subSectionId)

    return (
      currentSectionIndx === courseSectionData.length - 1 &&
      currentSubSectionIndx === noOfSubsections - 1
    )
  }

  const goToNextVideo = () => {
    const currentSectionIndx = courseSectionData.findIndex(
      (data) => data._id === sectionId
    )
    const currentSubSectionIndx = courseSectionData[
      currentSectionIndx
    ]?.subSection?.findIndex((data) => data._id === subSectionId)
    const noOfSubsections =
      courseSectionData[currentSectionIndx]?.subSection?.length || 0

    if (currentSubSectionIndx !== noOfSubsections - 1) {
      const nextSubSectionId =
        courseSectionData[currentSectionIndx].subSection[
          currentSubSectionIndx + 1
        ]._id
      navigate(
        `/view-course/${courseId}/section/${sectionId}/sub-section/${nextSubSectionId}`
      )
    } else if (currentSectionIndx < courseSectionData.length - 1) {
      const nextSectionId = courseSectionData[currentSectionIndx + 1]._id
      const nextSubSectionId =
        courseSectionData[currentSectionIndx + 1].subSection[0]._id
      navigate(
        `/view-course/${courseId}/section/${nextSectionId}/sub-section/${nextSubSectionId}`
      )
    }
  }

  const goToPrevVideo = () => {
    const currentSectionIndx = courseSectionData.findIndex(
      (data) => data._id === sectionId
    )
    const currentSubSectionIndx = courseSectionData[
      currentSectionIndx
    ]?.subSection?.findIndex((data) => data._id === subSectionId)

    if (currentSubSectionIndx !== 0) {
      const prevSubSectionId =
        courseSectionData[currentSectionIndx].subSection[
          currentSubSectionIndx - 1
        ]._id
      navigate(
        `/view-course/${courseId}/section/${sectionId}/sub-section/${prevSubSectionId}`
      )
    } else if (currentSectionIndx > 0) {
      const prevSectionId = courseSectionData[currentSectionIndx - 1]._id
      const prevSubSectionLength =
        courseSectionData[currentSectionIndx - 1].subSection.length
      const prevSubSectionId =
        courseSectionData[currentSectionIndx - 1].subSection[
          prevSubSectionLength - 1
        ]._id
      navigate(
        `/view-course/${courseId}/section/${prevSectionId}/sub-section/${prevSubSectionId}`
      )
    }
  }

  const handleLectureCompletion = async () => {
    setLoading(true)
    const res = await markLectureAsComplete(
      { courseId, subsectionId: subSectionId },
      token
    )
    if (res) {
      dispatch(updateCompletedLectures(subSectionId))
    }
    setLoading(false)
  }

  const isCompleted = completedLectures.includes(subSectionId)

  return (
    <div className="flex flex-col gap-6 py-6 max-w-[1000px] mx-auto text-richblack-5">
      {/* Video Player Box */}
      <div className="relative aspect-video w-full rounded-2xl overflow-hidden bg-richblack-900 border border-richblack-700 shadow-2xl">
        {videoData?.videoUrl ? (
          <>
            <video
              ref={videoRef}
              src={videoData.videoUrl}
              controls
              playsInline
              onEnded={() => setVideoEnded(true)}
              className="w-full h-full object-contain"
            />
            {/* Overlay when video ends */}
            {videoEnded && (
              <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-richblack-900/90 backdrop-blur-md p-6 text-center animate-fadeIn">
                <p className="text-xl md:text-2xl font-bold text-richblack-5 mb-2">
                  Lecture Completed!
                </p>
                <p className="text-sm text-richblack-300 max-w-md mb-6">
                  Great job keeping up the learning momentum.
                </p>

                <div className="flex flex-wrap items-center justify-center gap-3">
                  {!isCompleted && (
                    <IconBtn
                      disabled={loading}
                      onclick={handleLectureCompletion}
                      text={loading ? "Saving..." : "Mark As Completed"}
                      customClasses="py-2.5 px-5"
                    />
                  )}
                  <button
                    onClick={() => {
                      if (videoRef.current) {
                        videoRef.current.currentTime = 0
                        videoRef.current.play()
                        setVideoEnded(false)
                      }
                    }}
                    className="flex items-center gap-2 rounded-xl bg-richblack-700 px-5 py-2.5 text-sm font-semibold text-richblack-5 hover:bg-richblack-600 transition-colors cursor-pointer"
                  >
                    <FaRedo size={12} /> Rewatch
                  </button>
                  {!isLastVideo() && (
                    <button
                      onClick={goToNextVideo}
                      className="flex items-center gap-2 rounded-xl bg-yellow-50 px-5 py-2.5 text-sm font-bold text-richblack-900 hover:bg-yellow-100 transition-colors cursor-pointer"
                    >
                      Next Lecture <FaChevronRight size={12} />
                    </button>
                  )}
                </div>
              </div>
            )}
          </>
        ) : (
          <div className="flex flex-col items-center justify-center h-full gap-3 p-6 text-center">
            <img
              src={courseEntireData?.thumbnail || "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=600&auto=format&fit=crop"}
              alt="Thumbnail"
              className="max-h-60 rounded-xl object-cover opacity-60"
            />
            <p className="text-richblack-300 text-sm">
              Select a lecture from the curriculum sidebar to begin watching.
            </p>
          </div>
        )}
      </div>

      {/* Navigation Controls Under Video */}
      <div className="flex items-center justify-between border-b border-richblack-800 pb-5">
        <button
          disabled={isFirstVideo()}
          onClick={goToPrevVideo}
          className="flex items-center gap-2 rounded-xl bg-richblack-800 border border-richblack-700 px-4 py-2 text-xs md:text-sm font-semibold text-richblack-200 hover:text-richblack-5 hover:border-richblack-500 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
        >
          <FaChevronLeft size={11} /> Previous
        </button>

        <div className="flex items-center gap-3">
          {!isCompleted ? (
            <button
              onClick={handleLectureCompletion}
              disabled={loading}
              className="flex items-center gap-2 rounded-xl bg-richblack-800 border border-yellow-50/50 px-4 py-2 text-xs md:text-sm font-semibold text-yellow-50 hover:bg-yellow-50/10 transition-all cursor-pointer"
            >
              <FaCheck size={11} /> Mark Complete
            </button>
          ) : (
            <span className="flex items-center gap-1.5 text-xs md:text-sm font-semibold text-caribbeangreen-100 bg-caribbeangreen-900/40 px-3 py-1 rounded-full border border-caribbeangreen-200/20">
              <FaCheck size={11} /> Completed
            </span>
          )}
        </div>

        <button
          disabled={isLastVideo()}
          onClick={goToNextVideo}
          className="flex items-center gap-2 rounded-xl bg-richblack-800 border border-richblack-700 px-4 py-2 text-xs md:text-sm font-semibold text-richblack-200 hover:text-richblack-5 hover:border-richblack-500 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
        >
          Next <FaChevronRight size={11} />
        </button>
      </div>

      {/* Lecture Title & Description */}
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl md:text-3xl font-extrabold text-richblack-5 tracking-tight">
          {videoData?.title || "Course Lecture"}
        </h1>
        <p className="text-sm md:text-base text-richblack-300 leading-relaxed pt-1">
          {videoData?.description || "No lecture description provided."}
        </p>
      </div>
    </div>
  )
}

export default VideoDetails
