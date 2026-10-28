import React, { useEffect, useState } from "react"
import Footer from "../components/common/Footer"
import { useParams } from "react-router-dom"
import { apiConnector } from "../services/apiconnector"
import { categories } from "../services/apis"
import { getCatalogaPageData } from "../services/operations/pageAndComponentData"
import Course_Card from "../components/core/Catalog/Course_Card"
import CourseSlider from "../components/core/Catalog/CourseSlider"
import { useSelector } from "react-redux"
import Error from "./Error"
import { HiOutlineSparkles } from "react-icons/hi"

const Catalog = () => {
  const { loading } = useSelector((state) => state.profile)
  const { catalogName } = useParams()
  const [active, setActive] = useState(1)
  const [catalogPageData, setCatalogPageData] = useState(null)
  const [categoryId, setCategoryId] = useState("")

  // Fetch all categories
  useEffect(() => {
    const getCategories = async () => {
      try {
        const res = await apiConnector("GET", categories.CATEGORIES_API)
        const matchCategory = res?.data?.data?.find(
          (ct) => ct.name.split(" ").join("-").toLowerCase() === catalogName?.toLowerCase()
        )
        if (matchCategory) {
          setCategoryId(matchCategory._id)
        }
      } catch (err) {
        console.error("Error fetching categories:", err)
      }
    }
    getCategories()
  }, [catalogName])

  useEffect(() => {
    const getCategoryDetails = async () => {
      try {
        const res = await getCatalogaPageData(categoryId)
        setCatalogPageData(res)
      } catch (error) {
        console.error("Error fetching category page data:", error)
      }
    }
    if (categoryId) {
      getCategoryDetails()
    }
  }, [categoryId])

  if (loading || !catalogPageData) {
    return (
      <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
        <div className="spinner"></div>
      </div>
    )
  }

  if (!loading && !catalogPageData.success) {
    return <Error />
  }

  const selectedCat = catalogPageData?.data?.selectedCategory
  const differentCat = catalogPageData?.data?.differentCategory
  const mostSelling = catalogPageData?.data?.mostSellingCourses

  return (
    <div className="min-h-screen bg-richblack-900 text-richblack-5">
      {/* Hero Banner */}
      <div className="relative overflow-hidden bg-gradient-to-b from-richblack-800 via-richblack-850 to-richblack-900 border-b border-richblack-800 px-4 py-12 lg:py-16">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-yellow-50/5 rounded-full blur-3xl pointer-events-none" />
        <div className="mx-auto flex flex-col justify-center gap-4 max-w-maxContent">
          <p className="text-xs md:text-sm font-medium text-richblack-400">
            {`Home / Catalog / `}
            <span className="text-yellow-50 font-semibold">
              {selectedCat?.name}
            </span>
          </p>
          <div className="flex items-center gap-2">
            <HiOutlineSparkles className="text-yellow-50 text-2xl" />
            <h1 className="text-3xl md:text-4xl font-extrabold text-richblack-5 tracking-tight">
              {selectedCat?.name}
            </h1>
          </div>
          <p className="max-w-[850px] text-sm md:text-base text-richblack-300 leading-relaxed">
            {selectedCat?.description ||
              "Explore comprehensive courses crafted by industry experts to elevate your skills and advance your career."}
          </p>
        </div>
      </div>

      <div className="mx-auto w-11/12 max-w-maxContent py-12 flex flex-col gap-14">
        {/* Section 1: Courses in Selected Category */}
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between border-b border-richblack-800 pb-3">
            <h2 className="text-2xl md:text-3xl font-bold text-richblack-5">
              Courses to get you started
            </h2>
            <div className="flex gap-2">
              <button
                className={`px-4 py-1.5 text-xs md:text-sm font-semibold rounded-lg transition-all ${
                  active === 1
                    ? "bg-yellow-50 text-richblack-900 shadow-md shadow-yellow-50/20"
                    : "text-richblack-300 hover:text-richblack-5 bg-richblack-800"
                }`}
                onClick={() => setActive(1)}
              >
                Most Popular
              </button>
              <button
                className={`px-4 py-1.5 text-xs md:text-sm font-semibold rounded-lg transition-all ${
                  active === 2
                    ? "bg-yellow-50 text-richblack-900 shadow-md shadow-yellow-50/20"
                    : "text-richblack-300 hover:text-richblack-5 bg-richblack-800"
                }`}
                onClick={() => setActive(2)}
              >
                New Releases
              </button>
            </div>
          </div>

          <CourseSlider Courses={selectedCat?.courses} />
        </div>

        {/* Section 2: Related Category */}
        {differentCat && differentCat?.courses?.length > 0 && (
          <div className="flex flex-col gap-4">
            <div className="border-b border-richblack-800 pb-3">
              <h2 className="text-2xl md:text-3xl font-bold text-richblack-5">
                Top courses in{" "}
                <span className="text-yellow-50">{differentCat?.name}</span>
              </h2>
            </div>
            <CourseSlider Courses={differentCat?.courses} />
          </div>
        )}

        {/* Section 3: Frequently Bought */}
        {mostSelling && mostSelling?.length > 0 && (
          <div className="flex flex-col gap-6">
            <div className="border-b border-richblack-800 pb-3">
              <h2 className="text-2xl md:text-3xl font-bold text-richblack-5">
                Frequently Bought Together
              </h2>
              <p className="text-xs md:text-sm text-richblack-400 mt-1">
                Highest rated courses chosen by thousands of learners
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {mostSelling.slice(0, 4).map((course, i) => (
                <Course_Card course={course} key={course?._id || i} Height={"h-[180px]"} />
              ))}
            </div>
          </div>
        )}
      </div>

      <Footer />
    </div>
  )
}

export default Catalog
