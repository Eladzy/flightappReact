import axios from 'axios';
import { mainUrl, customerDetailsUrl, updateCustomerUrl, checkCustomerUsernameUrl, customerPwdChangeUrl, customeCancelTicketUrl } from '../consts';
import { tokenConfig } from './configs';
export const GET_USER_DETAILS = 'GET_USER_DETAILS';
export const UPDATE_MY_DETAILS = 'UPDATE_MY_DETAILS';
export const CANCEL_TICKET = 'CANCEL_TICKET';

export const getCustomerDetails = (id) => (dispatch, getState) => {
    axios.post(mainUrl + customerDetailsUrl, id, tokenConfig(getState))
        .then(resp => {
            dispatch({
                type: GET_USER_DETAILS,
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


export async function userNameAvailableCheck(username) {

    return await axios.get(mainUrl + checkCustomerUsernameUrl, { params: { username: username } })
        .then(resp => { return resp.data; }).catch(err => (console.log(err)))

}
export const changeCustomerPassword = (passwords = []) => (dispatch, getState) => {
    const response = axios.put(mainUrl + customerPwdChangeUrl, passwords, tokenConfig(getState)).data;
}

export const cancelTicket = (flightId) => (dispatch, getState) => {
    axios.post(mainUrl + customeCancelTicketUrl, flightId, tokenConfig(getState))
        .then(resp => {
            dispatch({
                type: CANCEL_TICKET,
                payload: resp.data
            })
        }).catch(err => { console.log(err) });


}