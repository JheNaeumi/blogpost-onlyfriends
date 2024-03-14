import axios from "axios";

const REST_API_BASE_URL ='http://localhost:8080';


// export const getAuthToken = () => {
//     axios.get(REST_API_BASE_URL + "/getAuthToken")
// }
// export const setAuthHeader = () =>{
// }
export const getAuthToken = () => {
    return window.localStorage.getItem('auth_token');
};

export const setAuthHeader = (token: string | null) => {
    if (token !== null) {
      window.localStorage.setItem("auth_token", token);
    } else {
      window.localStorage.removeItem("auth_token");
    }
};