import './App.css'
import LoginComponent from './components/LoginComponent'
import RegistrationComponent from './components/RegistrationComponent'
import {BrowserRouter, Route, Routes} from 'react-router-dom'

function App() {
  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path='/login' element= {<LoginComponent/>}> </Route>
        <Route path='/registration' element = {<RegistrationComponent/>}></Route>
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
