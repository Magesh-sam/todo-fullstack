import React, { useState, FormEvent, ChangeEvent,useEffect } from "react";
import { createUserWithEmailAndPassword, updateProfile, sendEmailVerification } from "firebase/auth";
import { auth } from "../firebase/config";
import { useNavigate } from 'react-router-dom'
interface FormData {
  fullname: string;
  email: string;
  password: string;
  reenterPassword: string;
}

const SignUpForm: React.FC = () => {


  const navigate = useNavigate();
  
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        navigate("/todo");
      } else {
        navigate("/signup");
      }
    })
  },[navigate] )

  const [formData, setFormData] = useState<FormData>({
    fullname: "",
    email: "",
    password: "",
    reenterPassword: "",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  //TODO: fix the typescript type issue
  const handleSubmit: (e: FormEvent<HTMLFormElement>) => Promise<void> = async (e: FormEvent<HTMLFormElement>) =>{
    e.preventDefault();
    await createUserWithEmailAndPassword(auth, formData.email, formData.password);
    await updateProfile(auth?.currentUser, {
      displayName: formData.fullname
    })
    await sendEmailVerification(auth?.currentUser);
    

    navigate('/todo');
    
  };



  return (

    
    <main className="bg-[#C5A1FF] min-h-screen grid place-content-center" >
      <div className="max-w-md mx-auto">
        <form
          onSubmit={(e)=>void handleSubmit(e)}
          className="bg-white shadow-neo border-2 border-black rounded px-8 pt-6 pb-8 mb-4 "
        >

          <div className="mb-4">
            <label htmlFor="fullname" className="block text-gray-700 font-bold mb-2">
              Full Name
            </label>
            <input
              type="text"
              id="fullname"
              name="fullname"
              value={formData.fullname}
              onChange={handleChange}
              placeholder="captain jacksparrow"
              className="form-input outline border-black focus:outline-dashed outline-2 focus:border-none"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 font-bold mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="jacksparrow@captain.com"
              className="form-input outline border-black focus:outline-dashed outline-2 focus:border-none"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-gray-700 font-bold mb-2"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="black_pearl#123"
              className="form-input outline border-black focus:outline-dashed outline-2 focus:border-none"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="reenterPassword"
              className="block text-gray-700 font-bold mb-2"
            >
              Re-enter Password
            </label>
            <input
              type="password"
              id="reenterPassword"
              name="reenterPassword"
              value={formData.reenterPassword}
              placeholder="black_pearl#123"
              onChange={handleChange}
              className="form-input outline border-black focus:outline-dashed outline-2 focus:border-none"
              required
            />
            <br />
            {formData.reenterPassword.length > 0 &&
              formData.password !== formData.reenterPassword && (
                <span className="text-red-500">password doesn't match</span>
              )}
          </div>
          <button
            type="submit"
            disabled={formData.password !== formData.reenterPassword}
            className="bg-[#C5A1FF] shadow-neo border-2 border-black text-black hover:shadow-none transition-shadow duration-200 ease-in font-bold py-2 px-4 rounded disabled:cursor-not-allowed "
          >
            Sign Up
          </button>
        </form>
      </div>
    </main>
  );
};

export default SignUpForm;
