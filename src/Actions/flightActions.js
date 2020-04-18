import axios from 'axios';
import { tokenConfig } from './configs'
import { mainUrl, getFlightByIdUrl, purchaseUrl } from '../consts';

export const FETCH_ALL_FLIGHTS = 'FETCH_ALL_FLIGHTS';
export const SEARCH_FLIGHTS = 'SEARCH_FLIGHTS';
export const VIEW_FLIGHT = 'VIEW_FLIGHT';
export const PURCHASING_FLIGHT = 'PURCHASING_FLIGHT';
export const PURCHASE_SUCCESS = 'PURCHASE_SUCCESS';
export const PURCHASE_FAILED = 'PURCHASE_FAILED';
export const TARGET_FLIGHT = 'TARGET_FLIGHT';

export const viewFlight = (id) => {
    return (dispatch) => {
        axios.get(mainUrl + getFlightByIdUrl, {
            params: {
                id: id
            }
        }
        )
            .then(resp => {
                dispatch({
                    type: VIEW_FLIGHT,
                    payload: resp.data
                })
            }).catch(err => { console.log(err) })
    }
}

export const getAllFlights = () => {
    return (dispatch) => {
        axios.get("https://localhost:44375/api/GetAvailableFlights").then(resp => {
            dispatch({
                type: FETCH_ALL_FLIGHTS,
                payload: resp.data
            })
        }).catch(err => { console.log(err) });
    }
}

export const searchFlights = (params = []) => {
    return (dispatch) => {
        axios.get("https://localhost:44375/api/searchFlight", {
            params: {
                flightId: params[0],
                airlineId: params[1],
                originCountryId: params[2],
                destinationCountryId: params[3],
                depTime: params[4],
                landTime: params[5]
            }
        }).then(resp => {
            console.log("search query")
            console.log(resp)
            dispatch({
                type: SEARCH_FLIGHTS,
                payload: resp.data
            })
        }).catch(err => { console.log(err) });
    }
}

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


export const targetFlight = (id) => {
    return (dispatch) => {
        dispatch({
            type: TARGET_FLIGHT,
            payload: id
        });
    }

}