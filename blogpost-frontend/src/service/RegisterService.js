import axios from "axios";

const REST_API_BASE_URL ='http://localhost:8080';


export const postRegistration = (registration) => {
    return axios.post(REST_API_BASE_URL +"/register", registration)
}

export const updateProfile = (token, userDetails) => {
    return axios.put(REST_API_BASE_URL+"/api/user/profile/update", userDetails,{
      headers: {'Authorization': `Bearer ${token}`}
    })
}

export const getProfile = (token) => {
   return axios.get(REST_API_BASE_URL+"/api/user/profile", {
    headers: {'Authorization': `Bearer ${token}`}
  })
}