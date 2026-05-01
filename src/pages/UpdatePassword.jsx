import React, { useState } from 'react'
import {useDispatch, useSelector} from 'react-redux' 
import {Link, useLocation} from 'react-router-dom'
import {AiOutlineEyeInvisible,AiOutlineEye} from 'react-icons/ai'
import { resetPassword } from '../services/operations/authApi'
const UpdatePassword = () => {
    const [showPassword,setShowPassword]=useState(false)
    const {loading}=useSelector((state)=>state.auth)
    const dispatch=useDispatch()
    const location=useLocation()

    const [formData,setFormData]=useState({
        password:"",
        confirmPassword:"",
    })
    const [showConfirmPassword,setShowConfirmPassword]=useState(false);

    const {password,confirmPassword}=formData;

    const handleOnChange=(event)=>{
        setFormData((prevData)=>(
            {
                ...prevData,
                [event.target.name]:event.target.value
            
            }
        ))
    }

    const handleOnSubmit=(event)=>{
       event.preventDefault();
       const token=location.pathname.split('/').at(-1);
       dispatch(resetPassword(password,confirmPassword,token));
    }
  return (
    <div className='flex flex-col items-center justify-center h-full w-full'>
        {
            loading?(
                <div>
                    loading...
                </div>
            ):(
                <div className='flex flex-col gap-8'>
                    <h1 className='text-4xl text-[#DBDDEA]'>Choose Your password</h1>
                    <p className='text-[#DBDDEA]'>Almost done.Enter your new passowrd and you are set to go</p>
                    <form onSubmit={handleOnSubmit} className='flex flex-col gap-5'>

                        <label className='relative'>
                            <p className='text-[#DBDDEA]' >New Password</p>
                            <input
                            required
                            type={
                                showPassword?'text':'password'
                            }
                            name='password'
                            value={password}
                            onChange={handleOnChange}
                            className='bg-[#2C333F] py-2 w-full rounded-md text-white'
                            />
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
                        </label>

                         <label className='relative'>
                            <p className='text-[#DBDDEA]' >Confirm New Password</p>
                            <input
                            required
                            type={
                                showConfirmPassword?'text':'password'
                            }
                            name='confirmPassword'
                            value={confirmPassword}
                            onChange={handleOnChange}
                            className='bg-[#2C333F] py-2 w-full rounded-md text-white'
                            />
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
                        </label>

                        <button className='bg-yellow-300 w-full py-2 rounded-md'>
                            Reset Password
                        </button>
                    </form>
                    <Link to='/login'>
                    <p className='text-blue-500'>Back to login</p>
                    </Link>
                </div>
            )
        }
    </div>
  )
}

export default UpdatePassword
