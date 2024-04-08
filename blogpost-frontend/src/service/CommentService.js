import axios from "axios"

const REST_API_BASE_URL ='http://localhost:8080/api/comment';

export const postComment = () => {
    return axios.post(REST_API_BASE_URL+`/create`)
}
