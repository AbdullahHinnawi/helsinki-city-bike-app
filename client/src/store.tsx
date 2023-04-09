import {
  legacy_createStore as createStore,
  combineReducers,
  applyMiddleware,
} from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import journeyReducer from './reducers/journeyReducer'
import stationReducer from './reducers/stationReducer'

const reducer = combineReducers({
  station: stationReducer,
  journey: journeyReducer,
})

const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)))

export default store