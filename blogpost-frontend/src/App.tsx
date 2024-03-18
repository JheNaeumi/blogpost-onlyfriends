import './App.css'


import {Navigate, BrowserRouter, Route, Routes, useNavigate} from 'react-router-dom'


import LoginComponent from './components/LoginComponent'
import RegistrationComponent from './components/RegistrationComponent'
import BlogpostComponent from './components/BlogpostComponent'
import ProfileComponent from './components/ProfileComponent'

import React from 'react'
import AdminComponent from './components/AdminComponent'
function App() {
  
  return (
    <>
    <BrowserRouter>
      <Routes>
          <Route path='/login' element={<LoginComponent/> }></Route>
          <Route path='/registration' element={<RegistrationComponent/> }></Route>
          <Route path='/profile' element={<ProfileComponent/> }></Route>
          <Route path='/' element={<BlogpostComponent/> }></Route>
          <Route path='/admin' element={<AdminComponent/>}></Route>
        </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
