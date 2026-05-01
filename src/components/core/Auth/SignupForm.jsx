import React, { useState } from 'react'
import Tab from '../../common/Tab'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { ACCOUNT_TYPE } from '../../../../utils/constants'
import { setSignupData } from '../../../slices/authSlice'
import {AiOutlineEyeInvisible,AiOutlineEye} from 'react-icons/ai'
import {toast} from 'react-hot-toast'
import { sendOtp } from '../../../services/operations/authApi'
const SignupForm = () => {
    
    const navigate=useNavigate()
    const dispatch=useDispatch()
    const [accountType,setAccountType]=useState(ACCOUNT_TYPE.STUDENT)
    
    
    const [formData,setFormData]=useState({
        firstName:"",
        lastName:"",
        email:"",
        contactNumber:"",
        password:"",
        confirmPassword:"",
    })


    const [showPassword,setShowPassword]=useState(false)

   const [showConfirmPassword,setShowConfirmPassword]=useState(false)

   const {firstName,lastName,email,contactNumber,password,confirmPassword}=formData

   const handleOnChange=(event)=>{
    setFormData((prevData)=>(
        {
            ...prevData,
            [event.target.name]:event.target.value
        }
    ))
   }

   const handleOnSubmit=(event)=>{
     event.preventDefault()
     if(password!=confirmPassword){
        toast.error("password is incorrect")
        return
     }
     const signupData={
        ...formData,
        accountType
     }
     dispatch(setSignupData(signupData))
     dispatch(sendOtp(formData.email,navigate))

     //reset
     setFormData({
       firstName:"",
        lastName:"",
        email:"",
        contactNumber:"",
        password:"",
        confirmPassword:"",
     })
     setAccountType(ACCOUNT_TYPE.STUDENT)

   }
    const tabData=[
         {
          id:1,
          tabName:"Student",
          type:ACCOUNT_TYPE.STUDENT,
         },
         {
           id:2,
           tabName:"Instructor",
           type:ACCOUNT_TYPE.INSTRUCTOR,
         }
    ]
  return (
    <div className='flex flex-col gap-1'>
        <Tab tabData={tabData} field={accountType} setField={setAccountType}></Tab>
    <form onSubmit={handleOnSubmit} >
         <div className='flex flex-col gap-3'>
           
       <div className='flex gap-5'>
        <div>
            <p className='text-[#F1F2FF]'>FirstName <sup className="text-pink-700">*</sup></p>
            <input
            required
            type='text'
            name='firstName'
            value={firstName}
            onChange={handleOnChange}
            placeholder='Enter first Name'
             className=' text-white rounded w-full py-2 bg-[#161D29]' />
        </div>

         <div>
            <p className='text-[#F1F2FF]'>LastName <sup className="text-pink-700">*</sup></p>
            <input
              required
              name='lastName'
              type='text'
              value={lastName}
              onChange={handleOnChange}
              placeholder='Enter last name'
            className=' text-white  rounded w-full py-2 bg-[#161D29]' />
        </div>
       </div>
       <div>
           <p className='text-[#F1F2FF]'>Email Address <sup className="text-pink-700">*</sup></p>
       <input
        type="text"
        required
        name='email'
        value={email}
        onChange={handleOnChange}
        placeholder='Enter Your Email'
       
       className=' text-white  rounded w-full py-2 bg-[#161D29]' />
       </div>
     
          <div>
              <p className='text-[#F1F2FF]'>Phone Number</p>
              <div>
                 <input
                  type="text"
                  name='contactNumber'
                  value={contactNumber}
                  onChange={handleOnChange}
                  className=' text-white  rounded w-full py-2 bg-[#161D29]' />
              </div>
          </div>

          <div className='flex gap-5'>
            <div className='relative'>
                <p className='text-[#F1F2FF]'>Create Password <sup className="text-pink-700">*</sup></p>
                <input 
                
                type= {showPassword?"password":"text"
                }
                name='password'
                value={password}
                onChange={handleOnChange}
                placeholder='Enter password'
                
                className=' text-white  rounded w-full py-2 bg-[#161D29]'/>

                 <span
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute right-3 top-[38px] z-[10] translate-y-[-4px] cursor-pointer"
            >
              {showPassword ? (
                <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
              ) : (
                <AiOutlineEye fontSize={24} fill="#AFB2BF" />
              )}
            </span>
            </div>
            <div className='relative' >
                <p className='text-[#F1F2FF]'>Confirm Password <sup className="text-pink-700">*</sup></p>
                <input 
                type= {showConfirmPassword?"password":"text"
                }
                name='confirmPassword'
                value={confirmPassword}
                onChange={handleOnChange}
                placeholder='confirm password'

                className=' text-white  rounded w-full py-2 bg-[#161D29]' />

                                 <span
              onClick={() => setShowConfirmPassword((prev) => !prev)}
              className="absolute right-3 top-[38px] z-[10] cursor-pointer translate-y-[-3px]"
            >
              {showConfirmPassword ? (
                <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
              ) : (
                <AiOutlineEye fontSize={24} fill="#AFB2BF" />
              )}
            </span>

            </div>
            </div>      
    </div>
    <button type='submit' className='w-full bg-yellow-300 py-2 rounded-md mt-3'>
        Sign Up
    </button>
    </form>
    </div>
    
   
  )
}

export default SignupForm
