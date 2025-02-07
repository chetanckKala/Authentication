import React from 'react'
import { assets } from '../assets/assets'
import { useNavigate } from 'react-router-dom'
import { UserContext } from '../context/UserContext'
import { useContext } from 'react'
import axios from 'axios'


const Header = () => {

  const navigate = useNavigate()
  const {userData} = useContext(UserContext)

  
  

  return (
    <div className='flex flex-col items-center justify-center h-screen'>

        <img className='w-50 drop-shadow-2xl' src={assets.header_img} alt="" />
        <h2 className='flex gap-2 text-xl items-center'>Hey &nbsp; 
          {userData ? userData.username : 'Developer'}
          <img className='w-6' src={assets.hand_wave} alt="" /></h2>  
        <h1 className='mt-2 text-4xl font-semibold'>Welcome to Auth</h1>
        <h2 className='mt-2 w-7/10 text-center'>Let's start you on a quick tour and we will have you up and running on time!</h2>
        <button onClick={()=> navigate("/signup")} className='mt-4 border-0 outline-none px-4 py-1 rounded-xl bg-[#01352C] text-white hover:cursor-pointer'>Get Started &nbsp; <i className="fa-solid fa-arrow-right"></i></button>

    </div>
  )
}

export default Header
