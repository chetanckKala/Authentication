import React, { useContext, useState } from 'react'
import {assets} from '../assets/assets.js'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'react-toastify'
import { UserContext } from '../context/UserContext.jsx'
import '../styles/style.css'


const Navbar = () => {

    const navigate = useNavigate()
    const {url, isLoggedIn, setIsLoggedIn, userData, setUserData} = useContext(UserContext)
    axios.defaults.withCredentials = true


    async function logout () 
    {
        const {data} = await axios.get(url + "/logout")

        if (data.success)
        {
            toast.success(data.message)
            setIsLoggedIn(false)
            setUserData(false)
            navigate('/')
        }

        else
        {
            toast.error(data.message)
        }
        
    }

    async function sendOtp() 
    {
        const {data} = await axios.post(url + "/send-verify-otp", {email: userData.email})
        
        if (data.success)
        {
            toast.success(data.message)
            navigate("/email-verify")
        }

        else
        {
            toast.error(data.message)
        } 
    }

    return (
        <div className='flex justify-between items-center p-8 absolute top-0 w-full mb-3'>
            
            <img onClick={()=> navigate("/")} src={assets.logo} className='w-28 bg-[#E1EACD] px-3 py-1 drop-shadow-lg border-0 rounded-md hover:cursor-pointer' />
            
            
            { isLoggedIn ?
                <div className='group relative flex justify-center items-center '>
                    <img className='w-12 aspect-square object-cover rounded-full border-2 p-0.5' src="https://cdn.dribbble.com/userupload/11893576/file/original-8e5ab17483c1b360c713dd7ac11dccf7.png?resize=1024x768&vertical=center" alt="" />
                    {userData.isVerified && <img className='w-4 absolute bottom-0 right-0' src='https://cdn-icons-png.flaticon.com/128/12902/12902069.png'/>}

                    <div className='hidden group-hover:inline-block absolute right-0 top-10 w-26 border-0 shadow-xl rounded-sm p-2 mt-2 bg-gray-100'>
                        {!userData.isVerified && <h3 className='hover:cursor-pointer' onClick={sendOtp}>Verify email</h3>}
                        <h3 className='hover:cursor-pointer' onClick={logout}>Logout &nbsp;<i className="fa-solid fa-right-from-bracket"></i></h3>
                    </div>
                </div>
            :
                <button className='border-0 outline-none px-4 py-1 rounded-xl bg-[#01352C] text-white hover:cursor-pointer' onClick={() => navigate("/login")}> Login &nbsp; <i className="fa-solid fa-right-to-bracket"></i> </button> 
            }


            

        </div>
    )
}

export default Navbar
