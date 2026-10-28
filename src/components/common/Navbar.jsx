import React, { useEffect, useState } from "react"
import logo from "../../assets/Logo/Logo-Full-Light.png"
import { Link, matchPath, useLocation } from "react-router-dom"
import { NavbarLinks } from "../../data/navbar-links"
import { useSelector } from "react-redux"
import { BsChevronDown } from "react-icons/bs"
import { AiOutlineShoppingCart, AiOutlineMenu, AiOutlineClose } from "react-icons/ai"
import ProfileDropDown from "../core/Auth/ProfileDropDown"
import { apiConnector } from "../../services/apiconnector"
import { categories } from "../../services/apis"
import { ACCOUNT_TYPE } from "../../utils/constants"

import EduPulseLogo from "./EduPulseLogo"

const fallbackCategories = [
  { _id: "1", name: "Web Development" },
  { _id: "2", name: "Python Programming" },
  { _id: "3", name: "Data Structures & Algorithms" },
  { _id: "4", name: "DevOps & Cloud" },
]

const Navbar = () => {
  const { token } = useSelector((state) => state.auth)
  const { user } = useSelector((state) => state.profile)
  const { totalItems } = useSelector((state) => state.cart)
  const location = useLocation()

  const [subLinks, setSubLinks] = useState([])
  const [loading, setLoading] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const fetchSublinks = async () => {
    setLoading(true)
    try {
      const result = await apiConnector("GET", categories.CATEGORIES_API)
      if (result?.data?.data && result.data.data.length > 0) {
        setSubLinks(result.data.data)
      } else {
        setSubLinks(fallbackCategories)
      }
    } catch (err) {
      setSubLinks(fallbackCategories)
    }
    setLoading(false)
  }

  useEffect(() => {
    fetchSublinks()
  }, [])

  const matchRoute = (route) => {
    return matchPath({ path: route }, location.pathname)
  }

  return (
    <nav className="sticky top-0 z-50 flex h-14 w-full items-center justify-center border-b border-richblack-800 bg-richblack-900/95 backdrop-blur-md transition-all duration-200">
      <div className="flex w-11/12 max-w-maxContent items-center justify-between">
        {/* Brand Logo */}
        <Link to="/" className="flex items-center gap-2 hover:opacity-90 transition-opacity">
          <EduPulseLogo size="md" />
        </Link>

        {/* Desktop Nav Links */}
        <div className="hidden md:flex items-center gap-x-6 text-richblack-25">
          {NavbarLinks.map((link, index) => {
            return (
              <div key={index} className="relative">
                {link.title === "Catalog" ? (
                  <div className="group relative flex cursor-pointer items-center gap-1.5 py-2 text-sm font-medium text-richblack-100 hover:text-yellow-50 transition-colors">
                    <span>{link.title}</span>
                    <BsChevronDown size={11} className="transition-transform group-hover:rotate-180" />

                    {/* Catalog Dropdown Card */}
                    <div className="invisible absolute left-1/2 top-full -translate-x-1/2 translate-y-2 flex w-[260px] flex-col rounded-2xl bg-richblack-800/95 border border-richblack-700 p-3 text-richblack-5 opacity-0 shadow-2xl backdrop-blur-xl transition-all duration-300 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100 z-50">
                      <div className="absolute left-1/2 -top-1.5 h-3 w-3 -translate-x-1/2 rotate-45 border-l border-t border-richblack-700 bg-richblack-800" />
                      <div className="flex flex-col gap-1 py-1">
                        {subLinks.length > 0 ? (
                          subLinks.map((sublink, i) => {
                            const slug = sublink.name
                              ? sublink.name.split(" ").join("-").toLowerCase()
                              : "web-development"
                            return (
                              <Link
                                to={`/catalog/${slug}`}
                                key={sublink._id || i}
                                className="rounded-xl px-3.5 py-2.5 text-xs font-semibold text-richblack-100 hover:bg-richblack-700/80 hover:text-yellow-50 transition-all"
                              >
                                {sublink.name}
                              </Link>
                            )
                          })
                        ) : (
                          <div className="p-2 text-center text-xs text-richblack-400">
                            Loading Categories...
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ) : (
                  <Link
                    to={link?.path}
                    className={`text-sm font-medium transition-colors ${
                      matchRoute(link?.path)
                        ? "text-yellow-50 font-semibold"
                        : "text-richblack-200 hover:text-richblack-5"
                    }`}
                  >
                    {link.title}
                  </Link>
                )}
              </div>
            )
          })}
        </div>

        {/* Right Section: Auth & Cart */}
        <div className="hidden md:flex items-center gap-x-4">
          {user && user?.accountType !== ACCOUNT_TYPE.INSTRUCTOR && (
            <Link
              to="/dashboard/cart"
              className="relative p-2 rounded-xl text-richblack-200 hover:text-yellow-50 hover:bg-richblack-800 transition-colors"
              title="Shopping Cart"
            >
              <AiOutlineShoppingCart size={22} />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 grid h-5 w-5 place-items-center rounded-full bg-yellow-50 text-[10px] font-extrabold text-richblack-900 shadow-md">
                  {totalItems}
                </span>
              )}
            </Link>
          )}

          {token === null ? (
            <div className="flex items-center gap-x-3">
              <Link to="/login">
                <button className="rounded-xl border border-richblack-700 bg-richblack-800 px-4 py-2 text-xs font-semibold text-richblack-100 hover:border-richblack-500 hover:text-richblack-5 transition-all cursor-pointer">
                  Log in
                </button>
              </Link>
              <Link to="/signup">
                <button className="rounded-xl bg-yellow-50 px-4 py-2 text-xs font-bold text-richblack-900 hover:bg-yellow-100 transition-all shadow-md shadow-yellow-50/20 cursor-pointer">
                  Sign up
                </button>
              </Link>
            </div>
          ) : (
            <ProfileDropDown />
          )}
        </div>

        {/* Mobile Hamburger Button */}
        <div className="flex md:hidden items-center gap-3">
          {user && user?.accountType !== ACCOUNT_TYPE.INSTRUCTOR && (
            <Link to="/dashboard/cart" className="relative p-1.5 text-richblack-200">
              <AiOutlineShoppingCart size={22} />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 grid h-4 w-4 place-items-center rounded-full bg-yellow-50 text-[9px] font-bold text-richblack-900">
                  {totalItems}
                </span>
              )}
            </Link>
          )}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-1.5 rounded-lg text-richblack-200 hover:text-richblack-5 hover:bg-richblack-800"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <AiOutlineClose size={22} /> : <AiOutlineMenu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-14 left-0 w-full bg-richblack-900/95 border-b border-richblack-800 backdrop-blur-xl p-6 flex flex-col gap-4 z-50">
          <div className="flex flex-col gap-3">
            {NavbarLinks.map((link, idx) => {
              if (link.title === "Catalog") {
                return (
                  <div key={idx} className="flex flex-col gap-1.5">
                    <span className="text-xs font-bold uppercase tracking-wider text-richblack-400">
                      Catalog Categories
                    </span>
                    <div className="grid grid-cols-2 gap-2 pt-1">
                      {subLinks.map((sublink, i) => {
                        const slug = sublink.name
                          ? sublink.name.split(" ").join("-").toLowerCase()
                          : "web-development"
                        return (
                          <Link
                            key={sublink._id || i}
                            to={`/catalog/${slug}`}
                            onClick={() => setMobileMenuOpen(false)}
                            className="rounded-lg bg-richblack-800 p-2 text-xs font-medium text-richblack-200 hover:text-yellow-50"
                          >
                            {sublink.name}
                          </Link>
                        )
                      })}
                    </div>
                  </div>
                )
              }
              return (
                <Link
                  key={idx}
                  to={link.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`text-sm font-semibold py-1.5 ${
                    matchRoute(link.path) ? "text-yellow-50" : "text-richblack-200"
                  }`}
                >
                  {link.title}
                </Link>
              )
            })}
          </div>

          <div className="pt-3 border-t border-richblack-800 flex items-center gap-3">
            {token === null ? (
              <>
                <Link
                  to="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex-1 text-center py-2 rounded-xl bg-richblack-800 border border-richblack-700 text-xs font-semibold text-richblack-100"
                >
                  Log in
                </Link>
                <Link
                  to="/signup"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex-1 text-center py-2 rounded-xl bg-yellow-50 text-xs font-bold text-richblack-900"
                >
                  Sign up
                </Link>
              </>
            ) : (
              <div className="flex items-center justify-between w-full">
                <Link
                  to="/dashboard/my-profile"
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-xs font-semibold text-yellow-50"
                >
                  Go to Dashboard
                </Link>
                <ProfileDropDown />
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  )
}

export default Navbar
