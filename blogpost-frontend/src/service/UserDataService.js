import axios from "axios";

const REST_API_BASE_URL ='http://localhost:8080/api/user';
//const REST_API_BASE_URL ='https://onlyfriendsblogpost.online/api/user'; // production

export const updateProfile = (token, userDetails) => {
    return axios.put(REST_API_BASE_URL+"/profile/update", userDetails,{
      headers: {'Authorization': `Bearer ${token}`}
    })
}

export const getProfile = (token) => {
   return axios.get(REST_API_BASE_URL+"/profile", {
    headers: {'Authorization': `Bearer ${token}`}
  })
}

export const getListofUser = (token, search) =>{
  return axios.get(REST_API_BASE_URL+`/profile/list?searchQuery=${search}`, {
    headers: {'Authorization': `Bearer ${token}`}})
}



