import { postRegistration } from "../service/AuthenticationService";
import { useState,useEffect } from "react";
import { getAuthToken, setAuthHeader } from "../service/AuthService";
import { useNavigate} from "react-router-dom";
import logo from "../assets/logo.png"

const RegistrationComponent = () => {
  const navigate = useNavigate();
  const [isAuth, setisAuth] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [notifMessage, setnotifMessage] = useState('')
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    login: '',
    password: '',
  });
  const [formData_1, setFormData_1] = useState({
    repeatPassword: '',
    agreeTerms: false,
  })
  const [passwordError, setPasswordError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (formData.password !== formData_1.repeatPassword) {
          setPasswordError('Passwords do not match');
          return;
      }
      else{
        const response = await postRegistration(formData)
        if (response.status === 200) {
          const data = await response;
          setShowNotification(true)
          setnotifMessage('Registration Success, Check Email For Verification')
          setFormData('')
          setFormData_1({
            repeatPassword: '', 
            agreeTerms: false,  
        });
          setTimeout(() => {
            setShowNotification(false);
            setnotifMessage('')
          }, 3000);
        }else {
       
          setAuthHeader(null);
          //console.error('Login failed', response.statusText);
          setShowNotification(true)
          setnotifMessage('Registration Failed, Existing User')
          setFormData('')
          setFormData_1({
            repeatPassword: '', 
            agreeTerms: false, 
        });
          setTimeout(() => {
            setShowNotification(false);
            setnotifMessage('')
          }, 2000);
       
        }
      }
    } catch (error) {
      // Handle registration error (e.g., show an error message)
      console.error('Registration failed', error);
      setShowNotification(true)
      setnotifMessage('Registration Failed, Try again later')
      setTimeout(() => {
        setShowNotification(false);
        setnotifMessage('')
      }, 2000);
      setFormData('')
      setFormData_1({
        repeatPassword: '',
        agreeTerms: false, 
    });
    }
  }
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
      <div className="flex flex-col h-screen dark:bg-gray-500 overflow-y-auto justify-center px-6 py-8 lg:px-8">
        <div className="grid grid-cols-3">
          <a href="/login" className=" mt-1 w-5 h-5">
            <img className="w-5 h-5 dark:hover:bg-transparent"src="https://img.icons8.com/metro/26/back.png" alt="back"/>
          </a>
          <div className="mx-auto">
            <img className="mx-auto h-28 w-auto" src={logo} alt="Your Company" /> 
            <h2 className=" mt-2 text-2xl font-bold leading-9 tracking-tight text-gray-900"> Sign Up </h2>
          </div>
        </div>
         {/*Form for Registration of new User */}
        <form className="mt-4 sm:mx-auto sm:w-full sm:max-w-sm" onSubmit={handleSubmit}>
          <div className="mb-3">
              <label htmlFor="firstName" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">FirstName</label>
              <input type="firstName" id="firstName" name="firstName" 
              className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"  required value={formData.firstName || ''} onChange={(e) => setFormData({...formData, firstName:e.target.value})} />
          </div>
          <div className="mb-3">
              <label htmlFor="lastName" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">LastName</label>
              <input type="lastName" id="lastName" name="lastName" 
              className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"  required value={formData.lastName || ''} onChange={(e) => setFormData({...formData, lastName:e.target.value})} />
          </div>
          <div className="mb-3">
              <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
              <input type="email" id="login" name="login" 
              className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" placeholder="name@flowbite.com" required value={formData.login || ''} onChange={(e) => setFormData({...formData, login:e.target.value})} />
          </div>
          <div className="mb-3">
              <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your password</label>
              <input type="password" id="password" name="password" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" required value={formData.password || ''} onChange={(e) => setFormData({...formData, password:e.target.value})}/>
          </div>
          <div className="mb-3">
              <label htmlFor="repeatPassword" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Repeat password</label>
              <input type="password" id="repeatPassword" name="repeatPassword" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" required value={formData_1.repeatPassword || ''} onChange={(e) => setFormData_1({...formData_1, repeatPassword:e.target.value})} />
          </div>
          {passwordError && (
              <div className="mb-5 text-red-600 dark:text-red-400">{passwordError}</div>
          )}
          <div className="flex items-start mb-5">
              <div className="flex items-center h-5">
              <input id="terms" type="checkbox" value="" name="agreeTerms" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800" required checked={formData_1.agreeTerms } onChange={(e) => setFormData_1({...formData_1, agreeTerms:e.target.checked})}/>
              </div>
              <label htmlFor="terms" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">I agree with the <a href="#" className="text-blue-600 hover:underline dark:text-blue-500">terms and conditions</a></label>
          </div>
          <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Register new account</button>
        </form>
        {showNotification && (
                <div className="fixed bottom-5 right-5 bg-green-500 text-white px-4 py-2 rounded">
                    {notifMessage}
                </div>
            )}
      </div>
    </>
  )
}

export default RegistrationComponent