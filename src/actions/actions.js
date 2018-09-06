import {
    USER_LOGGED_IN, USER_INVALID_CREDENTIALS, USER_LOGGED_OUT,
    USER_LIST_FETCH_BEGIN, USER_LIST_FETCH_SUCCESS, USER_LIST_FETCH_FAILURE,
    USER_DETAILS_FETCH_SUCCESS, USER_LIKE_SUCCESS, USER_LIKE_FAILURE
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
export const userInvalidCredentials = (data) => {
    console.log('userInvalidCredentials : ', data);
    return ({
        type : USER_INVALID_CREDENTIALS,
        payload : data.errors
    })
}

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

export const fetchUserDetailsSuccess = (userDetails) => (
    {
        type : USER_DETAILS_FETCH_SUCCESS,
        payload : {userDetails}
    }
)

export const userLikeSuccess = (res) =>(
    {
        type : USER_LIKE_SUCCESS,
        payload : {res}
    }
)

export const userLikeFailure = (res) => (
    {
        type : USER_LIKE_FAILURE,
        payload : {res}
    }
)

export function login (credentials) { 
    const login_req = api.auth.login(credentials);
    return (dispatch) => {
        return login_req
        .then((res) => {
            localStorage.likemeornotJWT = res.data.user.token;
            dispatch(userLoggedIn(res.data.user))            
        }).catch(err => {throw new Error("Invalid credentials")})}
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

export function fetchUserDetails(userId) {
    return (dispatch) => {
        const fetch_req = api.users.userDetails(userId);
        return fetch_req.then( res => dispatch(fetchUserDetailsSuccess(res.data.userDetails)))
    }
}

export function likeUser(userId, likedByUserEmail) {
    //Best solution here would be that we compare our current state and update the user localy ; 
    // and we fetch new users only on demand - but for this simple usecase it's is going to be just fine
    return (dispatch) => {
        api.users.likeUser(userId,likedByUserEmail)
        .then(res => dispatch(userLikeSuccess(res)))
        .then(res => dispatch(fetchUserDetails(userId)))
        .then(res => dispatch(fetchUsers()))
        .catch(err => {
            console.log('Error like user dispatch :', err);
            dispatch(userLikeFailure(err))
        });
    }
}