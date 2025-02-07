import React from 'react'
import '../styles/style.css'

const InputField = ({icon, type, placeholder, setState}) => {
  return (
    <div className='input'>

        <i className={icon}> </i>
        <input onChange={(e)=> setState(e.target.value)} className='outline-none overflow-hidden' type={type} placeholder={placeholder} />
                
    </div>
  )
}

export default InputField
