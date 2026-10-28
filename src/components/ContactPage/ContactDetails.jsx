import React from "react"
import * as Icon1 from "react-icons/bi"
import * as Icon3 from "react-icons/hi2"
import * as Icon2 from "react-icons/io5"

const contactDetails = [
  {
    icon: "HiChatBubbleLeftRight",
    heading: "Chat with us",
    description: "Our friendly team is here to help.",
    details: "info@edupulse.com",
  },
  {
    icon: "BiWorld",
    heading: "Visit us",
    description: "Come and say hello at our office HQ.",
    details: "Akshya Nagar 1st Block 1st Cross, Rammurthy nagar, Bangalore-560016",
  },
  {
    icon: "IoCall",
    heading: "Call us",
    description: "Mon - Fri From 8am to 5pm",
    details: "+123 456 7869",
  },
]

const ContactDetails = () => {
  return (
    <div className="flex flex-col gap-6 rounded-2xl bg-richblack-800/90 border border-richblack-700 p-6 lg:p-8 backdrop-blur-sm shadow-xl shadow-black/20">
      {contactDetails.map((ele, i) => {
        let Icon = Icon1[ele.icon] || Icon2[ele.icon] || Icon3[ele.icon] || Icon1.BiSupport
        return (
          <div
            className="flex flex-col gap-1 p-3 text-sm text-richblack-200 transition-all duration-200 hover:translate-x-1"
            key={i}
          >
            <div className="flex flex-row items-center gap-3">
              <div className="p-2.5 rounded-lg bg-richblack-700/80 text-yellow-50">
                <Icon size={22} />
              </div>
              <h1 className="text-lg font-semibold text-richblack-5">
                {ele?.heading}
              </h1>
            </div>
            <p className="font-medium text-richblack-300 mt-1">{ele?.description}</p>
            <p className="font-semibold text-richblack-100">{ele?.details}</p>
          </div>
        )
      })}
    </div>
  )
}

export default ContactDetails
