import React from 'react'
import { BsFillPeopleFill } from 'react-icons/bs';
import { TbHierarchy3 } from 'react-icons/tb';

const CourseCard = (props) => {
    
  return (
    <div>
      <div className={`h-full flex flex-col justify-around w-[300px] cursor-pointer ${props.currentCard===props.cardData.heading?" bg-white shadow-[6px_6px_0px_0px_yellow]":"bg-[#161D29]"} py-6 px-6  ` } onClick={() => props.setCurrentCard(props.cardData.heading)}>
          <div className={`${props.currentCard===props.cardData.heading?" text-[#000814]":"text-white"}  font-semibold mb-5`}>
            {props.cardData.heading}
          </div>

          <div className='text-[#838894] mb-10'>
            {props.cardData.description}
          </div>

          <div>
               <div className='border-b border-dashed border-[#838894] mb-4'></div>
          <div className={`${props.currentCard===props.cardData.heading?" text-blue-600":"text-[#838894]"}  flex justify-between`}>
            
            <div className='flex items-center gap-1 justify-center'>
                <BsFillPeopleFill></BsFillPeopleFill>
              <p>{props.cardData.level}</p>
            </div>
            <div className='flex items-center'>
                <TbHierarchy3></TbHierarchy3>
              <p>{props.cardData.lessionNumber}</p>
            </div>

          </div>
          </div>
          
      </div>
    </div>
  )
}

export default CourseCard
