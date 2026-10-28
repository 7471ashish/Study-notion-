import React, { useState } from "react"

const modernPalette = [
  "#FFD60A", // yellow
  "#06D6A0", // caribbeangreen
  "#118AB2", // blue
  "#EF476F", // pink
  "#FF9F1C", // orange
  "#9D4EDD", // purple
  "#4CC9F0", // sky
  "#70E000", // lime
]

export default function InstructorChart({ courses = [] }) {
  const [currChart, setCurrChart] = useState("students")
  const [hoveredIndex, setHoveredIndex] = useState(null)

  const isStudent = currChart === "students"

  const dataList = courses.map((course, idx) => {
    const val = isStudent
      ? Number(course.totalStudentsEnrolled || 0)
      : Number(course.totalAmountGenerated || 0)
    return {
      name: course.courseName,
      value: val,
      color: modernPalette[idx % modernPalette.length],
    }
  })

  const totalValue = dataList.reduce((acc, curr) => acc + curr.value, 0)

  // Calculate SVG donut segments
  let cumulativeAngle = 0
  const radius = 70
  const strokeWidth = 24
  const circumference = 2 * Math.PI * radius

  return (
    <div className="flex flex-1 flex-col gap-6 rounded-2xl border border-richblack-700 bg-richblack-800/80 p-6 backdrop-blur-md shadow-xl shadow-black/20">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-lg font-bold text-richblack-5">Performance Analytics</h2>
          <p className="text-xs text-richblack-400 mt-0.5">
            Breakdown across your published courses
          </p>
        </div>

        <div className="flex rounded-xl bg-richblack-900/80 p-1 border border-richblack-700">
          <button
            onClick={() => setCurrChart("students")}
            className={`rounded-lg px-3.5 py-1.5 text-xs font-semibold transition-all cursor-pointer ${
              isStudent
                ? "bg-yellow-50 text-richblack-900 shadow-md shadow-yellow-50/20"
                : "text-richblack-300 hover:text-richblack-5"
            }`}
          >
            Students
          </button>
          <button
            onClick={() => setCurrChart("income")}
            className={`rounded-lg px-3.5 py-1.5 text-xs font-semibold transition-all cursor-pointer ${
              !isStudent
                ? "bg-yellow-50 text-richblack-900 shadow-md shadow-yellow-50/20"
                : "text-richblack-300 hover:text-richblack-5"
            }`}
          >
            Income
          </button>
        </div>
      </div>

      <div className="flex flex-col md:flex-row items-center justify-around gap-8 py-2">
        {/* SVG Donut */}
        <div className="relative w-52 h-52 flex-shrink-0 flex items-center justify-center">
          <svg className="w-full h-full -rotate-90" viewBox="0 0 200 200">
            {totalValue === 0 ? (
              <circle
                cx="100"
                cy="100"
                r={radius}
                fill="none"
                stroke="#2C333F"
                strokeWidth={strokeWidth}
              />
            ) : (
              dataList.map((item, idx) => {
                if (item.value === 0) return null
                const fraction = item.value / totalValue
                const strokeDasharray = `${fraction * circumference} ${circumference}`
                const strokeDashoffset = -cumulativeAngle * (circumference / 360)
                cumulativeAngle += fraction * 360

                return (
                  <circle
                    key={idx}
                    cx="100"
                    cy="100"
                    r={radius}
                    fill="none"
                    stroke={item.color}
                    strokeWidth={hoveredIndex === idx ? strokeWidth + 4 : strokeWidth}
                    strokeDasharray={strokeDasharray}
                    strokeDashoffset={strokeDashoffset}
                    className="transition-all duration-300 cursor-pointer"
                    onMouseEnter={() => setHoveredIndex(idx)}
                    onMouseLeave={() => setHoveredIndex(null)}
                  />
                )
              })
            )}
          </svg>

          {/* Donut Center Display */}
          <div className="absolute flex flex-col items-center justify-center text-center pointer-events-none">
            <span className="text-[11px] uppercase tracking-wider text-richblack-400 font-semibold">
              {isStudent ? "Total Students" : "Total Revenue"}
            </span>
            <span className="text-xl font-extrabold text-richblack-5 mt-0.5">
              {isStudent ? totalValue : `₹${totalValue}`}
            </span>
          </div>
        </div>

        {/* Legend Breakdown */}
        <div className="flex flex-col gap-3 w-full max-w-sm">
          {dataList.map((item, idx) => {
            const percentage = totalValue
              ? Math.round((item.value / totalValue) * 100)
              : 0
            const isHovered = hoveredIndex === idx

            return (
              <div
                key={idx}
                onMouseEnter={() => setHoveredIndex(idx)}
                onMouseLeave={() => setHoveredIndex(null)}
                className={`flex items-center justify-between p-2.5 rounded-xl border transition-all cursor-pointer ${
                  isHovered
                    ? "bg-richblack-700/60 border-richblack-500 scale-[1.02]"
                    : "bg-richblack-900/40 border-richblack-750"
                }`}
              >
                <div className="flex items-center gap-2.5 truncate max-w-[200px]">
                  <span
                    className="w-3 h-3 rounded-full flex-shrink-0 shadow-sm"
                    style={{ backgroundColor: item.color }}
                  />
                  <span className="text-xs font-medium text-richblack-100 truncate">
                    {item.name}
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-xs font-bold text-richblack-5">
                    {isStudent ? item.value : `₹${item.value}`}
                  </span>
                  <span className="text-[11px] text-richblack-400 font-mono w-10 text-right">
                    {percentage}%
                  </span>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}