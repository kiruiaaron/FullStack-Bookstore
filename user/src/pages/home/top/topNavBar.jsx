import React from 'react'
import {Link} from 'react-router-dom'

const TopNavBar = () => {
  return (
    <div className='top'>
        <div className="logo">
            <h1>
                ABBRON LIBRARY 
            </h1>
        </div>
        <ul>
            <li><Link className='link'> Home</Link></li>
            <li><Link className='link' to='/register'> Register</Link></li>
            <li><Link className='link' to='/login'>Login</Link> </li>
        </ul>
    </div>
  )
}

export default TopNavBar