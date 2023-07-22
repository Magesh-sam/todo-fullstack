import { useEffect } from "react";
import { auth } from "../firebase/config";
import { useNavigate } from "react-router-dom";
const HomePage = () => {
  const navigate = useNavigate();
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        navigate("/todo");
      } else {
        navigate("/");
      }
    });
  },[navigate]);
        
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#C5A1FF]">
      <h1 className="text-4xl font-bold mb-4">Todo App</h1>
      <div className="space-x-4">
        <button onClick={() => navigate("/login")} className="bg-[#FCFD96] shadow-neo border-2 border-black text-black hover:shadow-none transition-shadow duration-200 ease-in font-bold py-2 px-4 rounded disabled:cursor-not-allowed ">
          Login
        </button>
        <button onClick={() => navigate("/signup")} className="bg-[#BAFDA2]  shadow-neo border-2 border-black text-black hover:shadow-none transition-shadow duration-200 ease-in font-bold py-2 px-4 rounded disabled:cursor-not-allowed ">
          Signup
        </button>
      </div>
    </div>
  );
};

export default HomePage;
