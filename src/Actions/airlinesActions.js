import axios from 'axios'

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

export const registerAirline = (userData = []) => {

}