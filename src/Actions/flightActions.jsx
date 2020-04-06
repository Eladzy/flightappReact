import axios from 'axios';

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
                flightId: params[0],
                airlineId: params[1] ,
                originCountryId:params[2] ,
                destinationCountryId:params[3], 
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
    
