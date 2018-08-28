import axios from 'axios';

export default {
    auth : {
        login : (credentials) => {
            return axios.post('api/login', {credentials});
        },
        signup : (user) => {
            return axios.post('api/signup', {user});
        }
    },
    users : {
        fetchUsers : () => {
            return axios.get('api/most-liked', {});
        },
        userDetails : (userId) => {
            return axios.get('api/user/'+userId, {});
        },
        likeUser : (userId) =>{
            return axios.post('api/user/'+userId+'/like', {});
        }
    }
}