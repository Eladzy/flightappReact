import axios from 'axios';
import { tokenConfig } from './configs';
import { mainUrl, purchaseUrl } from '../consts'
export const PURCHASING_FLIGHT = 'PURCHASING_FLIGHT';
export const PURCHASE_SUCCESS = 'PURCHASE_SUCCESS';
export const PURCHASE_FAILED = 'PURCHASE_FAILED';


export const purchaseTicket = (id) => (dispatch, getState) => {
    dispatch({ type: PURCHASING_FLIGHT });
    let config = tokenConfig(getState);
    axios.post(mainUrl + purchaseUrl, id, config)
        .then(resp => {
            dispatch({
                type: PURCHASE_SUCCESS,
                payload: resp.data
            });
        }).catch(err => {
            console.log(err);
            dispatch({
                type: PURCHASE_FAILED
            });
        });

}
