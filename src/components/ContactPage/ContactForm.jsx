import React from "react"
import ContactUsForm from "./ContactUsForm"

const ContactForm = () => {
  return (
    <div className="border border-richblack-700/80 bg-richblack-800/60 backdrop-blur-md text-richblack-300 rounded-2xl p-7 lg:p-14 flex gap-3 flex-col shadow-2xl shadow-black/30">
      <h1 className="text-3xl lg:text-4xl leading-tight font-bold text-richblack-5">
        Got an Idea? We&apos;ve got the skills. <span className="bg-gradient-to-r from-yellow-50 to-yellow-200 bg-clip-text text-transparent">Let&apos;s team up</span>
      </h1>
      <p className="text-richblack-300">
        Tell us more about yourself and what you&apos;ve got in mind.
      </p>

      <div className="mt-7">
        <ContactUsForm />
      </div>
    </div>
  )
}

export default ContactForm
