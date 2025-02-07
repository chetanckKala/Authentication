import { createContext, useEffect, useState } from "react";
import axios from "axios";
import {toast} from 'react-toastify'


export const UserContext = createContext()
export const UserProvider = (props) =>
{
    const url = import.meta.env.VITE_BACKEND_URL
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [userData, setUserData] = useState(false)
    axios.defaults.withCredentials = true


    async function getAuthStatus() 
    {
        const {data} = await axios.get(url + "/is-auth")

        if (data.success)
        {
            setIsLoggedIn(true)
            getUserData()
        }

        else
        {
            setIsLoggedIn(false)
            setUserData(false)
        }
    }

    async function getUserData() 
    {
        const {data} = await axios.get(url + "/data")

        if (data.success)
        {
            setUserData(data.user)
        }

        else
        {
            toast.error(data.message)
        }
    }

    useEffect(()=> {getAuthStatus()}, [isLoggedIn])

    const value = {url, isLoggedIn, setIsLoggedIn, userData, setUserData, getUserData, getAuthStatus}

    return (
        <UserContext.Provider value={value}>
            {props.children}
        </UserContext.Provider>
    )
}