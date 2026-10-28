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

       <p className='text-center text-richblack-300 text-base mt-2 max-w-lg'>
        Learn to build anything you can imagine with structured pathways.
       </p>

       <div className='flex flex-wrap items-center justify-center rounded-full bg-richblack-800/90 border border-richblack-700/80 p-1.5 w-fit mt-6 backdrop-blur-sm shadow-xl shadow-black/20'>
        {
            tabsName.map((element,index)=>{
                return(
                   <div className={`text-sm sm:text-base flex flex-row items-center gap-2
                   ${currentTab===element?'bg-richblack-900 text-richblack-5 font-semibold shadow-sm border border-richblack-700/60':'text-richblack-300'}
                   rounded-full transition-all duration-200 cursor-pointer hover:bg-richblack-900/60 hover:text-white px-5 sm:px-7 py-2`} key={index} onClick={()=>setMyCards(element)}>
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
