import axios from 'axios';

export const GET_COUNTRIES = 'GET_COUNTRIES';

export const getCountries = () => {
    return (dispatch) => {
        axios.get("https://localhost44375/api/countries").then(resp=>{
            return dispatch({
                type:GET_COUNTRIES,
                payload:resp.data
            })
        }).catch(err=>{console.error(err)})
    }
}