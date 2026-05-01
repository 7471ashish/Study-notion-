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
      <div className='h-fit flex flex-row text-sm w-[100%] py-4 lg:w-[500px] shadow-md bg-[#161D29] 
        '>
        {/* bg gradient add HW*/}
        <div className="text-center flex flex-col w-[10%] select-none text-[#6E727F]  font-['Inter',sans-serif] font-bold">
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

        <div className={`w-[90%] flex flex-col gap-2 font-bold text-sm  font-[Roboto_Mono] text-yellow-300 ${codeColor} pr-1 `}>
        <TypeAnimation
        sequence={[codeblock,1000,""]}
        repeat={Infinity}
        cursor={true}
        style={
            {
            whiteSpace: "pre-line",
            display:"block"
            }
        }
        omitDeletionAnimation={true}
        >


        </TypeAnimation>
        </div>
      </div>

      
    </div>
  )
}

export default CodeBlocks
