import { BrowserRouter as Router, Routes, Route} from "react-router-dom"
import Signup from "./components/Signup"
import Login from "./components/Login"
import Home from "./components/Home"
import ForgotPassword from "./components/ForgotPassword"

function App() {
  

  return (
    <>
      {/* <Signup/> */}
    <Router>
      <Routes>
         <Route path='/' element={<Signup/>}></Route>
         <Route path='/home' element={<Home/>}></Route>
         <Route path='/login' element={<Login/>}></Route>
          <Route path='/forgotpassword' element={<ForgotPassword/>}></Route>
      </Routes>
     
    </Router>
        </>
  )
}

export default App
