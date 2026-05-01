import React from 'react'
import { TiMessages } from "react-icons/ti";
import { FaGlobeAmericas } from "react-icons/fa";
import { IoIosCall } from "react-icons/io";
import ContactUsForm from '../components/ContactPage/ContactUsForm';
import Footer from '../components/common/Footer';

const Contact = () => {
  return (
    <div className='w-full '>
        <div className='flex w-11/12 max-w-[1260px] mx-auto gap-8 mt-20 mb-10 justify-around'>
            <div className='flex flex-col bg-[#01212A] gap-8 text-white px-10 py-10 h-fit'>
                <div className='flex flex-col gap-1'>
                    <div className='flex text-2xl flex items-center gap-1'>
                      <TiMessages />
                       <h1>Chat on us</h1>
                    </div>
                    <p>Our friendly team is here to help you</p>
                    <p>@mail address</p>
                </div>

                <div className='flex flex-col gap-1'>
                     <div className='flex text-2xl flex items-center gap-1'>
                      <FaGlobeAmericas />

                       <h1>Visit us</h1>
                    </div>
                    <p>Come and say hello to aur office</p>
                    <p>Here is the location/address</p>
               
                </div>

                <div className='flex flex-col gap-1'>
                   <div className='flex text-2xl flex items-center gap-1'>
                     <IoIosCall />
                       <h1>Call us</h1>
                    </div>
                    <p>MON -FRI from 8AM to 5PM</p>
                    <p>+123 456 7890</p>
                </div>
            </div>
            <div>
            </div>

            <div className='w-[50%] flex flex-col gap-2 shadow-sm shadow-white px-3 py-3
            '>
                <h1 className='text-4xl font-semibold text-white'>Got a Idea? We’ve got the skills. Let’s team up</h1>
                <p className='text-white'>Tall us more about yourself and what you’re got in mind.</p>
                <ContactUsForm></ContactUsForm>
            </div>
        </div>
        <Footer></Footer>
    </div>
  )
}

export default Contact
