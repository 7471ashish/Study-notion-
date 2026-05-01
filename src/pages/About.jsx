import React from 'react'
import HighlightText from '../components/core/HomePage/HighlightText'
import BannerImage1 from "../assets/Images/aboutus1.webp"
import BannerImage2 from "../assets/Images/aboutus2.webp"
import BannerImage3 from "../assets/Images/aboutus3.webp"
import FoundingStory from "../assets/Images/FoundingStory.png"
import StatsComponent from '../components/core/AboutPage/Stats'
import LearningGrid from '../components/core/AboutPage/LearningGrid'
import Footer from '../components/common/Footer'
import ContactFormSection from '../components/core/AboutPage/ContactFormSection'

const About = () => {
  return (
    <div className='flex flex-col items-center '>
      {/* section 1 */}
      <section className='bg-[#161D29] flex flex-col justify-center items-center w-full relative h-[400px]'>
        <div className=' w-11/12 flex flex-col items-center'>
            <header className='text-white flex flex-col items-center text-4xl gap-6 w-[80%] mt-10'>
                <div className='text-center'>
                    Driving Innovation in online education for a
                <HighlightText text='Brighter Future'></HighlightText>
                </div>
                
                
                     <p className='text-center text-sm' >Studynotion is at the forefront of driving innovation in online education. We're passionate about creating a brighter future by offering cutting-edge courses, leveraging emerging technologies, and nurturing a vibrant learning community.</p>
            </header>
            <div className='flex gap-4 absolute top-[90%]'>
                <img src={BannerImage1} alt=""/>
                <img src={BannerImage2} alt="" />
                <img src={BannerImage3} alt="" />

            </div>
        </div>
      </section>

      {/* section 2 */}
      <section className='mt-96 flex items-center justify-center '>
        <h1 className='text-[#C5C7D4] text-4xl text-center w-11/12'>
          "We are passionate about revolutionizing the way we learn. Our innovative platform 
          <span className='text-blue-500'> combines technology</span>
          , 
          <span className='text-orange-300'> expertise </span>
        ,and commutnity to create an <span className='text-orange-400'>unparalleled educational experience</span> "
        </h1>
      </section>


      {/* section 3 */}
      <section className='flex items-center justify-center mt-36 mb-8'>
        <div className='w-11/12 flex justify-around '>
        <div className='w-[40%] flex flex-col gap-3 '>
           <h1 className="text-4xl font-bold bg-gradient-to-r from-orange-500 via-red-500 to-red-600 bg-clip-text text-transparent">Our Founding Story</h1>
           <p className='text-[#C5C7D4] opacity-80'>
            Our e-learning platform was born out of a shared vision and passion for transforming education. It all began with a group of educators, technologists, and lifelong learners who recognized the need for accessible, flexible, and high-quality learning opportunities in a rapidly evolving digital world.
           </p>

           <p className='text-[#C5C7D4] opacity-80'>
            As experienced educators ourselves, we witnessed firsthand the limitations and challenges of traditional education systems. We believed that education should not be confined to the walls of a classroom or restricted by geographical boundaries. We envisioned a platform that could bridge these gaps and empower individuals from all walks of life to unlock their full potential.
           </p>
        </div>

        <img src={FoundingStory} alt="" />

        </div>
      </section>

      {/* section 4 */}
      <section className='mt-44 mb-7'>
        <div className='w-11/2 max-w-[1260px] flex justify-around'>
          <div className='w-[40%]'>
             <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 via-blue-500 to-blue-700 bg-clip-text text-transparent">Our Vision</h1>
             <p className='text-[#C5C7D4] opacity-80'>With this vision in mind, we set out on a journey to create an e-learning platform that would revolutionize the way people learn. Our team of dedicated experts worked tirelessly to develop a robust and intuitive platform that combines cutting-edge technology with engaging content, fostering a dynamic and interactive learning experience.</p>
          </div>
          <div className='w-[40%]'>
             <h1 className="text-4xl font-bold bg-gradient-to-r from-orange-400 via-orange-500 to-orange-700 bg-clip-text text-transparent"> Our Mission</h1>
             <p className='text-[#C5C7D4] opacity-80'>Our mission goes beyond just delivering courses online. We wanted to create a vibrant community of learners, where individuals can connect, collaborate, and learn from one another. We believe that knowledge thrives in an environment of sharing and dialogue, and we foster this spirit of collaboration through forums, live sessions, and networking opportunities.</p>
          </div>
        </div>
      </section>

      {/* section 4 */}
      <section className='w-full mt-7 mb-6'>
        <StatsComponent></StatsComponent>
      </section>

      {/* section 5 */}
      <section className='mt-10 mb-11'>
        <LearningGrid></LearningGrid>
      </section>
      

      {/* section 6 form */}
      <section className='mt-16 mb-20'>
        <ContactFormSection></ContactFormSection>
      </section>


      {/* last section */}
      <Footer></Footer>
    </div>
  )
}

export default About
