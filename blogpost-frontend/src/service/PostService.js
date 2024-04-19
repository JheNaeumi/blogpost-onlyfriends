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
 
 export const postUserContent = (token, content) => {
     return axios.post(REST_API_BASE_URL+`/user/category/1`, content,{
         headers: {'Authorization': `Bearer ${token}`}})
 }

 export const deleteUserContent =(token, postId) => {
   return axios.delete(REST_API_BASE_URL + `/user/delete/${postId}`, {
        headers: {'Authorization' : `Bearer ${token}`}
    })
 }
 export const updateUserContent = (token, postId, content) => {
    return axios.patch(REST_API_BASE_URL + `/user/update/${postId}`,content, {
        headers: {'Authorization': `Bearer ${token}`}
    } )
 }