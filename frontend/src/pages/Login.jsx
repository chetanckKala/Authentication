import React, { useState } from 'react'
import '../styles/style.css'
import { useNavigate } from 'react-router-dom'
import ImagePart from '../components/ImagePart'
import InputField from '../components/InputField'
import axios from 'axios'
import { useContext } from 'react'
import { UserContext } from '../context/UserContext'
import { toast } from 'react-toastify'
import {assets} from '../assets/assets.js'


function Login() {

    let [email, setEmail] = useState()
    let [password, setPassword] = useState()
    let navigate = useNavigate()
    let {url, isLoggedIn, setIsLoggedIn, userData, setUserData, getUserData} = useContext(UserContext)

    async function submitHandler(event) {
        event.preventDefault()
        axios.defaults.withCredentials = true

        const {data} = await axios.post(url + "/login", {email, password})
        
        if (data.success)
        {
            toast.success(data.message)
            setIsLoggedIn(true)
            getUserData()
            navigate('/')
        }

        else
        {
            toast.error(data.message)
        }
    }


    return (
      <div className='relative flex items-center justify-center h-screen bg-[#748F80]'>
          <img onClick={()=> navigate("/")} src={assets.logo} className='absolute top-8 left-8 w-28 bg-[#E1EACD] px-3 py-1 drop-shadow-lg border-0 rounded-md hover:cursor-pointer' />

          <div className='flex h-8/10 w-6/10 overflow-hidden border-0 rounded-2xl bg-white p-5'>

          {/* image part */}
          <ImagePart/>

          {/* form part */}
          <form onSubmit={submitHandler} className='md:w-5/10 w-10/10 flex flex-col justify-center items-center' action="">

              <h2 className='text-4xl mb-4 font-semibold text-[#01352C]'>Login</h2>
              <InputField setState={setEmail} icon={"fa-regular fa-envelope"} placeholder='Email' type='email' />
              <InputField setState={setPassword} icon={"fa-solid fa-lock"} placeholder='Password' type='password' />
  
              <p onClick={()=> navigate("/reset-password")} className='mt-4 text-xs text-left w-7/10 font-semibold hover:cursor-pointer' >Forgot Password?</p>
              <button className='mt-4 border px-4 py-1 rounded-xl w-7/10 bg-[#01352C] text-white hover:cursor-pointer'>Login</button>
              <p className='mt-2 text-xs text-left w-7/10' >Don't have an account? <span onClick={()=> navigate("/signup")} className='underline font-semibold hover:cursor-pointer'>Signup Here</span></p>

          </form>
          
          </div>   
      </div>
    )
}

export default Login
