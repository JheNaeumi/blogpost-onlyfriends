import axios from "axios"

const REST_API_BASE_URL ='http://localhost:8080/api/comment';

export const postComment = (token, comment, postId) => {
    return axios.post(REST_API_BASE_URL+`/create/${postId}`, comment, {
        headers: {'Authorization': `Bearer ${token}`}
    })
}
export const updateComment = (token, commentId, comment ) => {
    return axios.patch(REST_API_BASE_URL+`/update/${commentId}`, comment, {
        headers: {'Authorization': `Bearer ${token}`}
    })
}
export const deleteComment = (token, commentId) => {
    axios.delete(REST_API_BASE_URL+`/delete/${commentId}`, {
        headers: {'Authorization': `Bearer ${token}`}
    })
}