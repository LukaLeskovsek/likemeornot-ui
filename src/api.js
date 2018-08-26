import axios from 'axios';

export default {
    user : {
        login : (credentials) => {
            return axios.post('api/login', {credentials});
        },
        signup : (user) => {
            return axios.post('api/signup', {user});
        }
    }
}