import { FETCH_ALL_FLIGHTS,SEARCH_FLIGHTS} from '../../Actions/flightActions';

let initState={
    flights:[]
}

export default(state=initState,action)=>{
    switch(action.type){
        case FETCH_ALL_FLIGHTS:
           return{
               ...state,
               flights:action.payload
           }
           case SEARCH_FLIGHTS:
               return{
                   ...state,
                   flights:action.payload
               }
            default:
                return state;
    }
}