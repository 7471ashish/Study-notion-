import React from 'react'
import ContactUsForm from '../../ContactPage/ContactUsForm'

const ContactFormSection = () => {
  return (
    <div className='flex flex-col items-center justify-center gap-4'>
      <h1 className='text-4xl text-white font-semibold'>
        Get In Touch
      </h1>

      <p className='text-[white]'>We'd love to here for you. Please fill out this form</p>
      <div>
        <ContactUsForm></ContactUsForm>
      </div>
    </div>
  )
}

export default ContactFormSection
