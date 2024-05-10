import { useState, useEffect, useLayoutEffect } from "react";
import { updateProfile, getProfile } from "../service/UserDataService";
import { getAuthToken, setAuthHeader } from "../service/AuthService";
import { useNavigate } from "react-router-dom";


const ProfileComponent = () => {
  const navigate = useNavigate();
  const token = getAuthToken();
  const [isAuth, setisAuth] = useState(true);
  const [showNotification, setShowNotification] = useState(false);
  const [notifMessage, setnotifMessage] = useState('')
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    login: '',
    password: '',
  },[]);
  const [formData_1, setFormData_1] = useState({
    repeatPassword: ''
  },[])
  const [passwordError, setPasswordError] = useState('');
  
  useEffect(() =>{
    getUserProfileData();
    checkAuthToken();
  },[])
  const checkAuthToken = () => {
    const token = getAuthToken();
    if(token===null){
      setisAuth(false)
      navigate('/login')
    }
  }
  const getUserProfileData = async() =>  {
    try {
      const response = await getProfile(token)
      if(response.status === 200){
        setFormData(response.data)
    }
    } catch (error) {
      console.log(error)
      setAuthHeader(null)
      navigate('/login')
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
            setShowNotification(true);
            setnotifMessage("Update Successful")
            setTimeout(() => {
              setShowNotification(false);
              navigate("/")
            }, 2000); //
         
          }else {
            console.error('Update failed', response.statusText);
            setShowNotification(true);
            setnotifMessage("Update Failed")
            setTimeout(() => {
              setShowNotification(false);
              navigate("/")
            }, 2000);
          }
        }
    } catch (error) {
      console.error('Registration failed', error);
      setShowNotification(true);
      setnotifMessage("Update Failed")
      setTimeout(() => {
        setShowNotification(false);
        navigate("/")
      }, 2000);
    }
  }
  if(!isAuth){
    return null;
  }
  return (
    <>
      <div className=" overflow-y-auto h-screen lg:px-8 dark:bg-gray-800">
        <div className="block md:flex px-6 py-12">
          <div className="w-full md:w-2/5 p-4 sm:p-6 lg:p-8 bg-white shadow-md dark:bg-gray-400 rounded-lg">
            <span className="text-xl font-semibold block">User Profile</span>
            <span className="text-gray-600">This information is sensitive</span>
            <div className="w-full p-8 mx-2 flex justify-center">
              <img width="256" height="256" src="https://img.icons8.com/windows/256/user.png" alt="user"/>
            </div>
            <span className="text-xl font-semibold flex justify-center">{formData.login}</span>
          </div>
          {/* Form for Updating User Profile */}
          <form className="mt-8 sm:mx-auto sm:w-full sm:max-w-sm py-3" onSubmit={handleSubmit}>
            <div className="mb-5">
                <label htmlFor="firstName" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">FirstName</label>
                <input type="firstName" id="firstName" name="firstName" 
                className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"  required value={formData.firstName || ''} onChange={(e) => setFormData({...formData, firstName:e.target.value})} />
            </div>
            <div className="mb-5">
                <label htmlFor="lastName" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">LastName</label>
                <input type="lastName" id="lastName" name="lastName" 
                className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"  required value={formData.lastName || ''} onChange={(e) => setFormData({...formData, lastName:e.target.value})} />
            </div>
            <div className="mb-5">
                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your password</label>
                <input type="password" id="password" name="password" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" required value={formData.password || ''} onChange={(e) => setFormData({...formData, password:e.target.value})}/>
            </div>
            <div className="mb-5">
                <label htmlFor="repeatPassword" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Repeat password</label>
                <input type="password" id="repeatPassword" name="repeatPassword" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" required value={formData_1.repeatPassword || ''} onChange={(e) => setFormData_1({...formData,repeatPassword:e.target.value})} />
            </div>
            {passwordError && (
                <div className="mb-5 text-red-600 dark:text-red-400">{passwordError}</div>
            )}
            <div className="flex justify-between">
            <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Update</button>
            <a onClick={() => navigate('/')} className="text-white bg-red-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Cancel</a>
            </div>
             {/* Popup notification component */}
         
          </form>
        </div>
        {showNotification && (
                <div className="fixed bottom-5 right-5 bg-green-500 text-white px-4 py-2 rounded">
                    {notifMessage}
                </div>
            )}
      </div>
    </>
  )
}

export default ProfileComponent