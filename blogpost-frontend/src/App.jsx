import './App.css'
import { useEffect, useState } from 'react'

import LoginComponent from './components/LoginComponent'
import RegistrationComponent from './components/RegistrationComponent'
import BlogpostComponent from './components/BlogpostComponent'
import ProfileComponent from './components/ProfileComponent'
import {Navigate, BrowserRouter, Route, Routes} from 'react-router-dom'


function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check authentication status here (e.g., by verifying the token)
    const token = localStorage.getItem('authToken');
    setIsAuthenticated(!!token); // Set authentication status based on token presence
  }, []);
  return (
    <>
    <BrowserRouter>
      {/* <Routes>
        <Route path='/login' element= {<LoginComponent/>}> </Route>
        <Route path='/registration' element = {<RegistrationComponent/>}></Route>
        <Route path='/'element ={<BlogpostComponent/>}></Route>
        <Route path='/profile' element ={<ProfileComponent/>}></Route>
      </Routes> */}
      <Routes>
          <Route path="/login"element={<LoginComponent setIsAuthenticated={setIsAuthenticated} />}></Route>
          <Route path="/registration" element={<RegistrationComponent />} />
          <Route path="/" element={ isAuthenticated ? ( <BlogpostComponent /> ) : ( <Navigate to="/login" /> ) } />
          <Route path="/profile" element={ isAuthenticated ? ( <ProfileComponent /> ) : ( <Navigate to="/login" /> ) }/>
        </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
