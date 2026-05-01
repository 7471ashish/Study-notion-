import {toast} from 'react-hot-toast'
import {setLoading,setToken} from "../../slices/authSlice"
import { endpoints } from '../apis'
import { apiConnector } from '../apiconnector'
import {setUser} from '../../slices/profileSlice'
import { replace } from 'react-router-dom'
import {resetCart} from '../../slices/cartSlice'


const {
  SENDOTP_API,
  SIGNUP_API,
  LOGIN_API,
  RESETPASSTOKEN_API,
  RESETPASSWORD_API,
} = endpoints


export function sendOtp(email, navigate) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...")
    dispatch(setLoading(true))
    try {
      const response = await apiConnector("POST", SENDOTP_API, {
        email,
        checkUserPresent: true,
      })
      console.log("SENDOTP API RESPONSE............", response)

      console.log(response.data.success)

      if (!response.data.success) {
        throw new Error(response.data.message)
      }

      toast.success("OTP Sent Successfully")
      navigate("/verify-email")
    } catch (error) {
      console.log("SENDOTP API ERROR............", error)
      toast.error("Could Not Send OTP")
    }
    dispatch(setLoading(false))
    toast.dismiss(toastId)
  }
}


export function login(email,password,navigate){
  return async(dispatch)=>{
    const toastId=toast.loading('Loading...')
    dispatch(setLoading(true))

    try{
      const response=await apiConnector('POST',LOGIN_API,{
        email,password
      })
      console.log('Login api response......',response)
      console.log("DATA:", response.data)

      if(!response.data.success){
        throw new Error(response.data.message)
      }
      toast.success('Login successful')
      dispatch(setToken(response.data.token))
     const user = response.data.existingUser; // 👈 sabse important

const userImage = user?.image 
  ? user.image 
  : `https://api.dicebear.com/5.x/initials/svg?seed=${user.firstName} ${user.lastName}`;

dispatch(setUser({ ...user, image: userImage }));
      localStorage.setItem("token", JSON.stringify(response.data.token))
      localStorage.setItem("user", JSON.stringify(user))
      navigate('/dashboard/my-profile')
    }
    catch(error){
      console.log('Login api error',error)
      toast.error('Login failed')
    }
    dispatch(setLoading(false))
    toast.dismiss(toastId)
  }
}


export function signUp(
 data,
  navigate
){
  return async(dispatch)=>{
    const toastid=toast.loading('Loading...')
    dispatch(setLoading(true))
    const {
  accountType,
  firstName,
  lastName,
  email,
  password,
  confirmPassword,
  contactNumber,
  otp,
} = data;

    try{
       const response=await apiConnector('POST',SIGNUP_API,{
         accountType,
        firstName,
        lastName,
        email,
        password,
        confirmPassword,
        contactNumber,
        otp,
       })
       console.log("Sign up api Response......",response)
       if(!response.data.success){
        throw new Error(response.data.message)
       }
       toast.success('Signup successful')
       navigate('/login')
    }
    catch(err){
      console.log('error is coming:',err.response?.data)
      toast.error("Sign up failed")
      navigate('/signup')
    }
    dispatch(setLoading(false))
    toast.dismiss(toastid)

  }
}


export function getPasswordResetToken(email,setEmailSent){
  return async(dispatch)=>{
    dispatch(setLoading(true))
    try{
    const response=await apiConnector("POST",RESETPASSTOKEN_API,{email})
    
    console.log("reset password token response: ",response)
    if(!response.data.success){
      throw new Error(response.data.message)
    }
    toast.success("Reset Email Sent")
    setEmailSent(true);

    }
    catch(err){
       console.log('RESET PASSWORD TOKEN ERROR',err)
       toast.error("failed to send email for resting the password")
    }
    dispatch(setLoading(false));
  }
}


export function resetPassword(password,confirmPassword,token){
  return async(dispatch)=>{
    dispatch(setLoading(true))
    try{
      const response=await apiConnector("POST",RESETPASSWORD_API,{password,confirmPassword,token});
      console.log("reset password response...",response);
      if(!response.data.success){
        throw new ERROR(response.data.message)
      }

      toast.success("Password has been reset successfully");
    }
    catch(err){
      console.log("error is coming in reset password",err);
      toast.error("Failed to reset the password")
    }
    dispatch(setLoading(false))
  }
}


export function logout(navigate) {
  return (dispatch) => {
    dispatch(setToken(null))
    dispatch(setUser(null))
    dispatch(resetCart())
    localStorage.removeItem("token")
    localStorage.removeItem("user")
    toast.success("Logged Out")
    navigate("/",{replace:true})
   console.log("Logout clicked")
console.log("Navigating to home")
  }
}