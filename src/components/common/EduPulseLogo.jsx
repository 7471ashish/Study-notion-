import React from "react"

export default function EduPulseLogo({ size = "md", showText = true, className = "" }) {
  const iconSizes = {
    sm: "w-6 h-6",
    md: "w-8 h-8",
    lg: "w-10 h-10",
  }

  const textSizes = {
    sm: "text-lg",
    md: "text-xl",
    lg: "text-2xl",
  }

  return (
    <div className={`inline-flex items-center gap-2.5 font-inter select-none ${className}`}>
      {/* Modern SaaS Geometric Pulse Logo Emblem */}
      <div className={`relative flex items-center justify-center rounded-xl bg-gradient-to-br from-yellow-400 via-amber-500 to-orange-500 p-0.5 shadow-lg shadow-yellow-500/20 ${iconSizes[size] || iconSizes.md}`}>
        <div className="w-full h-full rounded-[10px] bg-richblack-900 flex items-center justify-center p-1.5">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-full text-yellow-50"
          >
            {/* Minimalist Pulse Line & Academic Cap Silhouette */}
            <path
              d="M3 12H7L9 6L14 18L16 12H21"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <circle cx="14" cy="6" r="2" fill="#FFD60A" />
          </svg>
        </div>
      </div>

      {showText && (
        <span className={`font-black tracking-tight ${textSizes[size] || textSizes.md} text-richblack-5`}>
          Edu<span className="bg-gradient-to-r from-yellow-400 via-amber-300 to-yellow-100 bg-clip-text text-transparent">Pulse</span>
        </span>
      )}
    </div>
  )
}
