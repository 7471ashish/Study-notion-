import React, { useEffect, useState } from "react"
import {
  TiStarFullOutline,
  TiStarHalfOutline,
  TiStarOutline,
} from "react-icons/ti"

function RatingStars({ Review_Count = 0, Star_Size = 20 }) {
  const [starCount, SetStarCount] = useState({
    full: 0,
    half: 0,
    empty: 0,
  })

  useEffect(() => {
    const validCount = Math.max(0, Math.min(5, Number(Review_Count) || 0))
    const wholeStars = Math.floor(validCount)
    const hasHalf = validCount % 1 >= 0.25 && validCount % 1 < 0.75
    const roundUp = validCount % 1 >= 0.75 ? 1 : 0
    const finalFull = wholeStars + roundUp
    const finalHalf = hasHalf ? 1 : 0
    const finalEmpty = Math.max(0, 5 - finalFull - finalHalf)

    SetStarCount({
      full: finalFull,
      half: finalHalf,
      empty: finalEmpty,
    })
  }, [Review_Count])

  return (
    <div className="flex items-center gap-1 text-yellow-100">
      {[...new Array(starCount.full)].map((_, i) => (
        <TiStarFullOutline key={`full-${i}`} size={Star_Size} className="drop-shadow-[0_0_4px_rgba(255,214,10,0.4)]" />
      ))}
      {[...new Array(starCount.half)].map((_, i) => (
        <TiStarHalfOutline key={`half-${i}`} size={Star_Size} />
      ))}
      {[...new Array(starCount.empty)].map((_, i) => (
        <TiStarOutline key={`empty-${i}`} size={Star_Size} className="text-richblack-500" />
      ))}
    </div>
  )
}

export default RatingStars
