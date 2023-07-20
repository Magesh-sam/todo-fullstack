import React, { useState, useEffect } from 'react'
import { signOut } from 'firebase/auth'
import { auth } from '../firebase/config'
import {useNavigate} from 'react-router-dom'


export const Welcome = () => {

    const navigate = useNavigate();

    const handleSignOut: () => Promise<void> = async () => {
        await signOut(auth);
        navigate('/');
    
    }
    useEffect(() => {
        auth.onAuthStateChanged(user => {
            if (user) {
                navigate('/welcome');
            }
            else {
                            navigate('/');
                        }
        })
    })
  return (
      <div>
          <h1>Welcome</h1>
          <br />
          <button onClick={handleSignOut} >Logout</button>
      </div>
      
  )
}
