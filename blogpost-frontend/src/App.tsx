import './App.css'


import { BrowserRouter, Route, Routes} from 'react-router-dom'


import LoginComponent from './components/LoginComponent'
import RegistrationComponent from './components/RegistrationComponent'
import BlogpostComponent from './components/BlogpostComponent'
import ProfileComponent from './components/ProfileComponent'

import React from 'react'
import AdminComponent from './components/AdminComponent'

import { getAuthToken } from './service/AuthService'
import VerificationComponent from './components/VerificationComponent'

function App() {
 
  return (
    <>
    <BrowserRouter>
      <Routes>
          <Route path='/login' element={<LoginComponent/> }></Route>
          <Route path='/registration' element={<RegistrationComponent/> }></Route>
          <Route path='/verify' element={<VerificationComponent/> }></Route>
          {/* getAuthToken!==null&& */}
            <Route path='/profile' element={<ProfileComponent/> }></Route> 
            <Route path='/' element={<BlogpostComponent/> }></Route>
            <Route path='/admin' element={<AdminComponent/>}></Route>
        </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
