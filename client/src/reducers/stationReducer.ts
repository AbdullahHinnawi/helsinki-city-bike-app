import { StationState, StationAction, FETCH_STATIONS, CREATE_STATION } from '../types/stationTypes'

const initialState: StationState = {
  stations: [],
}
/**
 * @desc Station reducer that controls station state
 * @param {Object} state
 * @param {Object} action
 * @returns state
 */
const stationReducer = (state = initialState, action: StationAction) => {
  switch (action.type) {
  case FETCH_STATIONS:
    return {
      ...state,
      stations: action.data?.docs,
    }
  case CREATE_STATION:
    return {
      ...state,
      stations: [...state.stations, action.data],
    }
  default:
    return state
  }
}

export default stationReducer