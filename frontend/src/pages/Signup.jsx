import React, { useContext, useState } from 'react'
import { assets } from '../assets/assets'
import '../styles/style.css'
import { useNavigate } from 'react-router-dom'
import InputField from '../components/InputField'
import ImagePart from '../components/ImagePart'
import { UserContext } from '../context/UserContext'
import axios from 'axios'
import { toast } from 'react-toastify'


const Signup = () => {

    let [username, setUsername] = useState()
    let [email, setEmail] = useState()
    let [password, setPassword] = useState()
    const navigate = useNavigate()
    const {url, isLoggedIn, setIsLoggedIn, userData, setUserData, getUserData} = useContext(UserContext)
    
    


    async function submitHandler(event) {
        event.preventDefault()
        axios.defaults.withCredentials = true

        const {data} = await axios.post(url + "/signup", {username, email, password})
        
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
        <div className='flex items-center justify-center h-screen bg-[#748F80] relative'>

            <img onClick={()=> navigate("/")} src={assets.logo} className='absolute top-8 left-8 w-28 bg-[#E1EACD] px-3 py-1 drop-shadow-lg border-0 rounded-md hover:cursor-pointer' />
            

            <div className='flex h-8/10 w-6/10 overflow-hidden border-0 rounded-2xl bg-white p-5'>

            {/* image part */}
            <ImagePart/>

            {/* form part */}
            <form onSubmit={submitHandler} className='md:w-5/10 w-10/10 flex flex-col justify-center items-center' action="">

                <h2 className='text-4xl mb-4 font-semibold text-[#01352C]'>Signup</h2>
                <InputField setState={setUsername} icon={"fa-regular fa-user"} type={"username"} placeholder={"Full Name"} />
                <InputField setState={setEmail} icon={"fa-regular fa-envelope"} type={"email"} placeholder={"Email"} />
                <InputField setState={setPassword} icon={"fa-solid fa-lock"} type={"password"} placeholder={"Password"} />

                <button className='mt-4 border px-4 py-1 rounded-xl w-7/10 bg-[#01352C] text-white hover:cursor-pointer'>Sign Up</button>
                <p className='mt-2 text-xs text-left w-7/10' >Already have an account? <span onClick={()=> navigate("/login")} className='underline font-semibold hover:cursor-pointer'>Login Here</span></p>

            </form>

            </div>       
        </div>
    )
}

export default Signup
