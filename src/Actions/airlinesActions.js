import axios from 'axios';
import { airlineDetailsUrl, mainUrl } from '../consts';
import { tokenConfig } from './configs';
export const GET_USER_DETAILS = 'GET_USER_DETAILS';
export const GET_AIRLINES = 'GET_AIRLINES';
export const REGISETR_PENDING = 'REGISTER_PENDING';
export const REGISTER_SUCCESS = 'REGISTER_SUCCESS';

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