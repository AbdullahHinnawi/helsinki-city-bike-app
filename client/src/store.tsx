import {
  legacy_createStore as createStore,
  combineReducers,
  applyMiddleware,
} from 'redux'
import thunk from 'redux-thunk'
import journeyReducer from './reducers/journeyReducer'
import stationReducer from './reducers/stationReducer'
import AlertReducer from './reducers/AlertReducer'

const reducer = combineReducers({
  station: stationReducer,
  journey: journeyReducer,
  alert: AlertReducer
})

export type RootState = ReturnType<typeof reducer>

const store = createStore(reducer, applyMiddleware(thunk))

export default store
