import axios from 'axios';
import sweetAlert from 'sweetalert2';
import Swal from 'sweetalert2';
import { Icon } from 'react-materialize';


export const LOG_IN = 'LOG_IN';
export const loginAction = (username, password) => {
    return (dispatch) => {
        axios.post("https://localhost:44375/authJwt/authenticate", [username, password])
            .then(resp => {
                dispatch = ({
                    type: LOG_IN,
                    payload: resp.data
                });
            }).catch(err => {
                Swal.fire({
                    icon: 'error',
                    title: 'Failed',
                    text:"Username or password are not correct.",
                    confirmButtonText:'Got it'
                })
            })
    }
}