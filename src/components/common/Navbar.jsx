import React, { useEffect, useState } from 'react'
import logo from "../../assets/Logo/Logo-Full-Light.png"
import {Link, matchPath} from 'react-router-dom'
import {NavbarLinks} from '../../data/navbar-links'
import { useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { CiShoppingCart } from "react-icons/ci";
import ProfileDropDown from '../core/Auth/ProfileDropDown'
import { apiConnector } from '../../services/apiconnector'
import { categories } from '../../services/apis'
import { FaArrowCircleDown } from "react-icons/fa";


// const subLinks=[
//   {
//     'title':"python",
//     "link":'/catalog/pyhton'
//   },
//     {
//     'title':"web_dev",
//     "link":'/catalog/web_dev'
//   },
// ]
const navbar = () => {

  const{token}=useSelector((state)=>state.auth);
  const{user}=useSelector((state)=>state.profile);
  const{totalItems}=useSelector((state)=>state.cart);


  const [subLinks,setSubLinks]=useState([]);

  const fetchSublinks= async()=>{
          try{
            const result=await apiConnector('GET',categories.CATEGORIES_API);
            console.log("printing sublinks results",result);
            setSubLinks(result.data.data);
          }
          catch(err){
            console.log("Could not fetch the category list")
          }
        }
  
  useEffect(()=>{
      fetchSublinks();
  },[])

  const location=useLocation()
  const matchRoute=(route)=>{
     return matchPath({path:route},location.pathname);
  }
  return (
    <div className='flex justify-center items-center bg-[#000814] h-14 border-b-[1px] border-white'>
        <div className='flex w-11/12 max-w-[1260px] items-center justify-between'>
           <Link to='/'>
              <img src={logo} alt="" />
           </Link>

           <div className='flex justify-center items-center gap-5'>
              {
                NavbarLinks.map((link,index)=>{
                  return (
                      <div key={index}>
                        {
                          link.title==='Catalog'?(
                            <div className='flex relative items-center text-[#DBDDEA] gap-2 group'>
                              <p className="text-[#DBDDEA]">{link.title}</p>
                              <FaArrowCircleDown />

                              <div className='invisible absolute left-[50%] top-[50%] translate-x-[-50%] translate-y-[50%] flex flex-col rounded-md bg-[#F1F2FF] p-4 text-[#000814] opacity-0 transsition-all duration-200 group-hover:visible group-hover:opacity-100 lg:w-[300px] z-1'>

                                 
                                 <div className='absolute left-[50%] top-0 h-6 w-6 rotate-45 rounded bg-[#F1F2FF]  translate-y-[-45%] translate-x-[80%]'>
                                 </div>
                                 {
                                  subLinks.length?(
                                    
                                      subLinks.map((sublink,index)=>(
                                       <Link to={`${sublink.link}`} key={index}>
                                             <p className='text-center font-bold'>{sublink.title}</p>
                                       </Link>
                                      ))
                                    
                                  ):(
                                    <div>No categories created</div>
                                  )
                                 }
                              </div>
                            </div>
                          ):(<Link to={link?.path}>
                            <p className={`${matchRoute(link?.path)?'text-yellow-400':"text-[#DBDDEA]"}`}>
                              {link.title}
                            </p>
                          </Link>)
                        }
                      </div>
                  )
                })
              }
           </div>



           {/* login signup dashboard */}
           <div className='flex gap-x-4 items-center'>
              {
                user!=null && user?.accountType!='Instructor' &&(
                  <Link to='/dashboard/cart' className='relative'>
                  <CiShoppingCart/>
                  {
                    totalItems>0 &&(
                      <span>
                        {totalItems}
                      </span>
                    )
                  }
                  </Link>
                )
              }

              {
                token===null &&(
                  <Link to='/login'> 
                  <button  className='border-[#2C333F]  bg-[#161D29] text-[#AFB2BF] py-[8px] px-[12px] rounded-md'>
                    Log In
                  </button>
                  </Link>
                )
              }

               {
                token===null &&(
                  <Link to='/Signup'> 
                  <button className='border-[#2C333F]  bg-[#161D29] text-[#AFB2BF] py-[8px] px-[12px] rounded-md'>
                    Sign Up
                  </button>
                  </Link>
                )
              }

              {
                token!==null &&(
                  <ProfileDropDown></ProfileDropDown>
                )
              }
           </div>
        </div>
      
    </div>
  )
}

export default navbar
