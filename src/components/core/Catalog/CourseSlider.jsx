import React, { useRef } from "react"
import Course_Card from "./Course_Card"
import { FaChevronLeft, FaChevronRight } from "react-icons/fa"

const CourseSlider = ({ Courses }) => {
  const sliderRef = useRef(null)

  const scroll = (direction) => {
    if (sliderRef.current) {
      const { scrollLeft, clientWidth } = sliderRef.current
      const scrollAmount = clientWidth * 0.75
      sliderRef.current.scrollTo({
        left: direction === "left" ? scrollLeft - scrollAmount : scrollLeft + scrollAmount,
        behavior: "smooth",
      })
    }
  }

  return (
    <div className="relative py-2">
      {Courses?.length > 0 ? (
        <div>
          {Courses.length > 3 && (
            <div className="hidden sm:flex absolute -top-12 right-0 gap-2 z-10">
              <button
                onClick={() => scroll("left")}
                aria-label="Previous courses"
                className="p-2 rounded-full bg-richblack-800 border border-richblack-700 hover:border-yellow-50 text-richblack-300 hover:text-yellow-50 transition-all active:scale-95"
              >
                <FaChevronLeft size={13} />
              </button>
              <button
                onClick={() => scroll("right")}
                aria-label="Next courses"
                className="p-2 rounded-full bg-richblack-800 border border-richblack-700 hover:border-yellow-50 text-richblack-300 hover:text-yellow-50 transition-all active:scale-95"
              >
                <FaChevronRight size={13} />
              </button>
            </div>
          )}

          <div
            ref={sliderRef}
            className="flex gap-6 overflow-x-auto pb-4 no-scrollbar scroll-smooth snap-x snap-mandatory"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {Courses.map((course, i) => (
              <div
                key={course._id || i}
                className="min-w-[280px] sm:min-w-[320px] max-w-[340px] flex-shrink-0 snap-start"
              >
                <Course_Card course={course} Height={"h-[190px]"} />
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="rounded-xl border border-dashed border-richblack-700 p-8 text-center bg-richblack-800/40">
          <p className="text-base text-richblack-300">
            No courses found in this category yet. Check back soon!
          </p>
        </div>
      )}
    </div>
  )
}

export default CourseSlider
