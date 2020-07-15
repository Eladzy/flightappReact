import { PURCHASE_FAILED, PURCHASE_SUCCESS, PURCHASING_FLIGHT } from '../../Actions/ticketActions';
import { CANCEL_TICKET } from '../../Actions/customerActions';

let initState = {
    currentTicket: {},
    tickets: []
}

const ticketReducer = (state = initState, action) => {
    switch (action.type) {
        case PURCHASE_SUCCESS:
            return {
                ...state,
                currentTicket: action.payload
            }
        case CANCEL_TICKET:
            return state;
        //popup?
        default:
            return state;
            break;
    }
}
export default ticketReducer;