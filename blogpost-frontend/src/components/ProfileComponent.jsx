import { useState } from "react";
import { updateProfile } from "../service/RegisterService";
const ProfileComponent = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
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
          
            const response = await updateProfile(formData)
            if (response.status === 200) {
              const data = await response;
              setAuthHeader(response.data.token);
              console.log('Login successful', data);
              navigate("/")
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
        <div class="h-full mx-auto px-6 py-12 lg:px-8 ">
        
        <div class="border-b-2 block md:flex rounded-lg">

        <div class="w-full md:w-2/5 p-4 sm:p-6 lg:p-8 bg-white shadow-md">
            <div class="flex justify-between">
            <span class="text-xl font-semibold block">User Profile</span>
            <a href="#" class="-mt-2 text-md font-bold text-white bg-gray-700 rounded-full px-5 py-2 hover:bg-gray-800">Edit</a>
            </div>

            <span class="text-gray-600">This information is secret so be careful</span>
            <div class="w-full p-8 mx-2 flex justify-center">
            <img id="showImage" class="max-w-xs w-32 items-center border" src="https://images.unsplash.com/photo-1477118476589-bff2c5c4cfbb?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=200&q=200" alt=""/>                          
            </div>
        </div>
        
        <div class="w-full md:w-3/5 p-8 bg-white lg:ml-4 shadow-md">
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
                <input disabled type="email" id="email" name="login" 
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
            </form>
        </div>

        </div>

        </div>
        </>
    )
}

export default ProfileComponent