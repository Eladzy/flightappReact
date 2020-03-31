import axios from 'axios';
import qs from 'qs';

export const FETCH_ALL_FLIGHTS = 'FETCH_ALL_FLIGHTS';
export const SEARCH_FLIGHTS = 'SEARCH_FLIGHTS';


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
                flightId: params[0],// !== "" ||undefined? params[0] : 'null',
                airlineId: params[1] ,//!== ""||undefined ? params[1] : 'null',
                originCountryId:params[2] ,//!== "" ? params[2] : 'null',
                destinationCountryId:params[3], //!== "" ||undefined? params[3] : 'null',
                depTime: params[4], //!== "" ||undefined? params[4] : 'null',
                landTime: params[5] //!== ""||undefined ? params[5] : 'null'
            }
           // paramsSerializer: (params) => qs.stringify(params, { arrayFormat: 'repeat' })
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
    
// fetch("https://localhost:44375/api/SearchFlights", {
//     params: {
//         id: params[0] !== ""  ? params[0] : null,
//         airlineId: params[1] !== "" ? params[1] : null,
//         originCountryId: params[2] !== "" ? params[2] : null,
//         destinationCountryId: params[3] !== "" ? params[3] : null,
//         depTime: params[4] !== "" ? params[4] : null,
//         landTime: params[5] !== "" ? params[5] : null
//     }