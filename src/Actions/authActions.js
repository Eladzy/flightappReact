
import axios from 'axios';
export const USER_LOADING = "USER_LOADING";
export const USER_LOADED = "USER_LOADED";
export const AUTH_ERROR = "AUTH_ERROR";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAIL = "LOGIN_FAIL";
export const LOGOUT_SUCCESS = "LOGOUT_SUCCESS";
export const REGISTER_SUCCESS = "REGISTER_SUCCESS";
export const REGISTER_FAIL = "REGISTER_FAIL";


export const userLoader = () => (dispatch, getState) => {
    dispatch({
        type: USER_LOADING
    })

}

























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