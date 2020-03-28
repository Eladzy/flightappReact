import { FETCH_ALL_FLIGHTS} from '../../Actions/flightActions';

let initState={
    flights:[]
}

export default(state=initState,action)=>{
    switch(action.type){
        case FETCH_ALL_FLIGHTS:
            console.log("entered switch")
           return{
               ...state,
               flights:action.payload
           }
            default:
                return state;
    }
}