import React from 'react'
import {HomePageExplore} from "../../../data/homepage-explore"
import HighlightText from './HighlightText';
import { useState } from 'react';
import CourseCard from './CourseCard'

const tabsName=["Free", "New to coding","Most popular","Skills paths","Career Paths"];
const ExploreMore = () => {
    const [currentTab,setCurrentTab]=useState(tabsName[0]);
    const [courses,setCourses]=useState(HomePageExplore[0].courses);
    const [currentCard,setCurrentCard]=useState(HomePageExplore[0].courses[0].heading);

    const setMyCards=(value)=>{
        setCurrentTab(value);
        const result=HomePageExplore.filter((course)=>course.tag===value);
        setCourses(result[0].courses);
        setCurrentCard(result[0].courses[0].heading);
    }
    console.log(courses);
  return (
    
    <div className='relative flex flex-col justify-center items-center'>
       <div className='text-4xl font-semibold text-center'>
        Unlock the 
        <HighlightText text="Power of Code"></HighlightText>
       </div>

       <p className='text-center text-[#838894] text-md mt-3'>
        Learn to buil anything you can imagine
       </p>

       <div className='flex flex-row rounded-full bg-[#161D29] mb-5 px-1 py-1 w-fit mt-3'>
        {
            tabsName.map((element,index)=>{
                return(
                   <div className={`text-[16px] flex flex-row items-center gap-2
                   ${currentTab===element?'bg-[#000814] text-[#F1F2FF] font-medium':'text-[#999DAA]'}
                   rounded-full transition-all duration-200 cursor-pointer hover:bg-[#000814] hover:text-[#F1F2FF] px-7 py-2  `} key={index} onClick={()=>setMyCards(element)}>
                    {element}
                   </div>
                )
            })
        }
       </div> 

       <div className='md:h-[150px]'></div>

       {/* curse card ka group */}
      <div className='absolute top-[60%] left-1/2 -translate-x-1/2 flex flex-row gap-10 justify-center w-max'>
        {
            courses.map((element,index)=>{
                return (
                    <CourseCard key={index} cardData={element} currentCard={currentCard} setCurrentCard={setCurrentCard}></CourseCard>
                )
            })
        }
       </div>
    </div>
  )
}

export default ExploreMore
