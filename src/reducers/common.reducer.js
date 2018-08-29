import {
    USER_LOGGED_IN, USER_INVALID_CREDENTIALS, USER_LOGGED_OUT,
    USER_LIST_FETCH_BEGIN, USER_LIST_FETCH_SUCCESS, USER_LIST_FETCH_FAILURE,
    USER_DETAILS_FETCH_SUCCESS, USER_LIKE_SUCCESS
} from '../types';

const initialState = {
    userList: {},
    loading: false,
    error: {},
    user : {
        isAuthenticated : false
    },
    userDetails : {}
  };

export default function auth(state = initialState, action = { }){
    switch(action.type) {
        case USER_LOGGED_IN : 
            return {
                ...state,
                user : action.user
            }
            return ;
        case USER_LOGGED_OUT :
            return { ...state, user : {} };

        case USER_LIST_FETCH_BEGIN : 
            return {
                ...state,
                loading: true,
                error: null
            };
        case USER_LIST_FETCH_SUCCESS :
            return {
                ...state,
                loading: false,
                userList : action.payload.userList
            };
        case USER_LIST_FETCH_FAILURE :
            return {
                ...state,
                loading: false,
                error : action.payload.error,
                userList : {}
            };
        case USER_DETAILS_FETCH_SUCCESS : 
        return {
            ...state,
            loading : false,
            error : action.payload.error,
            userDetails : action.payload.userDetails
        }
        case USER_LIKE_SUCCESS : 
        return {
            ...state, 
            loading : false,
            error : !action.payload.errors
        }
        default : return state;
    }
}
