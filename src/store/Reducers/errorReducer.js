import { GET_ERRORS, CLEAR_ERRORS } from '../../Actions/errorActions';
import { Switch } from 'react-materialize';

const initState = {
    msg: {},
    statues: null,
    id: null
}

const errorReducer = (state = initState, action) => {
    switch(action.type){
        case GET_ERRORS:
            return{
                msg:action.payload.msg,
                statues:action.payload.statues,
                id:actions.payload.id
            };
            case CLEAR_ERRORS:
                return{
                    msg:{},
                    statues:null,
                    id:null
                }
            default:
                return state;
    }
}

export default errorReducer;