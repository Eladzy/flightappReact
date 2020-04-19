import * as actionType from '../../Actions/ticketActions'

let initState = {
    currentTicket: {},
    tickets: []
}

const ticketReducer = (state = initState, action) => {
    switch (action.type) {
        default:
        case actionType.PURCHASE_SUCCESS:
            return {
                ...state,
                currentTicket: action.payload
            }
            return state;
    }
}
export default ticketReducer;