import { FETCH_ALL_FLIGHTS, SEARCH_FLIGHTS, TARGET_FLIGHT, VIEW_FLIGHT } from '../../Actions/flightActions';

let initState = {
    flights: [],
    targetFlightId: null,
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
        default:
            return state;
    }
}