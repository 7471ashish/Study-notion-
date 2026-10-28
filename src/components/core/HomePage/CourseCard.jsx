import React from 'react'
import { BsFillPeopleFill } from 'react-icons/bs';
import { TbHierarchy3 } from 'react-icons/tb';

const CourseCard = (props) => {
    
  return (
    <div
      onClick={() => props.setCurrentCard(props.cardData.heading)}
      className={`relative flex flex-col justify-between w-[320px] rounded-2xl p-6 cursor-pointer transition-all duration-300 ${
        props.currentCard === props.cardData.heading
          ? "bg-white text-richblack-900 shadow-xl shadow-yellow-500/10 ring-2 ring-yellow-500/60 -translate-y-2"
          : "bg-richblack-800/90 text-richblack-5 border border-richblack-700/70 hover:border-richblack-500/80 hover:-translate-y-1 hover:shadow-lg hover:shadow-black/40"
      }`}
    >
      <div>
        <div className={`text-xl font-bold mb-3 tracking-tight ${props.currentCard === props.cardData.heading ? "text-richblack-900" : "text-white"}`}>
          {props.cardData.heading}
        </div>

        <p className={`text-sm leading-relaxed mb-8 ${props.currentCard === props.cardData.heading ? "text-richblack-600" : "text-richblack-300"}`}>
          {props.cardData.description}
        </p>
      </div>

      <div>
        <div className={`border-b mb-4 ${props.currentCard === props.cardData.heading ? "border-richblack-100" : "border-richblack-700"}`}></div>
        <div className={`flex items-center justify-between text-xs font-semibold ${props.currentCard === props.cardData.heading ? "text-blue-600" : "text-richblack-300"}`}>
          <div className='flex items-center gap-1.5'>
            <BsFillPeopleFill className="text-sm" />
            <span>{props.cardData.level}</span>
          </div>
          <div className='flex items-center gap-1.5'>
            <TbHierarchy3 className="text-sm" />
            <span>{props.cardData.lessionNumber} Lessons</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CourseCard
