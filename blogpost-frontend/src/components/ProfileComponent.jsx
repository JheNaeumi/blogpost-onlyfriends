import { useState, useEffect, useLayoutEffect } from "react";
import { updateProfile, getProfile} from "../service/RegisterService";

import { jwtDecode } from 'jwt-decode'
import { getAuthToken } from "../service/AuthService";


const ProfileComponent = () => {
    const token = getAuthToken();
    const [formData, setFormData] = useState({
      firstName: '',
      lastName: '',
      login: '',
      password: '',
      
    }, []);
    const [formData_1, setFormData_1] = useState({
      repeatPassword: '',
    })
    const [passwordError, setPasswordError] = useState('');
    
    useEffect(() =>{
      getUserProfileData()

    },[])
    
    const getUserProfileData = async() =>  {
    
      const response = await getProfile(token)
      if(response.status === 200){
        setFormData(response.data)
      }
    
    }

      const handleSubmit = async (e) => {
        e.preventDefault();
    
      try {
        if (formData.password !== formData_1.repeatPassword) {
            setPasswordError('Passwords do not match');
            return;
        }
        else{
          
            const response = await updateProfile(token, formData)
            if (response.status === 200) {
              console.log('Update Succesful',response.data);
            }else {
              console.error('Update failed', response.statusText);
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
        <form className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm" onSubmit={handleSubmit}>
        <div className="mb-5">
            <label for="firstName" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">FirstName</label>
            <input type="firstName" id="firstName" name="firstName" 
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"  required value={formData.firstName} onChange={(e) => setFormData({...formData, firstName:e.target.value})} />
        </div>
        <div className="mb-5">
            <label for="lastName" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">LastName</label>
            <input type="lastName" id="lastName" name="lastName" 
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"  required value={formData.lastName} onChange={(e) => setFormData({...formData, lastName:e.target.value})} />
        </div>
        <div className="mb-5">
            <label for="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
            <input type="email" id="email" name="login"
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" placeholder="name@flowbite.com" required value={formData.login} onChange={(e) => setFormData({...formData, login:e.target.value})} />
        </div>
        <div className="mb-5">
            <label for="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your password</label>
            <input type="password" id="password" name="password" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" required value={formData.password} onChange={(e) => setFormData({...formData, password:e.target.value})}/>
        </div>
        <div className="mb-5">
            <label for="repeatPassword" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Repeat password</label>
            <input type="password" id="repeatPassword" name="repeatPassword" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" required value={formData_1.repeatPassword} onChange={(e) => setFormData_1({...formData_1, repeatPassword:e.target.value})} />
        </div>
        {passwordError && (
            <div className="mb-5 text-red-600 dark:text-red-400">{passwordError}</div>
        )}
        <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Update</button>
        </form>


        </div>

        </div>
        </>
    )
}

export default ProfileComponent