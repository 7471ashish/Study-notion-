import React from 'react'
import { useSelector } from 'react-redux'
import frameImg from "../../../assets/Images/frame.png"
import LoginForm from './LoginForm'
import SignupForm from './SignupForm'
const Template = ({title,description1,description2,image,formType}) => {
    const {loading}=useSelector((state)=>state.auth)
  return (
    <div className='flex items-center justify-center mt-20'>
        {
            loading?(
                <div className='spinner'></div>
            ):(
             <div className='w-11/12 max-w-[1260px] flex items-center justify-center gap-40'>
                    <div className='flex flex-col w-[35%] gap-5'>
                         <div className='text-white text-4xl font-semibold'>
                            {title}
                         </div>

                         <div className='text-white'>
                            {description1}
                            <span className='text-blue-500'>
                                {description2}
                            </span>
                         </div>
                         {
                            formType==='signup'?<SignupForm></SignupForm>:<LoginForm></LoginForm>
                         }
                         
                    </div>
                    <div className='w-[40%] relative'>
                        <img src={frameImg} alt="" />
                        
                             <img src={image} alt="" className='absolute top-0 translate-x-[-20px] translate-y-[-20px]  z-10' />
                        
                    </div>
             </div>
            )
        }
              
    </div>
  )
}

export default Template
