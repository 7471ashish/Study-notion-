import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import OTPInput from 'react-otp-input'
import { sendOtp } from '../services/operations/authApi';
import { useNavigate } from 'react-router-dom';
import {Link} from 'react-router-dom'
import { signUp } from '../services/operations/authApi';

const VerifyEmail = () => {
    const {signupData,loading}=useSelector((state)=>state.auth);
    const [otp,setOtp]=useState("");
    const dispatch=useDispatch();
    const navigate=useNavigate();

    useEffect(()=>{
        if(!signupData){
            navigate('/Signup');
        }
    },[])

    const handleOnSubmit=(event)=>{
        event.preventDefault();
        const{ accountType,
  firstName,
  lastName,
  email,
  password,
  confirmPassword,
  contactNumber,
 }=signupData;
     dispatch(signUp({
  accountType,
  firstName,
  lastName,
  email,
  password,
  confirmPassword,
  contactNumber,
  otp,
}, navigate))
    }
  return (
    <div className='flex flex-col items-center justify-center h-full w-full mx-auto my-auto'>
      {
        loading?(<div>loading...</div>):(
        <div className='flex flex-col gap-8'>

            <h1 className='text-4xl text-[#DBDDEA]'>Verify Email</h1>
            <p className='text-[#DBDDEA]'>A verification code has been sent to you. Enter the code below</p>
            <form onSubmit={handleOnSubmit} className='flex flex-col gap-5'>

                <OTPInput
  value={otp}
  onChange={setOtp}
  numInputs={6}
  renderSeparator={<span className="text-white">-</span>}
  renderInput={(props) => (
    <input
      {...props}
      className="w-12 h-12 mx-1 text-xl text-white bg-[#161D29] border border-gray-500 rounded-md text-center focus:outline-none focus:border-yellow-400"
    />
  )}
/>

                <button type='submit' className='bg-yellow-300 w-full py-2 rounded-md'>
                     Verify Email
                </button>
            </form>

            <div>
                <div>
                     <Link to='/login'>
                Back to login
                </Link>
                </div>

                <button onClick={()=>dispatch(sendOtp(signupData.email,navigate))} className='blue'>
                    Resend it
                </button>
              
            </div>
        </div>)
      }
    </div>
  )
}

export default VerifyEmail
