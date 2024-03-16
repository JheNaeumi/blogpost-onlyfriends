import { postRegistration } from "../service/RegisterService";
import { useState,useEffect } from "react";
import { setAuthHeader } from "../service/AuthService";
import { useNavigate} from "react-router-dom";

const RegistrationComponent = () => {
    let navigate = useNavigate();
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
      const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
    
        // Special handling for checkbox inputs
        const inputValue = type === 'checkbox' ? checked : value;
    
        setFormData((prevData) => ({
          ...prevData,
          [name]: inputValue,
        }));
        setFormData_1((prevData) => ({
          ...prevData,
          [name]: inputValue,
        }));
      };
    
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
                  setAuthHeader(response.data.token);
                  console.log('Login successful', data);
                }else {
                  setAuthHeader(null);
                  console.error('Login failed', response.statusText);
                  setFormData('')
                  setFormData_1('')
                }

              }
           
        } catch (error) {
          // Handle registration error (e.g., show an error message)
          console.error('Registration failed', error);
        }
      }
    return (
        <>
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
              <img
                className="mx-auto h-10 w-auto"
                src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                alt="Your Company"
              />
              <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                Sign Up 
              </h2>
        </div>
        <form className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm" onSubmit={handleSubmit}>
        <div className="mb-5">
            <label for="firstName" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">FirstName</label>
            <input type="firstName" id="firstName" name="firstName" 
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"  required value={formData.firstName} onChange={handleChange} />
        </div>
        <div className="mb-5">
            <label for="lastName" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">LastName</label>
            <input type="lastName" id="lastName" name="lastName" 
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"  required value={formData.lastName} onChange={handleChange} />
        </div>
        <div className="mb-5">
            <label for="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
            <input type="email" id="email" name="login" 
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" placeholder="name@flowbite.com" required value={formData.login} onChange={handleChange} />
        </div>
        <div className="mb-5">
            <label for="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your password</label>
            <input type="password" id="password" name="password" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" required value={formData.password} onChange={handleChange}/>
        </div>
        <div className="mb-5">
            <label for="repeatPassword" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Repeat password</label>
            <input type="password" id="repeatPassword" name="repeatPassword" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" required value={formData_1.repeatPassword} onChange={handleChange} />
        </div>
        {passwordError && (
            <div className="mb-5 text-red-600 dark:text-red-400">{passwordError}</div>
        )}
        <div className="flex items-start mb-5">
            <div className="flex items-center h-5">
            <input id="terms" type="checkbox" value="" name="agreeTerms" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800" required checked={formData_1.agreeTerms} onChange={handleChange}/>
            </div>
            <label for="terms" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">I agree with the <a href="#" className="text-blue-600 hover:underline dark:text-blue-500">terms and conditions</a></label>
        </div>
        <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Register new account</button>
        </form>
        </div>
        </>
    )
}

export default RegistrationComponent