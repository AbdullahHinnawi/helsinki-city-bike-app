import { StationState, StationAction, FETCH_STATIONS, CREATE_STATION, StationSearch, SET_STATION_SEARCH, GET_STATION_STATS, SET_CURRENT_STATION_LOADING, SET_STATIONS_LOADING } from '../types/stationTypes'

export const initialStationSearch: StationSearch = {
  query: {},
  options: {
    page: 1,
    limit: 100
  }
}
const initialState: StationState = {
  stationsResponse: undefined,
  search: initialStationSearch,
  currentStation: undefined,
  stationsLoading: false,
  currentStationLoading: false
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
      stationsResponse: action.data,
    }
  case CREATE_STATION:
    return {
      ...state,
      stationsResponse: { ...state.stationsResponse, docs: [...state.stationsResponse.docs, action.data] },
    }
  case SET_STATION_SEARCH:
    return {
      ...state,
      search: action.data,
    }
  case SET_STATIONS_LOADING:
    return {
      ...state,
      stationsLoading: action.data,
    }
  case SET_CURRENT_STATION_LOADING:
    return {
      ...state,
      currentStationLoading: action.data,
    }
  case GET_STATION_STATS:
    return {
      ...state,
      currentStation: action.data,
    }
  default:
    return state
  }
}

export default stationReducer