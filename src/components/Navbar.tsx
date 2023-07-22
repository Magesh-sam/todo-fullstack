// Navbar.js
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../firebase/config";


const Navbar = () => {

    const navigate = useNavigate();

    const handleSignOut = async () => {
        await signOut(auth);
        navigate("/");
      };
    
    

  return (
    <nav className="bg-[#C5A1FF] p-4 flex w-full justify-between items-center">
      {/* Left Side */}
      <div className="text-black font-bold text-2xl">Name</div>

      {/* Right Side */}
      <div className="space-x-4">
        {/* Profile */}
        <button className="bg-[#BAFDA2]  shadow-neo border-2 border-black text-black hover:shadow-none transition-shadow duration-200 ease-in font-bold py-2 px-4 rounded disabled:cursor-not-allowed">Profile</button>

        {/* Logout */}
        <button onClick={handleSignOut} className="bg-[#FCFD96]  shadow-neo border-2 border-black text-black hover:shadow-none transition-shadow duration-200 ease-in font-bold py-2 px-4 rounded disabled:cursor-not-allowed">logout</button>
      </div>
    </nav>
  );
};

export default Navbar;
