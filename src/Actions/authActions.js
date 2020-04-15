import { returnErrors, clearErrors } from './errorActions'
import { mainUrl, authUrl, getVerfiedUserInfoUrl, registerCustomerUrl } from '../consts'
import axios from 'axios';
export const USER_LOADING = "USER_LOADING";
export const USER_LOADED = "USER_LOADED";
export const AUTH_ERROR = "AUTH_ERROR";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAIL = "LOGIN_FAIL";
export const LOGOUT_SUCCESS = "LOGOUT_SUCCESS";
export const REGISTER_SUCCESS = "REGISTER_SUCCESS";
export const REGISTER_FAIL = "REGISTER_FAIL";

//login
export const loginUser = (body = []) => {

    return (dispatch) => {
        axios.post(mainUrl + authUrl, body)
            .then(resp => {
                dispatch({
                    type: LOGIN_SUCCESS,
                    payload: resp.data
                });
            }).catch(err => {
                dispatch(returnErrors(err.message, 'err.response.status'));
                (dispatch)({
                    type: LOGIN_FAIL
                });
            });
    };
}

export const registerCustomer = (body = []) => {
    return (dispatch) => {
        axios.post(mainUrl + registerCustomerUrl, body)
            .then(resp => {
                dispatch({
                    type: REGISTER_SUCCESS,
                    payload: resp.data
                });
            }).catch(err => {
                dispatch(returnErrors(err.response.message, 'err.response.status'));
                (dispatch)({
                    type: LOGIN_FAIL

                });
            })
    };
}

//verify token and load user
export const userLoader = () => (dispatch, getState) => {
    dispatch({
        type: USER_LOADING
    });

    // const token = getState().authR.token;


    axios.get(mainUrl + getVerfiedUserInfoUrl, tokenConfig(getState)).then(resp => {
        dispatch({
            type: USER_LOADED,
            payload: resp.data
        })
    }).catch(err => {
        dispatch(returnErrors(err.data));
        dispatch({
            type: AUTH_ERROR
        });
    });

}





export const logOutUser = () => {
    return async (dispatch) => {
        dispatch({
            type: LOGOUT_SUCCESS,

        })

    }
}

//temp
export const getUser = () => {
    if (localStorage.getItem('token')) {
        return (dispatch) => {
            axios.get(mainUrl + getVerfiedUserInfoUrl).then(resp => {
                dispatch({
                    type: USER_LOADED,
                    payload: resp.data
                }).catch(err => console.log(err.data));
            }
            )
        }
    }

}



export const tokenConfig = (getState) => {
    // Get token from state
    const token = getState().authR.token;

    // Headers
    const config = {
        headers: {
            'Content-Type': 'application/json',
        },
    };
    // If token, add to headers config
    if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
    }

    return config;
};










// export const userLoader = () => (dispatch, getState) => {
//     return async (dispatch) => {
//         dispatch({
//             type: USER_LOADING
//         });
//         const config = {
//             headers: {
//                 'Content-Type': 'application/json'
//             }
//         }
//         const token = getState.authR.token;
//         if (token) {
//             config.headers['Authorization'] = `Token ${token}`
//         }
//         return (dispatch) => {
//             axios.get(mainUrl + getVerfiedUserInfoUrl, tokenConfig(getState)).then(resp => {
//                 dispatch({
//                     type: USER_LOADED,
//                     payload: resp.data
//                 })
//             }).catch(err => {
//                 dispatch(returnErrors(err.response.data, err.response.status));
//                 dispatch({
//                     type: AUTH_ERROR
//                 });
//             });
//         }
//     }












// import axios from 'axios';
// import sweetAlert from 'sweetalert2';
// import Swal from 'sweetalert2';
// import { Icon } from 'react-materialize';


// export const LOG_IN = 'LOG_IN';
// export const loginAction = (username, password) => {
//     return (dispatch) => {
//         axios.post("https://localhost:44375/authJwt/authenticate", [username, password])
//             .then(resp => {
//                 dispatch = ({
//                     type: LOG_IN,
//                     payload: resp.data
//                 });
//             }).catch(err => {
//                 Swal.fire({
//                     icon: 'error',
//                     title: 'Failed',
//                     text:"Username or password are not correct.",
//                     confirmButtonText:'Got it'
//                 })
//             })
//     }
// }