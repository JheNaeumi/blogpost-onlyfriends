import { postLogin } from "../service/AuthenticationService";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { getAuthToken, setAuthHeader } from "../service/AuthService";


const LoginComponent = () => {
  const navigate = useNavigate();
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [isAuth, setisAuth] = useState(false);
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userlogin = {login, password}
      const response = await postLogin(userlogin)
      if (response.status === 200) {
        const data = await response;
        setAuthHeader(response.data.token);
        // console.log('Login successful', data);
        navigate("/")
      }else {
        setAuthHeader(null);
        console.error('Login failed', response.statusText);
        setLogin('')
        setPassword('')
      }
    }catch (error) {
      console.error('Login failed', error);
    }
  }
  //If token is present, prevent from going back to login page
  useEffect(()=>{
      let token = getAuthToken()
      if(token !==null) {
        setisAuth(true)
        navigate("/")
      }
  },[]);
  if(isAuth){
    return null;
  }
  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img className="mx-auto h-10 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600" alt="Your Company" />
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Sign in to your account
          </h2>
        </div>
        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" action="#" method="POST" onSubmit={handleSubmit}>
            <div>
              <div className="mb-5">
                <label htmlFor="email" className="flex text-sm font-medium leading-6 text-gray-900"> Email address </label>
                <input type="email" id="email" name="email" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" placeholder="name@flowbite.com" required value={login} onChange={(e) => setLogin(e.target.value)} /> 
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900"> Password </label>
                <div className="text-sm">
                  <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500"> Forgot password? </a>
                </div>
              </div>
              <div className="mb-5">
                <input type="password" id="password" name="password" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" required value={password} onChange={(e) => setPassword(e.target.value)}/>
              </div>
            </div>
            <div>
              <button type="submit" className="flex w-full justify-center rounded-md bg-blue-700 hover:bg-blue-800 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600" > Sign in </button>
            </div>
          </form>
          <p className="mt-10 text-center text-sm text-gray-500">
            Not a member?{' '}
            <a href="/registration" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"> Sign up </a>
          </p>
        </div>
      </div>
    </>
  )
}
export default LoginComponent