import axios from 'axios';

export const FETCH_ALL_FLIGHTS = 'FETCH_ALL_FLIGHTS';
export const SEARCH_FLIGHTS = 'SEARCH_FLIGHTS';


export const getAllFlights = () => {
    return (dispatch) => {
        console.log('enters axios')
        axios.get("https://localhost:44375/api/GetAvailableFlights").then(resp => {
            console.log(resp.data)
            dispatch({
                type: FETCH_ALL_FLIGHTS,
                payload: resp.data
            })
        }).catch(err => { console.log(err) });
    }
}

export const searchFlights = (fId=null,airlineID=null,origin=null,destionation=null,departure=null,arrival=null) => {
    return (dispatch) => {
        axios.get("https://localhost:44375/api/SearchFlights", {
            params: {
                id: fId,
                airlineId: airlineID,
                originCountryId: origin,
                destinationCountryId: destionation,
                depTime: departure,
                landTime:arrival
            }
        }).then(resp => {
            console.debug(resp)
            dispatch({
                type: SEARCH_FLIGHTS,
                payload: resp.data
            })
        }).catch(err => { console.log(err) });
    }
}