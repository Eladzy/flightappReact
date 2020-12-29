import axios from 'axios';
import M from 'materialize-css';
import { returnErrors, clearErrors } from './errorActions';
import { airlineDetailsUrl, mainUrl, airlinePwdChange, submitFlightUrl, modifyFlightUrl } from '../consts';
import { tokenConfig } from './configs';
export const GET_USER_DETAILS = 'GET_USER_DETAILS';
export const GET_AIRLINES = 'GET_AIRLINES';
export const REGISETR_PENDING = 'REGISTER_PENDING';
export const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
export const CREATE_NEW_FLIGHT = ' CREATE_NEW_FLIGHT';
export const MODIFY_FLIGHT = 'MODIFY_FLIGHT';



export const getAirlines = () => {
    return (dispatch) => {
        axios.get("https://localhost:44375/api/GetAirlinesJson").then(resp => {
            dispatch({
                type: GET_AIRLINES,
                payload: resp.data
            })
        }).catch(err => { console.error(err) });
    }
}

export const getAirlineDetails = (id) => (dispatch, getState) => {

    axios.post(mainUrl + airlineDetailsUrl, id, tokenConfig(getState))
        .then(resp => {
            dispatch({
                type: GET_USER_DETAILS,
                payload: resp.data

            })
        }).catch(err => { console.log(err) });

}

export const changeAirlinePassword = (passwords = []) => (dispatch, getState) => {
    const response = axios.put(mainUrl + airlinePwdChange, passwords, tokenConfig(getState)).data

}

export const createNewFlight = (flight = {}) => (dispatch, getState) => {
    axios.post(mainUrl + submitFlightUrl, flight, tokenConfig(getState))
        .then(resp => {
            dispatch({
                type: CREATE_NEW_FLIGHT,
                payload: resp.data
            })
        }).catch(err => {
            M.toast({ html: 'Action failed', classes: 'red accent-4' });
            dispatch(returnErrors(err.message, 'err.response.status'));
        });
}

export const ModifyFlight = (flight = {}) => (dispatch, getState) => {
    axios.put(mainUrl + modifyFlightUrl, flight, tokenConfig(getState))
        .then(resp => {
            dispatch({
                type: MODIFY_FLIGHT,
                payload: resp.data
            })
        }).catch(err => { console.log(err) });

}
