import React, { useEffect, useRef, useState } from "react"
import { AiOutlineDown } from "react-icons/ai"
import CourseSubSectionAccordion from "./CourseSubSectionAccordion"

export default function CourseAccordionBar({ course, isActive, handleActive }) {
  const contentEl = useRef(null)
  const [active, setActive] = useState(false)

  useEffect(() => {
    setActive(isActive?.includes(course._id))
  }, [isActive, course._id])

  const [sectionHeight, setSectionHeight] = useState(0)
  useEffect(() => {
    setSectionHeight(active ? contentEl.current?.scrollHeight || "auto" : 0)
  }, [active])

  return (
    <div className="mb-3 overflow-hidden rounded-xl border border-richblack-700 bg-richblack-800/90 text-richblack-5 transition-all">
      <div
        className={`flex cursor-pointer items-center justify-between px-6 py-4 transition-colors ${
          active ? "bg-richblack-700/60" : "hover:bg-richblack-750"
        }`}
        onClick={() => handleActive(course._id)}
      >
        <div className="flex items-center gap-3">
          <i
            className={`text-yellow-50 transition-transform duration-300 ${
              active ? "rotate-180" : "rotate-0"
            }`}
          >
            <AiOutlineDown size={14} />
          </i>
          <p className="font-semibold text-sm md:text-base text-richblack-5">{course?.sectionName}</p>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-yellow-50/10 text-yellow-50 border border-yellow-50/20">
            {`${course?.subSection?.length || 0} lecture(s)`}
          </span>
        </div>
      </div>

      <div
        ref={contentEl}
        className="overflow-hidden bg-richblack-900/60 transition-[height] duration-300 ease-in-out"
        style={{
          height: sectionHeight,
        }}
      >
        <div className="flex flex-col gap-1 px-4 py-3 border-t border-richblack-800">
          {course?.subSection?.map((subSec, i) => (
            <CourseSubSectionAccordion subSec={subSec} key={subSec?._id || i} />
          ))}
        </div>
      </div>
    </div>
  )
}
