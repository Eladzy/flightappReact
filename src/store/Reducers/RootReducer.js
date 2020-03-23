import authReducer from "./authReducer";
import FlightReducer from "./FlightReducer";
import {combineReducers} from 'redux';


const rootReducer=combineReducers({
    auth: authReducer,
    flightR: FlightReducer
});
export default rootReducer;