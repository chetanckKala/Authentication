import React, { useContext, useEffect, useRef, useState } from 'react'
import { UserContext } from '../context/UserContext'

const OtpInput = ({length, otp, setOtp}) => 
{
    const {userData} = useContext(UserContext)
    const inputs = useRef([])

    function handleInput (event, index) 
    {
        const {value} = event.target

        // update otp value
        const newOtp = [...otp]
        newOtp[index] = value
        setOtp(()=> newOtp)

        // move to next input
        if (index < length - 1 && value!=="")
        {
            inputs.current[index + 1].focus()
        }

    }

    function handleKeyDown (event, index)
    {
      const {value} = event.target

      if ( (event.key === 'ArrowLeft' || (event.key === 'Backspace' && !value)) && index > 0)
      {
          const prevInput = inputs.current[index-1]
          prevInput.focus()
          setTimeout(() => prevInput.setSelectionRange(prevInput.value.length, prevInput.value.length), 0)
      }


      if ( event.key === 'ArrowRight' && index < length-1)
      {
          const nextInput = inputs.current[index+1]
          nextInput.focus()
      }
    }

    function pasteHandler (event)
    {
      const paste = event.clipboardData.getData("text")
      const pasteArray = paste.split("")

      pasteArray.forEach( (char, index) => 
      {
        // console.log(char, index)
        if (index < length)
          inputs.current[index].value = char
      })
      setOtp(()=> pasteArray)

      // console.log(otp)
        

    }





    return (
      <div className='flex flex-col items-center justify-center'>
      <div className='mt-5 flex gap-2'>
        {
          otp.map((val, index)=>
          {
              return <input 
                      type="text" maxLength={1} placeholder={val} key={index} 
                      onChange={(e)=> handleInput(e, index)}
                      onPaste={pasteHandler}
                      onKeyDown={(e)=> handleKeyDown(e, index)}
                      ref={(e)=> inputs.current[index]=e}
                      required
                      className='border-1 border-gray-300 outline-[#01352C] rounded-md w-10 aspect-square shadow-lg inset-shadow-xs bg-[#E1EACD] text-center font-semibold'/>
          })
        }
      </div>

      {/* <button onClick={submitHandler} className='mt-4 border px-4 py-1 rounded-xl w-7/10 bg-[#01352C] text-white hover:cursor-pointer'>Verify Email</button> */}
      </div>

      
  )
}

export default OtpInput
