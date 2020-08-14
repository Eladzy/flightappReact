import { FETCH_ALL_FLIGHTS, SEARCH_FLIGHTS, TARGET_FLIGHT, VIEW_FLIGHT, GET_MY_FLIGHTS } from '../../Actions/flightActions';
import { CREATE_NEW_FLIGHT, MODIFY_FLIGHT } from '../../Actions/airlinesActions';

let initState = {
    flights: [],
    userFlights: [],
    flight: {}
}

export default (state = initState, action) => {
    switch (action.type) {
        case FETCH_ALL_FLIGHTS:
            return {
                ...state,
                flights: action.payload
            }
        case SEARCH_FLIGHTS:
            return {
                ...state,
                flights: action.payload
            }
        case VIEW_FLIGHT:
        case MODIFY_FLIGHT:
        case CREATE_NEW_FLIGHT:
            return {
                ...state,
                flight: action.payload,

            }
        case GET_MY_FLIGHTS:
            return {
                ...state,
                userFlights: action.payload
            }
        default:
            return state;
    }
}