import React, { useEffect, useState } from 'react'
import { UserContext } from '../context/UserContext'
import { useContext } from 'react'
import OtpInput from '../components/OtpInput'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import { assets } from '../assets/assets'


function EmailVerify() 
{
  const length = import.meta.env.VITE_OTP_LENGTH
  const {userData, url, isLoggedIn} = useContext(UserContext)
  const navigate = useNavigate()
  const [otp, setOtp] = useState(new Array(length).fill(''))
  axios.defaults.withCredentials = true

  async function submitHandler(event)
  {
      event.preventDefault()
      console.log(userData.otpVerify)


      const {data} = await axios.post(url + "/verify-otp", {otp: userData.otpVerify})

      if (data.success)
      { 
          toast.success(data.message)
          navigate("/")
      }

      else
      { toast.error(data.message) }
  }

  async function sendOtp() 
  {
      const {data} = await axios.post(url + "/send-verify-otp", {email: userData.email})
      
      if (data.success)
      {
          toast.success(data.message)
      }

      else
      {
          toast.error(data.message)
      }
  }

  useEffect(()=>
  {
    if (isLoggedIn && userData && userData.isVerified)
    {
      navigate("/")
      toast.success("Email already verified!")
    }
  })

  useEffect(()=>
  {
    // console.log(otp)
    const otpString = otp.join("")

    if (otpString.length === length)
      userData.otpVerify = otpString
  }, [otp])


  return (
    <div className='bg-[#748F80] h-screen flex justify-center items-center relative'>

    <img onClick={()=> navigate("/")} src={assets.logo} className='absolute top-8 left-8 w-28 bg-[#E1EACD] px-3 py-1 drop-shadow-lg border-0 rounded-md hover:cursor-pointer' />


      <form className='bg-white p-5 rounded-2xl flex flex-col items-center justify-center shadow-2xl'>
        
        <h1 className='text-3xl font-semibold text-[#01352C]'>Verify Email</h1>
        <h3 className='text-sm mt-3 font-medium'>Enter the 6 digit code sent to <span className='text-[#01352C] px-2 py-1 border-0 rounded-full shadow-lg inset-shadow-sm'>{userData.email}</span> </h3>

        <OtpInput length={length} otp={otp} setOtp={setOtp}/>

        <button onClick={submitHandler} className='mt-4 border px-4 py-1 rounded-xl w-7/10 bg-[#01352C] text-white hover:cursor-pointer'>Verify Email</button>
        <h3 onClick={sendOtp} className='font-medium w-full text-sm mt-3 hover:cursor-pointer'><i className="fa-solid fa-paper-plane"></i> &nbsp; Resend OTP</h3>

        {/* <h3>Resend OTP in {Date.now() - userData.otpVerifyExpires}</h3> */}


      </form>

    </div>
  )
}

export default EmailVerify
