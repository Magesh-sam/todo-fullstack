import React, { useState, FormEvent, ChangeEvent } from "react";
import {
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { auth, provider } from "../firebase/config";
import { useNavigate } from "react-router-dom";

interface FormData {
  email: string;
  password: string;
}

const LoginForm: React.FC = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit: (e: FormEvent<HTMLFormElement>) => Promise<void> = async (
    e: FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();
    await signInWithEmailAndPassword(auth, formData.email, formData.password);
    navigate("/welcome");
  };

  const handleSocialLogin = async () => {
    await signInWithPopup(auth, provider);
    navigate("/welcome");
  };

  return (
    <main className="bg-[#C5A1FF] min-h-screen grid place-content-center">
      <div className="max-w-md mx-auto">
        <form
          onSubmit={(e) => void handleSubmit(e)}
          className="bg-white shadow-neo border-2 border-black rounded px-8 pt-6 pb-8 mb-4 "
        >
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-gray-700 font-bold mb-2"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="sam@example.com"
              className="form-input border-2 border-black focus:outline-dashed outline-2 focus:border-none"
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
              placeholder="**********"
              className="form-input border-2 border-black focus:outline-dashed outline-2 focus:border-none"
              required
            />
          </div>
          <button
            type="submit"
            className="bg-[#C5A1FF] shadow-neo border-2 border-black text-black hover:shadow-none transition-shadow duration-200 ease-in font-bold py-2 px-4 rounded disabled:cursor-not-allowed mr-2"
          >
            Sign In
          </button>
          <button
            onClick={() => navigate("/signup")}
            className="bg-[#C5A1FF] shadow-neo border-2 border-black text-black hover:shadow-none transition-shadow duration-200 ease-in font-bold py-2 px-4 rounded disabled:cursor-not-allowed "
          >
            Sign Up
          </button>
          <br />
          <br />
          <div className="flex bg-[#C5A1FF] shadow-neo border-2 border-black text-black hover:shadow-none transition-shadow duration-200 ease-in font-bold py-2 px-4 rounded ">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
              alt="google logo"
              width={30}
              height={30}
              className="mr-2"
            />
            <button onClick={handleSocialLogin}>login with Google</button>
          </div>
        </form>
      </div>
    </main>
  );
};

export default LoginForm;
