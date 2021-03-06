
import {
    USER_LOADED,
    USER_LOADING,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT_SUCCESS,
    REGISTER_SUCCESS,
    REGISTER_FAIL
} from '../../Actions/authActions';
import { GET_USER_DETAILS } from '../../Actions/customerActions';

let initState = {
    token: localStorage.getItem('token'),
    isAuthenticated: null,
    isLoading: false,
    user: {}
}

const authReducer = (state = initState, action) => {
    switch (action.type) {
        case USER_LOADING:
            console.log('loading')
            return {
                ...state,
                isLoading: true
            };
        case USER_LOADED:
        case GET_USER_DETAILS:
            console.log('loaded')
            return {
                ...state,
                isLoading: false,
                isAuthenticated: true,
                user: action.payload
            };
        case REGISTER_SUCCESS:
        // break;//for now
        case LOGIN_SUCCESS:
            localStorage.setItem('token', action.payload[0])
            return {
                ...state,
                token: localStorage.getItem('token'),
                isLoading: false,
                isAuthenticated: true,
                user: {
                    username: action.payload[1],
                    roles: action.payload[2]
                },
            };
        //    case AUTH_ERROR:

        case REGISTER_FAIL:
            localStorage.removeItem('token');
            return {
                ...state,
                isAuthenticated: null,
                isLoading: false,
                user: null
            };
        case LOGIN_FAIL:
            return {
                ...state,
                isAuthenticated: null,
                isLoading: false,
                user: null,
                error: 'was erorr'
            }
        case LOGOUT_SUCCESS:
            localStorage.removeItem('token');
            return {
                ...state,
                token: null,
                isAuthenticated: null,
                isLoading: false,
                user: null
            };
        default:
            return state;
    }
}
export default authReducer;



















