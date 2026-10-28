import React from 'react'
import {FaArrowRight} from 'react-icons/fa'
import {Link} from 'react-router-dom'
import HighlightText from '../components/core/HomePage/HighlightText'
import CTAButton from '../components/core/HomePage/Button'
import Banner from '../assets/Images/banner.mp4'
import CodeBlocks from '../components/core/HomePage/CodeBlocks'
import LearningLanguageSection from '../components/core/HomePage/LearningLanguageSection'
import TimelineSection from '../components/core/HomePage/TimelineSection'
import InstructorSection from '../components/core/HomePage/InstructorSection'
import ExploreMore from '../components/core/HomePage/ExploreMore'
import Footer from "../components/common/Footer"
import ReviewSlider from "../components/common/ReviewSlider"
const Home = () => {
  return (
    <div>
      {/* section1 */}
        <div className='relative mx-auto flex flex-col w-11/12 items-center text-white justify-between max-w-[1260px]'>
            <Link to="/Signup">
               <div className='group mt-14 p-1 mx-auto rounded-full bg-richblack-800 border border-richblack-700/80 font-medium text-richblack-200 transition-all duration-200 hover:border-yellow-500/50 hover:shadow-lg hover:shadow-yellow-500/10 hover:-translate-y-0.5'>
                   <div className='flex flex-row items-center gap-2.5 rounded-full px-6 py-1.5 transition-all duration-200 group-hover:bg-richblack-900 text-xs sm:text-sm font-semibold'>
                      <span className='w-2 h-2 rounded-full bg-yellow-400 animate-pulse'></span>
                      <p>Become an Instructor</p>
                      <FaArrowRight className='text-xs group-hover:translate-x-1 transition-transform' />
                   </div>
               </div>
            </Link>


            <div className='text-center text-3xl sm:text-5xl font-extrabold mt-8 tracking-tight max-w-4xl leading-tight'>
                Empower Your Future with
                <HighlightText text={"Coding Skills"}></HighlightText>
            </div>


            <div className='mt-4 w-[90%] max-w-2xl text-center text-sm sm:text-base font-normal text-richblack-300 leading-relaxed'>
                 With EduPulse online coding courses, learn at your own pace from anywhere in the world. Gain access to hands-on projects, automated assessments, and direct mentorship from industry veterans.
            </div>


            <div className='flex flex-row gap-5 mt-8'>
               <CTAButton active={true} linkto={"/Signup"}>
                Get Started Free
               </CTAButton>

               <CTAButton active={false} linkto={"/login"}>
                Book a Demo
               </CTAButton>
            </div>


            <div className='mx-3 my-12 relative w-full max-w-4xl'>
                <div className='absolute -inset-1 rounded-3xl bg-gradient-to-r from-blue-600/30 via-cyan-400/20 to-yellow-500/20 blur-2xl -z-10'></div>
                <div className='overflow-hidden rounded-2xl border border-richblack-700/80 shadow-2xl bg-richblack-900'>
                    <video muted loop autoPlay className='w-full object-cover'>
                        <source src={Banner} type='video/mp4' />
                    </video>
                </div>
            </div>

            {/* code section 1 */}
            <div>
                <CodeBlocks  position={"lg:flex-row"} heading={
                    <div className='text-4xl font-semibold'>
                        Unlock your
                        <HighlightText text={"Coding potential"}></HighlightText>
                        with our online courses
                    </div>
                }
                subheading={ "Our courses are designed and taught by industry experts who have years of experience in coding and are passionate about sharing their knowledge with you."}

                ctabtn1={{
                    btnText:"Try it yourself",
                    linkto:"/Signup",
                    active:true,
                }}

                 ctabtn2={{
                    btnText:"Learn more",
                    linkto:"/Signup",
                    active:false,
                }}
                codeblock={`<!DOCTYPE html>\n <html lang="en">\n<head>\n<title>This is myPage</title>\n</head>\n<body>\n<h1><a href="/">Header</a></h1>\n<nav> <a href="/one">One</a> <a href="/two">Two</a> <a href="/three">Three</a>\n</nav>\n</body>`}

                 codeColor={"text-yellow-25"}
                ></CodeBlocks>
            </div>
             
                   {/* code section 2 */}
              <div>
                <CodeBlocks  position={"lg:flex-row-reverse"} heading={
                    <div className='text-4xl font-semibold'>
                        Unlock your
                        <HighlightText text={"Coding potential"}></HighlightText>
                        with our online courses
                    </div>
                }
                subheading={ "Our courses are designed and taught by industry experts who have years of experience in coding and are passionate about sharing their knowledge with you."}

                ctabtn1={{
                    btnText:"Try it yourself",
                    linkto:"/Signup",
                    active:true,
                }}

                 ctabtn2={{
                    btnText:"Learn more",
                    linkto:"/Signup",
                    active:false,
                }}
                codeblock={`<!DOCTYPE html>\n <html lang="en">\n<head>\n<title>This is myPage</title>\n</head>\n<body>\n<h1><a href="/">Header</a></h1>\n<nav> <a href="/one">One</a> <a href="/two">Two</a> <a href="/three">Three</a>\n</nav>\n</body>`}

                 codeColor={"text-yellow-25"}
                ></CodeBlocks>
            </div>
          

          <ExploreMore></ExploreMore>

        </div>

       {/* section2 */}

          <div className='bg-[#F9F9F9]  text-[#2C333F] pb-10 mt-16'>
                <div className='homepage_bg h-[310px]'>
                     <div className='w-11/12 max-w-[1260px] flex flex-col items-center gap-5 mx-auto'>
                     <div className='h-[110px]'></div>
                           <div className='flex flex-row gap-7 text-white'>
                                 <CTAButton  active={true} linkto={'/Signup'}>
                                      <div className='flex items-center gap-3'>
                                        Explore Full Catalog
                                        <FaArrowRight></FaArrowRight>
                                      </div>
                                      
                                 </CTAButton>

                                 <CTAButton  active={false} linkto={'/Signup'}>
                                        <div>
                                            Learn more
                                        </div>
                                 </CTAButton>
                           </div>
                     </div>
                </div>


                <div className='mx-auto w-11/12 max-w-[1260px] flex flex-col items-center justify-between gap-7'>

                     <div className='flex flex-row gap-5 mb-10 mt-[95px]'>
                        <div className='text-4xl font-semibold w-[45%]'>
                            Get the skills you need for a
                            <HighlightText text="Job that is in demand"></HighlightText> 
                        </div>

                        <div className='flex flex-col gap-10 w-[40%] items-start'>
                            <div className='text-[16px] text-richblack-700 leading-relaxed font-normal'>
                                The modern EduPulse dictates its own terms. Today, to be a competitive specialist requires more than professional skills.
                            </div>
                            <CTAButton active={true} linkto={'/Signup'}>
                               <div>
                                Learn more
                               </div>
                            </CTAButton>

                        </div>

                     </div>

                     <TimelineSection></TimelineSection>
                <LearningLanguageSection></LearningLanguageSection>

                </div>

                
          </div>

       {/* section 3 */}

       <div className='w-11/12 mx-auto max-w-[1260px] flex flex-col items-center justify-between gap-8 bg-[#000814] text-white mt-7'>
         
          <InstructorSection></InstructorSection>


          <div className="w-full">
            <ReviewSlider />
          </div>
       </div>
       <Footer></Footer>
    </div>
  )
}

export default Home
