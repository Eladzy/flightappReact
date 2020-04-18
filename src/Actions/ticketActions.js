import axios from 'axios';

export const PURCHASING_FLIGHT = 'PURCHASING_FLIGHT';
export const PURCHASE_SUCCESS = 'PURCHASE_SUCCESS';
export const PURCHASE_FAILED = 'PURCHASE_FAILED';

export const purchaseTicket = (dispatch, id) => {
    dispatch({ type: PURCHASING_FLIGHT });

    axios.post(mainUrl + purchaseUrl, id, tokenConfig)
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