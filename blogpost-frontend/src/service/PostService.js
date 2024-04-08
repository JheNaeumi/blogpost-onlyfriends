import axios from "axios"

const REST_API_BASE_URL ='http://localhost:8080/api/post';


export const getPostResponse = (token, page) => {
    return axios.get(REST_API_BASE_URL+`/user/all?pageNumber=${page}`, {
     headers: {'Authorization': `Bearer ${token}`}})
 }
 
 export const getPostUser = (token, name) => {
     return axios.get(REST_API_BASE_URL+`/user/${name}/all`, {
         headers: {'Authorization': `Bearer ${token}`}})
 }
 
 export const postContent = (token, userId, categoryId) => {
     return axios.post(REST_API_BASE_URL+`/user/${userId}/category/${categoryId}`,{
         headers: {'Authorization': `Bearer ${token}`}})
 }