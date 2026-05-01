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
                <div className='text-4xl font-semibold '>
                    Beacome an{" "} <HighlightText text={"Instructor"}></HighlightText>
                </div>

                <p className='font-medium text-[16px] w-[80%] text-[#838894]'>
                    Instructors from around the world teach millions of students on StudyNotion. We provide the tools and skills to teach what you love.

                </p>

                <div className='w-fit'>
                    <CTAButton active={true} linkto={'/Signup'}>
                   <div className='flex flex-row gap-2'>
                     StartLearning Today
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
