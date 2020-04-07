import authReducer from "./authReducer";
import flightReducer from "./FlightReducer";
import generalDataReducer from './generalDataReducer';
//import errorReducer from './errorReducer';
import {combineReducers} from 'redux';


const rootReducer=combineReducers({
    authR: authReducer,
    flightR: flightReducer,
    generalDataR:generalDataReducer
});
export default rootReducer;