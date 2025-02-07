import React, { useContext, useEffect, useState } from 'react'
import InputField from '../components/InputField'
import OtpInput from '../components/OtpInput'
import { UserContext } from '../context/UserContext'
import axios from 'axios'
import { toast } from 'react-toastify'
import { Navigate, useNavigate } from 'react-router-dom'
import { assets } from '../assets/assets'



function ResetPassword() {

  const length = import.meta.env.VITE_OTP_LENGTH
  const {userData, url} = useContext(UserContext)
  const [email, setEmail] = useState()
  const [password, setPassword] = useState()
  const [otp, setOtp] = useState(new Array(length).fill(''))
  const [otpString, setOtpString] = useState()
  const navigate = useNavigate()

  const [isOtpSent, setIsOtpSent] = useState(false)
  const [isOtpVerified, setIsOtpVerified] = useState(false)
  axios.defaults.withCredentials = true

  async function sendOtp(event)
  {
    event.preventDefault()
    const {data} = await axios.post(url + "/send-reset-otp", {email})
    // const 

    if (data.success)
    {
      toast.success(data.message)
      setIsOtpSent(true)
    }

    else
      toast.error(data.message)
  }

  async function verifyOtp (event) 
  {
    event.preventDefault()
    console.log(otpString)

    setIsOtpVerified(true)
  }

  async function submitHandler (event) 
  {
    event.preventDefault()
    console.log(password, otpString)

    const {data} = await axios.post(url + "/reset-password", {email, otp: otpString, newPassword: password})
    
    if (data.success)
    {
      toast.success(data.message)
      navigate("/login")
    }

    else
    {
      toast.error(data.message)
      setIsOtpVerified(false)
    }

  }

  useEffect(()=>
  {
    setOtpString(otp.join(""))
  }, [otp])



  return (
    <div className='bg-[#748F80] h-screen flex justify-center items-center relative'>
      
    <img onClick={()=> navigate("/")} src={assets.logo} className='absolute top-8 left-8 w-28 bg-[#E1EACD] px-3 py-1 drop-shadow-lg border-0 rounded-md hover:cursor-pointer' />



      {/* Email form */}
  {!isOtpSent && 
      <form onSubmit={sendOtp} className='bg-white p-5 rounded-2xl flex flex-col items-center justify-center shadow-2xl'>
        
        <h1 className='text-3xl font-semibold text-[#01352C]'>Reset Password</h1>
        <h3 className='text-sm mt-2 font-medium'>Enter your registered email </h3>

        <InputField setState={setEmail} icon={"fa-regular fa-envelope"} type={"email"} placeholder={"Email"} />
        <button  className='mt-4 border px-4 py-1 rounded-xl w-7/10 bg-[#01352C] text-white hover:cursor-pointer'>Send OTP</button>

      </form>
  }


      {/* OTP form */}
  {isOtpSent && !isOtpVerified &&
      <form onSubmit={verifyOtp} className='bg-white p-5 rounded-2xl flex flex-col items-center justify-center shadow-2xl'>
        
        <h1 className='text-3xl font-semibold text-[#01352C]'>Reset Password OTP</h1>
        <h3 className='text-sm mt-2 font-medium'>Enter OTP sent to your email </h3>

        <OtpInput length={6} otp={otp} setOtp={setOtp}/>
        <button  className='mt-4 border px-4 py-1 rounded-xl w-7/10 bg-[#01352C] text-white hover:cursor-pointer'>Verify OTP</button>
        <h3 onClick={sendOtp} className='font-medium w-full text-sm mt-2 hover:cursor-pointer'><i className="fa-solid fa-paper-plane"></i> &nbsp; Resend OTP</h3>

      </form>
  }


      {/* New password form */}
  {isOtpSent && isOtpVerified &&
      <form onSubmit={submitHandler} className='bg-white p-5 rounded-2xl flex flex-col items-center justify-center shadow-2xl'>
        
        <h1 className='text-3xl font-semibold text-[#01352C]'>New Password</h1>
        <h3 className='text-sm mt-2 font-medium'>Enter your new password</h3>

        <InputField setState={setPassword} icon={"fa-solid fa-lock"} type={"password"} placeholder={"New Password"} />
        <button  className='mt-4 border px-4 py-1 rounded-xl w-7/10 bg-[#01352C] text-white hover:cursor-pointer'>Submit</button>

      </form>
  }

    </div>
  )
}

export default ResetPassword
