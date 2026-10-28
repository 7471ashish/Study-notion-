import React from 'react'
import HighlightText from '../HomePage/HighlightText';
import CTAButton from '../../../components/core/HomePage/Button'

const LearningGridArray = [
    {
      order: -1,
      heading: "World-Class Learning for",
      highlightText: "Anyone, Anywhere",
      description:
        "EduPulse partners with more than 275+ leading universities and companies to bring flexible, affordable, job-relevant online learning to individuals and organizations worldwide.",
      BtnText: "Learn More",
      BtnLink: "/",
    },
    {
      order: 1,
      heading: "Curriculum Based on Industry Needs",
      description:
        "Save time and money! The EduPulse curriculum is designed to be crystal clear, practical, and aligned directly with modern tech industry requirements.",
    },
    {
      order: 2,
      heading: "Our Learning Methods",
      description:
        "Interactive video lectures, live problem-solving, hands-on coding challenges, and AI-assisted doubt resolution built directly into your browser.",
    },
    {
      order: 3,
      heading: "Certification",
      description:
        "Earn industry-recognized, verifiable certificates upon course completion to showcase your accomplishments directly on LinkedIn and your resume.",
    },
    {
      order: 4,
      heading: `Automated Assessment`,
      description:
        "Instant code evaluation, instant feedback, and continuous progress metrics to keep you laser-focused on mastery.",
    },
    {
      order: 5,
      heading: "Ready to Work",
      description:
        "Graduate with an impressive project portfolio and real-world skills that hiring managers and recruiters actively look for.",
    },
  ];

const LearningGrid = () => {
  return (
    <div className='grid mx-auto lg:grid-cols-4 grid-cols-1 w-11/12 max-w-[1260px] '>
        {
         LearningGridArray.map((card,index)=>{
          return <div
          key={index}
          className={`${index===0 && 'lg:col-span-2' }
           ${card.order%2==1 ?("bg-[#2C333F]"):card.order%2===0? 'bg-[#161D29]':'bg-transparent' }
           ${card.order===3 && 'lg:col-start-2'}
          `
        }
          >
            {
              card.order<0 ?(
                <div className='h-[15rem] flex flex-col gap-2'>
                  <div className='text-4xl font-semibold text-white'>
                    {card.heading}
                    <HighlightText text={card.highlightText}></HighlightText>
                  </div>
                  <p className='text-[#C5C7D4] opacity-80'>
                    {card.description}
                  </p>

                  <div  className='w-fit'>
                    <CTAButton active={true} linkto={card.BtnLink}>
                      {card.BtnText}
                    </CTAButton>
                  </div>
                </div>
              ):(
                <div className='h-[15rem] flex flex-col justify-around px-3'>
                  <h1 className='text-white font-semibold'>
                    {card.heading}
                  </h1>
                  <p className='text-[#C5C7D4] opacity-80'>
                    {card.description}
                  </p>
                </div>
              )
            }
             
          </div>
         })
        }
      
    </div>
  )
}

export default LearningGrid
