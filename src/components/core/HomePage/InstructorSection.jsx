import React from 'react'
import Instructor from '../../../assets/Images/Instructor.png'
import HighlightText from './HighlightText'
import CTAButton from './Button'
import { FaArrowRight } from 'react-icons/fa'
const InstructorSection = () => {
  return (
    <div className='mt-20'>
        <div className='flex flex-row gap-20 items-center'>
             <div className='w-[50%] '>
                  <img src={Instructor} alt="" className='shadow-white object-fill'  />
             </div>

             <div className='w-[50%] flex flex-col gap-10'>
                <div className='text-4xl font-semibold tracking-tight'>
                    Become an{" "} <HighlightText text={"Instructor"}></HighlightText>
                </div>

                <p className='font-normal text-[16px] w-[80%] text-richblack-300 leading-relaxed'>
                    Instructors from around the world teach millions of students on EduPulse. We provide the tools and skills to teach what you love.
                </p>

                <div className='w-fit'>
                    <CTAButton active={true} linkto={'/Signup'}>
                   <div className='flex flex-row items-center gap-2'>
                     Start Learning Today
                     <FaArrowRight></FaArrowRight>
                   </div>
                </CTAButton>
                </div>

                

             </div>
        </div>
    </div>
  )
}

export default InstructorSection
