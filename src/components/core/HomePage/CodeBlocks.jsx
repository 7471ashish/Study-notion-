import React from 'react'
import CTAButton from '../HomePage/Button'
import HighlightText from './HighlightText'
import {FaArrowRight} from 'react-icons/fa'
import { TypeAnimation } from 'react-type-animation'

const CodeBlocks = ({position ,heading,subheading,ctabtn1,ctabtn2,codeblock,backgroundGradient,codeColor }) => {
  return (
    <div className={`flex ${position}  my-20 justify-between gap-10 `}> 
      {/* section1 */}
      <div className='w-[50%] flex flex-col gap-8 '>
       {heading}
       <div className='text-[#838894] font-bold '>
        {subheading}
       </div>

        <div className='flex gap-7 mt-7'>   
           <CTAButton active={ctabtn1.active} linkto={ctabtn1.linkto}>
               <div className='flex gap-2 items-center'>
                {ctabtn1.btnText}
                <FaArrowRight></FaArrowRight>
               </div>
           </CTAButton>

           <CTAButton active={ctabtn2.active} linkto={ctabtn2.linkto}>
               
                {ctabtn2.btnText}
                
           </CTAButton>


        </div>
      </div>

      {/* section 2 */}
      <div className='relative w-full lg:w-[500px] my-2'>
        {backgroundGradient ? backgroundGradient : (
          <div className='absolute -inset-1 rounded-2xl bg-gradient-to-r from-blue-600/20 via-cyan-500/15 to-yellow-500/15 blur-xl -z-10 opacity-70'></div>
        )}
        <div className='h-fit flex flex-col text-sm w-full rounded-2xl border border-richblack-700/80 bg-richblack-900/90 backdrop-blur-md shadow-2xl overflow-hidden'>
          <div className='flex items-center justify-between px-4 py-2.5 bg-richblack-800/90 border-b border-richblack-700/60'>
            <div className='flex items-center gap-1.5'>
              <span className='w-3 h-3 rounded-full bg-red-500/80 inline-block'></span>
              <span className='w-3 h-3 rounded-full bg-yellow-400/80 inline-block'></span>
              <span className='w-3 h-3 rounded-full bg-emerald-500/80 inline-block'></span>
            </div>
            <span className='text-xs font-mono text-richblack-400 font-medium'>index.html</span>
            <div className='w-12'></div>
          </div>

          <div className='flex flex-row p-4 font-mono'>
            <div className="text-right flex flex-col w-[12%] select-none text-richblack-500 font-mono text-xs pr-3 leading-6">
              <p>1</p>
              <p>2</p>
              <p>3</p>
              <p>4</p>
              <p>5</p>
              <p>6</p>
              <p>7</p>
              <p>8</p>
              <p>9</p>
              <p>10</p>
              <p>11</p>
            </div>

            <div className={`w-[88%] flex flex-col font-mono text-xs sm:text-sm leading-6 ${codeColor || "text-yellow-25"}`}>
              <TypeAnimation
                sequence={[codeblock, 1500, ""]}
                repeat={Infinity}
                cursor={true}
                style={{
                  whiteSpace: "pre-line",
                  display: "block",
                }}
                omitDeletionAnimation={true}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CodeBlocks
