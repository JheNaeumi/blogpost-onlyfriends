import axios from "axios";

const REST_API_BASE_URL ='http://localhost:8080';

export const getLogin = () => {
    return axios.get(REST_API_BASE_URL + "/login")
}
export const postRegistration = (registration) => {
    axios.post(REST_API_BASE_URL +"/registration" + registration)
}
// dummy service for message
export const getMessage = () => {
    return axios.get(REST_API_BASE_URL + "/messages")
}