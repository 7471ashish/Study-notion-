import React, { useState } from 'react'
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai"
import { TbPassword } from 'react-icons/tb'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { login } from '../../../services/operations/authApi'
import Tab from '../../common/Tab'

const LoginForm = () => {
      const navigate = useNavigate()
  const dispatch = useDispatch()
    const [showPassword,setShowPassword]=useState(false)
    const [formData,setFormData]=useState({
        email:"",
        password:""
    })
 const { email, password } = formData
      const handleOnSubmit = (e) => {
    e.preventDefault()
    dispatch(login(email, password, navigate))
  }
    
    const handleOnChange=(event)=>{
       setFormData((prevData)=>(
        {
            ...prevData,
            [event.target.name]:event.target.value,
        }
       ))
    }
  return (
    <div className='flex flex-col gap-2' >
      <form onSubmit={handleOnSubmit} className='flex flex-col gap-3'>

        <div>
           <p className='text-[#F1F2FF]'>Email Address <sup className="text-red-800">*</sup></p>
        <input
          required
        type="text"
        name='email'
        value={email}
        onChange={handleOnChange}
        placeholder='Enter Email Address' 
        className='text-white rounded w-full py-2 bg-[#161D29]'
        />
        </div>
       

       <div className='relative'>
          <p className='text-[#F1F2FF] '>
          Password <sup className="text-red-800">*</sup>
        </p>
         <input
         required
         type={showPassword?'text':'password'}
         name='password'
         value={password}
         onChange={handleOnChange}
         placeholder='Enter password' 
        className='text-white rounded w-full py-2 bg-[#161D29]'
        />
         <span
          onClick={() => setShowPassword((prev) => !prev)}
          className="absolute right-3 top-[38px] z-[10] cursor-pointer"
        >
          {showPassword ? (
            <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
          ) : (
            <AiOutlineEye fontSize={24} fill="#AFB2BF" />
          )}
        </span>

        <Link to="/forgot-password">
          <p className="mt-1 ml-auto max-w-max text-xs text-blue-100">
            Forgot Password
          </p>
        </Link>
        
       </div>

        <button
        type="submit"
        className="mt-6 rounded-[8px] bg-yellow-500 py-[8px] px-[12px] font-medium text-[#000814]"
      >
        Log In
      </button>

      </form>
    </div>
  )
}

export default LoginForm
