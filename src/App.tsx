import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import LoginForm from "./components/LoginForm"
import SignUpForm from "./components/SignUpForm"
import HomePage from "./components/Home"
import Todo from "./components/Todo"
import { ForgetPassword } from "./components/ForgetPassword"


export default function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage/>} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/signup" element={<SignUpForm />} />
          <Route path="/todo" element={<Todo />} />
          <Route path="/forgetpassword" element={<ForgetPassword/>} />
          <Route path="*" element={<HomePage/>} />
                  </Routes>
    </Router>
      
    
    </>
    
  )
}