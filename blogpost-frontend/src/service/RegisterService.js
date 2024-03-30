import axios from "axios";

const REST_API_BASE_URL ='http://localhost:8080';


export const postRegistration = (registration) => {
    return axios.post(REST_API_BASE_URL +"/register", registration)
}

export const updateProfile = (userDetails) => {
    return axios.put(REST_API_BASE_URL+"/profile", userDetails)
}

export const getProfile = (token) => {
    axios.get(REST_API_BASE_URL+"/getProfile", token)
}