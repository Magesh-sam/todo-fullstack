import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import LoginForm from "./components/LoginForm"
import SignUpForm from "./components/SignUpForm"
import { Welcome } from "./components/Welcome"
import HomePage from "./components/Home"

export default function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage/>} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/signup" element={<SignUpForm />} />
          <Route path="/welcome" element={<Welcome/>} />
                  </Routes>
    </Router>
      
    
    </>
    
  )
}