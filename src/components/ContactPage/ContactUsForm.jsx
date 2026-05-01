import React, { useEffect, useState } from 'react'
import {useForm} from 'react-hook-form'
import CountryCode from '../../data/countrycode.json'

const ContactUsForm = () => {
    const [loading,setLoading]=useState(false)

    const SubmitContactForm=async(data)=>{
       console.log("logging data",data);

       try{
         setLoading(true);
        //  const response=await apiConnector("POST",contactusEndPoint.CONTACT_US_API,data);
        const response='OK';
         console.log("response data:",response);
         setLoading(false);
       }
       catch(err){
       console.log(err.message)
       setLoading(false)
       }
    }
    const{
        register,
        handleSubmit,
        reset,
        formState:{errors,isSubmitSuccessful}
    }=useForm();

    useEffect(()=>{
        if(isSubmitSuccessful){
            reset({
                email:"",
                firstname:"",
                lastname:"",
                message:"",
                phoneNo:"",
            })
        }
    },[reset,isSubmitSuccessful]);
  return (
   <form onSubmit={handleSubmit(SubmitContactForm)} className='text-white flex flex-col gap-7  '>

    <div className='flex gap-4' >
        {/* firstame */}
        <div className='flex flex-col gap-1'>
            <label htmlFor="firstname">First Name</label>
            <input type="text"
            name='firstname'
            id='firstname'
            placeholder='Enter first name'
            {...register('firstname',{required:true})}
            className='bg-[#01212A] px-4 py-1 rounded-sm'
            />
            {
                errors.firstname && (
                    <span>
                        Please enter your name
                    </span>
                )
            }
        </div>

        {/* last name */}
        <div className='flex flex-col gap-1'>
            <label htmlFor="lastname">First Name</label>
            <input type="text"
            name='lastname'
            id='lastname'
            placeholder='Enter last name'
            {...register('lastname')}
            className='bg-[#01212A] px-4 py-1 rounded-sm'
            />
        </div>
    </div>

    {/* email */}
    <div className='flex flex-col gap-1'>
        <label htmlFor="email">Email</label>
        <input type="email"
        name='email'
        placeholder='Enter your email'
        id='email'
        {...register('email',{required:true})}
         className='bg-[#01212A] px-4 py-1 rounded-sm'
        />
        {
            errors.email &&(
                <span>Plese enter your email</span>
            )
        }
    </div>

    {/* phone no */}
    <div className='flex flex-col'>
        <label htmlFor="phoneNo">Phone number</label>
        <div className='flex gap-3 items-center'>
            {/* dropdown */}
            <div>
                <select 
                className='bg-[#01212A] text-white py-1 w-[70px] rounded-sm'
                name='dropdown'
                id='dropdown'
                {...register('countrycode',{required:true})}

                >
                {
                    CountryCode.map((element,index)=>{
                        return <option key={index} value={element.code}>
                         {element.code}
                        </option>
                    })
                }
                </select>
            </div>

            <div className='w-full'>
                <input
                type='phonenumber'
                name='phoneNo'
                id='phoneNo'
                placeholder='123456789'
                {...register('phoneNo',{required:{value:true,message:"please enter phone number"},
                    maxLength:{value:10 ,message:"Invalid phone number",
                    minLength:{value:8,message:"invalid phone number"}
                    }
                })}
                className='bg-[#01212A]  px-4 py-1 rounded-sm w-full'
                />
                {
                    errors.phoneNo && (
                       <span>
                        {errors.phoneNo.message}
                       </span>
                    )
                }
            </div>
        </div>

    </div>

    {/* message */}
    <div className='flex flex-col'>
        <label htmlFor="message">Message</label>
        <textarea name="message" id="message" cols={30} rows={7} placeholder='Enter your message here' 
        {...register('message',{required:true})}
        className='bg-[#01212A] px-4 py-1 rounded-sm'
        >
            {
                errors.message && (
                   <span>Enter your message</span>
                )
            }
        </textarea>
    </div>
    <div className='flex items-center justify-center'>
       <button type='submit' className=' w-fit px-2 py-2 bg-yellow-400 text-center px-6 py-3 font-bold text-black'>
       Send message
    </button>
    </div>

    
   </form>
  )
}

export default ContactUsForm
