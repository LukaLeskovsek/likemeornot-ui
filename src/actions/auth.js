import {USER_LOGGED_IN, USER_INVALID_CREDENTIALS, USER_LOGGED_OUT} from '../types';
import api from '../api';

export const userLoggedIn = (user) => (
    {
        type : USER_LOGGED_IN,
        user
    }
);

export const userLoggedOut = () => (
    {
        type : USER_LOGGED_OUT,
        user : {}
    }
);
export const userInvalidCredentials = (data) => (
    {
        type : USER_INVALID_CREDENTIALS,
        errors : {...data.errors, email:'', password :''},
        user : data.user
    }
)

export function login (credentials) { 
    const login_req = api.user.login(credentials);
    return (dispatch) => {
        return login_req.then((res) => {
            if(res.data.errors){             
                dispatch(userInvalidCredentials(res.data))
            }else {
                localStorage.likemeornotJWT = res.data.user.token;
                dispatch(userLoggedIn(res.data.user))
            }
        })
    }
};

export function logout() {
    return (dispatch) => {
        localStorage.removeItem('likemeornotJWT');
        dispatch(userLoggedOut());
    }
}

export function signup(data) {
    const signup_req = api.user.signup(data);

    return (dispatch) =>{
        return signup_req.then( (res) => {
            localStorage.likemeornotJWT = res.data.user.token;
            dispatch(userLoggedIn(res.data.user));             
        } ); 
    }
};
