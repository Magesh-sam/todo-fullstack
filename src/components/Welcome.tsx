import { useEffect } from "react";
import { signOut } from "firebase/auth";
import { auth } from "../firebase/config";
import { useNavigate } from "react-router-dom";

export const Welcome = () => {
  const navigate = useNavigate();

  const handleSignOut: () => Promise<void> = async () => {
    await signOut(auth);
    navigate("/");
  };
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        navigate("/welcome");
      } else {
        navigate("/");
      }
    });
  });
  return (
    <main className="flex flex-col justify-center items-center h-screen gap-3">
      <h1>Welcome</h1>
      <h2>This is Protected Page</h2>
      <button
        onClick={handleSignOut}
        className="bg-[#C5A1FF] shadow-neo border-2 border-black text-black hover:shadow-none transition-shadow duration-200 ease-in font-bold py-2 px-4 rounded disabled:cursor-not-allowed "
      >
        Logout
      </button>
    </main>
  );
};
