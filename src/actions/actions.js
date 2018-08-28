import {
    USER_LOGGED_IN, USER_INVALID_CREDENTIALS, USER_LOGGED_OUT,
    USER_LIST_FETCH_BEGIN, USER_LIST_FETCH_SUCCESS, USER_LIST_FETCH_FAILURE,
    USER_DETAILS_FETCH_SUCCESS
} from '../types';

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

export const userListFetchFailure = (error) => (    
    {
        type : USER_LIST_FETCH_FAILURE,
        payload : {error}
    }
);

export const userListFetchSuccess = (userList) => (
    {
        type : USER_LIST_FETCH_SUCCESS,
        payload : {userList}
    }
);

export const userListFetchBegin = () => (
    {
        type : USER_LIST_FETCH_BEGIN
    }
);

export const userDetailsFetchSuccess = (userDetails) => (
    {
        type : USER_DETAILS_FETCH_SUCCESS,
        payload : {userDetails}
    }
)

export function login (credentials) { 
    const login_req = api.auth.login(credentials);
    return (dispatch) => {
        return login_req.then((res) => {
            if(res.data.errors){             
                dispatch(userInvalidCredentials(res.data))
            }else {
                localStorage.likemeornotJWT = res.data.user.token;
                dispatch(userLoggedIn(res.data.user))
            }
        }).catch(err => {
            dispatch(userInvalidCredentials(err))
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
    const signup_req = api.auth.signup(data);

    return (dispatch) =>{
        return signup_req.then( (res) => {
            localStorage.likemeornotJWT = res.data.user.token;
            dispatch(userLoggedIn(res.data.user));             
        } ); 
    }
};

export function fetchUsers() {
    return (dispatch) => {
        dispatch(userListFetchBegin());
        const fetch_req = api.users.fetchUsers();
        return fetch_req.then( (res) => {
            dispatch(userListFetchSuccess(res.data.userList));
        })
    }
};

export function userDetails(userId) {
    return (dispatch) => {
        const fetch_req = api.users.userDetails(userId);
        return fetch_req.then( res => {
            dispatch(userDetailsFetchSuccess(res.data.userDetails));
        })
    }
}

export function likeUser(userId) {
    return (dispatch) => {
        api.users.likeUser(userId).then( (res) => {         
            dispatch(userDetails(userId));
            dispatch(fetchUsers()); 
        });
    }
}

