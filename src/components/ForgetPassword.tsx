import { useState } from 'react'
import { auth } from '../firebase/config'
import { sendPasswordResetEmail } from 'firebase/auth'

export const ForgetPassword = () => {
    const [email, setEmail] = useState('')
    const [isEmailSent, setIsEmailSent] = useState(false)
    const handleReset = async () => {
        console.log('sending email')
        await sendPasswordResetEmail(auth, email)
        setIsEmailSent(true)
        
    }
    console.log(email)
  return (
      <main className="flex flex-col items-center justify-center min-h-screen gap-3 bg-[#C5A1FF]">
          <h1 className='text-lg font-bold' >Forget Password ? Enter Your Email</h1>
          <form onSubmit={handleReset} className='flex gap-3 flex-wrap justify-center'>
              <input type="email" placeholder="Enter Your Email" value={email} onChange={(e) => setEmail(e.target.value)} className='form-input outline border-black focus:outline-dashed outline-2 focus:border-none  "
              ' required />
              <button type='submit' className='bg-[#FCFD96] shadow-neo border-2 border-black text-black hover:shadow-none transition-shadow duration-200 ease-in font-bold rounded p-1'>Send Reset Link</button>
          </form>
          {isEmailSent && <p> Email Sent please check your inbox</p>}
    </main>
  )
}
