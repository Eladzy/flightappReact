import { FETCH_ALL_FLIGHTS, SEARCH_FLIGHTS, TARGET_FLIGHT, VIEW_FLIGHT, GET_MY_FLIGHTS } from '../../Actions/flightActions';

let initState = {
    flights: [],
    targetFlightId: null,
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
        case TARGET_FLIGHT:

            return {
                ...state,
                targetFlightId: action.payload
            }
        case VIEW_FLIGHT:
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