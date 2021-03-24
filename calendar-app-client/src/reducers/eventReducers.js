import { 
    EVENT_LIST_REQUEST, 
    EVENT_LIST_SUCCESS, 
    EVENT_LIST_FAIL 
} from "../constants/eventConstants"


export const eventListReducer = (state = {}, action) => {
    switch (action.type) {
        case EVENT_LIST_REQUEST:
            return { loading: true }
        case EVENT_LIST_SUCCESS:
            return { 
                loading: false, 
                success: true,
                clientEvents: action.payload, 
            }
        case EVENT_LIST_FAIL:
            return { loading: false, error: action.payload}
        default:
            return state
    }
}