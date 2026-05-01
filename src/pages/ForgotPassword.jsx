import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {Link} from 'react-router-dom'
import { getPasswordResetToken } from '../services/operations/authApi'
import { FaLongArrowAltLeft } from "react-icons/fa";

const ForgotPassword = () => {
    const {loading}=useSelector((state)=>state.auth);
    const[email,setEmail]=useState("")
    const dispatch=useDispatch()
    const [emailSent,setEmailSent]=useState(false);

    const handleOnSubmit=(event)=>{
        event.preventDefault()
        dispatch(getPasswordResetToken(email,setEmailSent));
    }
  return (
    <div className='text-white flex flex-col items-center justify-center  w-[40%] mx-auto my-auto min-h-screen'>
      {
        loading?(
            <div>
                Loading...
            </div>
        )
        :(
            <div className='flex flex-col  gap-9 mx-auto my-auto'>
                <h1 className='text-4xl text-[#F1F2FF] font-semibold'>
                    {
                        emailSent?("Check Your Email"):("Resst Your Password")
                    }
                </h1>

                <p className=' text-[#F1F2FF]'>
                    {
                        !emailSent?"Have no fear. We’ll email you instructions to reset your password. If you dont have access to your email we can try account recovery":`We have sent the reset email to ${email}`
                    }
                </p>

                <form onSubmit={handleOnSubmit} className='w-[50%] flex flex-col gap-5'>
                    {
                        !emailSent && (
                            <label className='flex flex-col'>
                                <p>Email Address</p>
                                <input
                                required
                                type='email'
                                name='email'
                                value={email}
                                onChange={(e)=>{
                                    setEmail(e.target.value)
                                }}
                                placeholder='Enter your Email'
                                className='text-white bg-[#2C333F] py-2 px-2'
                                />
                            </label>
                        )
                    }

                    <button type='submit' className='bg-amber-400 text-black w-full py-2 rounded-md'>
                        {
                            !emailSent?"ResetPassword":"Resend Email"
                        }
                    </button>
                </form>

                <div>
                    <Link to='/login'>
                   <p className='text-blue-600'><span><FaLongArrowAltLeft /></span> Back to login</p> 
                    </Link>
                </div>
            </div>
        )
      }
    </div>
  )
}

export default ForgotPassword
