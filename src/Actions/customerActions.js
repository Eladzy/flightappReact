import axios from 'axios';
import { mainUrl, customerDetailsUrl, updateCustomerUrl, checkUsernameUrl } from '../consts';
import { tokenConfig } from './configs';
export const GET_CUSTOMER_DETAILS = 'GET_CUSTOMER_DETAILS';
export const UPDATE_MY_DETAILS = 'UPDATE_MY_DETAILS';


export const getCustomerDetails = (id) => (dispatch, getState) => {
    axios.post(mainUrl + customerDetailsUrl, id, tokenConfig(getState))
        .then(resp => {
            dispatch({
                type: GET_CUSTOMER_DETAILS,
                payload: resp.data

            })
        }).catch(err => { console.log(err) });
}


export const updateMyDetails = (body = []) => (dispatch, getState) => {
    axios.put(mainUrl + updateCustomerUrl, body, tokenConfig(getState))
        .then(resp => {
            dispatch({
                type: UPDATE_MY_DETAILS,
                payload: resp.data
            })
        }).catch(err => { console.log(err) });
}

export const userNameAvailableCheck = (username) => {
    axios.get(mainUrl + checkUsernameUrl, {
        params: {
            username: username
        }
    })
        .then(resp => {
            return resp.data;
        }).catch(err => { console.log(err) });
}