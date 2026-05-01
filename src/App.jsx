  import { useState } from 'react'
  import {Route,Routes} from  "react-router-dom"
  import './App.css'
  import Home from './pages/Home'
  import Navbar from './components/common/Navbar'
  import Login from './pages/Login'
  import Signup from './pages/Signup'
  import ForgotPassword from './pages/ForgotPassword'
  import UpdatePassword from './pages/UpdatePassword'
  import VerifyEmail from './pages/VerifyEmail'
  import About from './pages/About'
import Contact from './pages/Contact'
import MyProfile from './components/core/Dashboard/MyProfile'
import Dashboard from './pages/Dashboard'



  function App() {

    return (
    <div className="w-screen min-h-screen bg-[#000814] flex flex-col font-['Inter',sans-serif]">
      <Navbar></Navbar>
      <div className=' w-full min-h-screen'>
        <Routes>
        <Route path='/' element={<Home></Home>}></Route>
        <Route path='/login' element={<Login></Login>}></Route>
        <Route path='/Signup' element={<Signup></Signup>}></Route>
        <Route path='/forgot-password' element={<ForgotPassword></ForgotPassword>}></Route>
        <Route path="/update-password/:token" element={<UpdatePassword />} />
        <Route path='/verify-email' element={<VerifyEmail></VerifyEmail>}></Route>
        <Route path='/about' element={<About></About>}></Route>
        <Route path='/contact' element={<Contact></Contact>}></Route>
        <Route path='/dashboard/my-profile' element={<Dashboard></Dashboard>}></Route>
    </Routes>

      </div>
    
    </div>

    )
  }

  export default App
