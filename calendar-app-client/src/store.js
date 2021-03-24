import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import { eventListReducer } from './reducers/eventReducers'

const reducer = combineReducers({
    eventList: eventListReducer,
})


const store = createStore(
    reducer, 
    composeWithDevTools(applyMiddleware(thunk))
    )

export default store