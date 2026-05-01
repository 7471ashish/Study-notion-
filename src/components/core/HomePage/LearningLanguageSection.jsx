import React from 'react'
import HighlightText from './HighlightText'
import know_your_progress from '../../../assets/Images/Know_your_Progress.png'
import compare_with_others from "../../../assets/Images/Compare_with_others.png"
import plan_your_lesson from "../../../assets/Images/Plan_your_lessons.png"
import CTAButton from "./Button"

const LearningLanguageSection = () => {
  return (
    <div className='mt-[130px]'>
      <div className='flex flex-col gap-5 items-center'>
          <div className='text-4xl font-semibold text-center'>
            Your Swiss knife for
            <HighlightText text={'learning any language'}></HighlightText>
          </div> 

          <div className='text-center text-[#424854] mx-auto text-base mt-3 font-medium w-[70%]'>
            Using spin making learning multiple languages easy. With 20+ languages realistic voice-over,progress tracking, custom schedule and more.
          </div>

          <div className='flex flex-row items-center mt-5 object-contain' >
              <img src={know_your_progress} alt="knowYourProgress" className='object-cover -mr-32' />
              <img src={compare_with_others} alt="compareWithOthers" className='object-cover'  />
              <img src={plan_your_lesson} alt="PlanYourLesson" className='object-cover -ml-32'  />
          </div>

          <div className='w-fit'>
            <CTAButton active={true} linkto={"/Signup"}>
               <div>
                Learn more
               </div>
            </CTAButton>
          </div>
      </div>
    </div>
  )
}

export default LearningLanguageSection
