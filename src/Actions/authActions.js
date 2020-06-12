import { returnErrors, clearErrors } from './errorActions';
import { mainUrl, authUrl, getVerfiedUserInfoUrl, registerCustomerUrl, registerAirlineUrl } from '../consts';
import { tokenConfig } from './configs'
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
                if (resp.data === true) {
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
                }
            }).catch(err => {
                console.log(err);
                (dispatch)({
                    type: REGISTER_FAIL

                });
            })
    };
}

export const registerAirline = (body = []) => {
    return (dispatch) => {
        axios.post(mainUrl + registerAirlineUrl, body)
            .then(resp => {
                dispatch({
                    type: REGISTER_SUCCESS,
                    payload: resp.data
                });
                if (resp.data === true) {
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
                }
            }).catch(err => {
                console.log(err);
                (dispatch)({
                    type: REGISTER_FAIL

                });
            })
    };
}

//verify token and load user
export const userLoader = () => (dispatch, getState) => {
    dispatch({
        type: USER_LOADING
    });

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























