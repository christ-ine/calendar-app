import axios from 'axios'
import { EVENT_LIST_REQUEST, EVENT_LIST_SUCCESS, EVENT_LIST_FAIL } from '../constants/eventConstants'

export const listEvents = (eventData) => async(dispatch) => {
    try {
        dispatch({type: EVENT_LIST_REQUEST})

        const config = {
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, PATCH, PUT, DELETE, OPTIONS'
            }
        }

        const { data } = await axios.post(`/api/events/api.php/`, eventData, config )

       dispatch({
            type: EVENT_LIST_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: EVENT_LIST_FAIL,
            payload: error
        })
    }

}