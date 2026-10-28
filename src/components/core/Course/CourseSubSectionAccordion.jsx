import React from "react"
import { HiOutlineVideoCamera } from "react-icons/hi"

function CourseSubSectionAccordion({ subSec }) {
  return (
    <div className="flex items-center justify-between py-2.5 px-3 rounded-lg hover:bg-richblack-800/80 transition-colors">
      <div className="flex items-center gap-3">
        <span className="p-1.5 rounded-md bg-richblack-800 text-yellow-50">
          <HiOutlineVideoCamera size={16} />
        </span>
        <p className="text-sm font-medium text-richblack-50">{subSec?.title}</p>
      </div>
      {subSec?.timeDuration && (
        <span className="text-xs text-richblack-400 font-mono">
          {subSec?.timeDuration}
        </span>
      )}
    </div>
  )
}

export default CourseSubSectionAccordion
