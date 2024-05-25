import axios from "axios";


const REST_API_BASE_URL ='http://localhost:8080/api'; // dev
//const REST_API_BASE_URL ='https://onlyfriendsblogpost.online/api'; // production

export const postRegistration = (registration) => {
    return axios.post(REST_API_BASE_URL +"/register", registration)
}

export const postLogin = (userLogin) => {
    return axios.post(REST_API_BASE_URL + "/login", userLogin)
}

export const verify = (email, otp) => {
    return axios.get(REST_API_BASE_URL + `/verify?email=${email}&otp=${otp}`)
    
}

export const validToken = (token) => {
    return axios.get(REST_API_BASE_URL + "/token", {
        headers: {'Authorization': `Bearer ${token}`}
    })
}

