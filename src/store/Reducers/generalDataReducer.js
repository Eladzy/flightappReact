import {GET_AIRLINES} from '../../Actions/airlinesActions';
import {GET_COUNTRIES} from '../../Actions/countriesActions';

let initState = {
    airlines: [],
    countries: []
}

export default (state = initState, action) => {
    switch(action.type){
        case GET_AIRLINES:
            return({
                ...state,
                airlines:action.payload
            })
            case GET_COUNTRIES:
                return({
                    ...state,
                    countries:action.payload
                })
            default:return state;
             
    }
}