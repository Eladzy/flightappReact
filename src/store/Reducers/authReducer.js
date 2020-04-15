
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
            console.log('loaded')
            return {
                ...state,
                isLoading: false,
                isAuthenticated: true,
                user: action.payload
            };
        case LOGIN_SUCCESS:
        case REGISTER_SUCCESS:
            localStorage.setItem('token', action.payload)
            return {
                ...state,
                ...action.payload,
                isLoading: false,
                isAuthenticated: true,
            };
        case AUTH_ERROR:
        case LOGIN_FAIL:
        case LOGOUT_SUCCESS:
        case REGISTER_FAIL:
            localStorage.removeItem('token');
            return {
                ...state,
                isAuthenticated: null,
                isLoading: false,
                user: null
            };

        default:
            return state;
    }
}
export default authReducer;



















// const isLoggedWebStorage=window.localStorage.getItem(isLogged)

// const initState={
//     isLogged:(isLoggedWebStorage!==null?isLoggedWebStorage===true:false)
// }
// const authReducer=(state=initState, action)=>{
//     return state;
// }
// export default authReducer;