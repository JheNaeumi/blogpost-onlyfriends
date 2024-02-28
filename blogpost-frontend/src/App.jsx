import './App.css'
import LoginComponent from './components/LoginComponent'
import RegistrationComponent from './components/RegistrationComponent'
import BlogpostComponent from './components/BlogpostComponent'
import ProfileComponent from './components/ProfileComponent'
import {BrowserRouter, Route, Routes} from 'react-router-dom'

function App() {
  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path='/login' element= {<LoginComponent/>}> </Route>
        <Route path='/registration' element = {<RegistrationComponent/>}></Route>
        <Route path='/feed'element ={<BlogpostComponent/>}></Route>
        <Route path='/profile' element ={<ProfileComponent/>}></Route>
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
