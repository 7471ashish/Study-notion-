import React from "react"
import { useSelector } from "react-redux"
import RenderCartCourses from "./RenderCartCourses"
import RenderTotalAmount from "./RenderTotalAmount"
import { HiOutlineShoppingCart } from "react-icons/hi"
import { Link } from "react-router-dom"

export default function Cart() {
  const { total, totalItems } = useSelector((state) => state.cart)

  return (
    <div className="flex flex-col gap-6 pb-10">
      <div>
        <h1 className="text-3xl font-extrabold text-richblack-5 tracking-tight">
          Shopping Cart
        </h1>
        <p className="text-sm text-richblack-400 mt-1">
          {totalItems} Course{totalItems === 1 ? "" : "s"} in your cart
        </p>
      </div>

      {total > 0 ? (
        <div className="flex flex-col-reverse items-start gap-8 lg:flex-row mt-2">
          <RenderCartCourses />
          <RenderTotalAmount />
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-richblack-700 bg-richblack-800/40 p-12 text-center my-6">
          <div className="p-4 rounded-full bg-richblack-800 text-yellow-50 mb-4 border border-richblack-700">
            <HiOutlineShoppingCart size={32} />
          </div>
          <h2 className="text-xl font-bold text-richblack-5">Your cart is empty</h2>
          <p className="text-sm text-richblack-400 mt-1 max-w-sm">
            Looks like you haven&apos;t added any courses to your cart yet. Explore our catalog to find your next skill!
          </p>
          <Link
            to="/catalog/web-development"
            className="mt-6 rounded-xl bg-yellow-50 px-6 py-2.5 text-sm font-bold text-richblack-900 hover:bg-yellow-100 transition-colors shadow-lg shadow-yellow-50/20"
          >
            Explore Catalog
          </Link>
        </div>
      )}
    </div>
  )
}
