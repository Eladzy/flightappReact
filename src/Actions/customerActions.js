import axios from 'axios';
import { mainUrl, customerDetailsUrl } from '../consts';
import { tokenConfig } from './configs';
export const GET_CUSTOMER_DETAILS;

export const getCustomerDetails = (id) => (dispatch, getState) => {
    axios.post(mainUrl + customerDetailsUrl, id, config(getState))
        .then(resp => {
            dispatch({
                type: GET_CUSTOMER_DETAILS,
                payload: resp.data

            })
        }).catch(err => { console.log(err) });
}