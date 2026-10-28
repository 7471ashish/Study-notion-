import React, { useEffect, useState, useRef } from "react"
import { apiConnector } from "../../services/apiconnector"
import { ratingsEndpoints } from "../../services/apis"
import RatingStars from "./RatingStars"
import { FaChevronLeft, FaChevronRight, FaQuoteLeft } from "react-icons/fa"

const sampleReviews = [
  {
    user: {
      firstName: "Aarav",
      lastName: "Sharma",
      image: "https://api.dicebear.com/5.x/initials/svg?seed=Aarav%20Sharma",
    },
    course: { courseName: "Full Stack Web Development" },
    review: "The curriculum is structured exceptionally well. Learned MERN stack from absolute scratch to deployment with real confidence!",
    rating: 5,
  },
  {
    user: {
      firstName: "Sneha",
      lastName: "Patel",
      image: "https://api.dicebear.com/5.x/initials/svg?seed=Sneha%20Patel",
    },
    course: { courseName: "Data Structures & Algorithms" },
    review: "Crystal-clear explanations, top-tier problem solving sessions and great code walkthroughs. Landed my dream internship!",
    rating: 4.8,
  },
  {
    user: {
      firstName: "Rohan",
      lastName: "Verma",
      image: "https://api.dicebear.com/5.x/initials/svg?seed=Rohan%20Verma",
    },
    course: { courseName: "DevOps & Cloud Engineering" },
    review: "Hands-on projects with Docker and Kubernetes made all the difference. The instructor support is second to none.",
    rating: 5,
  },
  {
    user: {
      firstName: "Priya",
      lastName: "Nair",
      image: "https://api.dicebear.com/5.x/initials/svg?seed=Priya%20Nair",
    },
    course: { courseName: "System Design Masterclass" },
    review: "Extremely insightful content covering high availability, caching, and distributed databases. Must-have for any engineer.",
    rating: 4.9,
  },
]

function ReviewSlider() {
  const [reviews, setReviews] = useState([])
  const scrollContainerRef = useRef(null)

  useEffect(() => {
    ;(async () => {
      try {
        const { data } = await apiConnector(
          "GET",
          ratingsEndpoints.REVIEWS_DETAILS_API
        )
        if (data?.success && data?.data && data.data.length > 0) {
          setReviews(data.data)
        } else {
          setReviews(sampleReviews)
        }
      } catch (err) {
        setReviews(sampleReviews)
      }
    })()
  }, [])

  const scroll = (direction) => {
    if (scrollContainerRef.current) {
      const { scrollLeft, clientWidth } = scrollContainerRef.current
      const scrollAmount = clientWidth * 0.75
      scrollContainerRef.current.scrollTo({
        left: direction === "left" ? scrollLeft - scrollAmount : scrollLeft + scrollAmount,
        behavior: "smooth",
      })
    }
  }

  const displayList = reviews.length > 0 ? reviews : sampleReviews

  return (
    <div className="w-full text-white py-8 relative">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-richblack-5 via-richblack-50 to-richblack-300 bg-clip-text text-transparent">
            Reviews from other learners
          </h2>
          <p className="text-sm text-richblack-400 mt-1">See what students say about their learning experience</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => scroll("left")}
            aria-label="Previous reviews"
            className="p-2.5 rounded-full bg-richblack-800 border border-richblack-700 hover:border-yellow-50 text-richblack-200 hover:text-yellow-50 transition-all shadow-md active:scale-95"
          >
            <FaChevronLeft size={14} />
          </button>
          <button
            onClick={() => scroll("right")}
            aria-label="Next reviews"
            className="p-2.5 rounded-full bg-richblack-800 border border-richblack-700 hover:border-yellow-50 text-richblack-200 hover:text-yellow-50 transition-all shadow-md active:scale-95"
          >
            <FaChevronRight size={14} />
          </button>
        </div>
      </div>

      <div
        ref={scrollContainerRef}
        className="flex gap-5 overflow-x-auto pb-4 no-scrollbar scroll-smooth snap-x snap-mandatory"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {displayList.map((review, i) => (
          <div
            key={i}
            className="min-w-[280px] sm:min-w-[320px] max-w-[340px] flex-shrink-0 snap-start flex flex-col justify-between rounded-2xl bg-gradient-to-b from-richblack-800/90 to-richblack-900/90 border border-richblack-700/80 p-5 backdrop-blur-md hover:border-richblack-500 hover:shadow-[0_8px_30px_rgb(0,0,0,0.4)] transition-all duration-300"
          >
            <div className="flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img
                    src={
                      review?.user?.image ||
                      `https://api.dicebear.com/5.x/initials/svg?seed=${review?.user?.firstName || "User"} ${review?.user?.lastName || ""}`
                    }
                    alt=""
                    className="h-10 w-10 rounded-full object-cover ring-2 ring-yellow-50/20"
                  />
                  <div>
                    <h3 className="font-semibold text-richblack-5 text-sm">
                      {`${review?.user?.firstName || "Student"} ${review?.user?.lastName || ""}`}
                    </h3>
                    <p className="text-[11px] font-medium text-yellow-50/90 line-clamp-1">
                      {review?.course?.courseName || "Featured Course"}
                    </p>
                  </div>
                </div>
                <FaQuoteLeft className="text-richblack-600 text-sm" />
              </div>

              <p className="text-xs text-richblack-200 leading-relaxed line-clamp-4 min-h-[4rem]">
                "{review?.review}"
              </p>
            </div>

            <div className="flex items-center justify-between pt-3 mt-3 border-t border-richblack-700/60">
              <span className="font-bold text-yellow-50 text-sm">
                {Number(review?.rating || 5).toFixed(1)}
              </span>
              <RatingStars Review_Count={review?.rating || 5} Star_Size={16} />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ReviewSlider
