import React, { useState } from 'react'
import Login from './pages/login/Login'
import SignUp from './pages/signup/SignUp'
import Home from './pages/home/home'
import { Routes, Route , Navigate} from 'react-router-dom'
import {Toaster} from 'react-hot-toast'
import LandingPage from './pages/landingpage/landingPage'

import LoadingBar from 'react-top-loading-bar'
import { useAuthContext } from './context/AuthContext'

function App() {

const [progress, setProgress] = useState(100);
const {authUser} = useAuthContext();
  return (
    <>

<LoadingBar
        color='#ffffff'
        progress={progress}
        onLoaderFinished={() => setProgress(0)}
      />
      
      
      <div className='p-4 h-screen flex items-center justify-center'>


        <Routes>
       
          <Route path="/" element={authUser ? <Home/> : <Navigate to={'/login'}/>} />
          <Route path="/login" element={   authUser ? <Navigate to= "/" /> :   <Login />} />
          <Route path="/signup" element={  authUser ? <Navigate to = '/' /> : <SignUp/>} />
       
        </Routes>
      
        <Toaster
         position= "top-center"
         reverseOrder={false}
        />



      </div>

    </>
  )
}

export default App
