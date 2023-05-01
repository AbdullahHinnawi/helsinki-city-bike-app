import { JourneyAction, FETCH_JOURNEYS, JourneyState, SET_JOURNEY_SEARCH, JourneySearch, SET_JOURNEYS_LOADING } from './../types/journeyTypes'

export const initialJourneySearch: JourneySearch = {
  query: {},
  options: {
    page: 1,
    limit: 100
  }
}
const initialState: JourneyState = {
  journeysResponse: undefined,
  journeySearch: initialJourneySearch,
  journeysLoading: false
}
/**
 * @desc Journey reducer that controls journey state
 * @param {Object} state
 * @param {Object} action
 * @returns state
 */
const journeyReducer = (state = initialState, action: JourneyAction) => {
  switch (action.type) {
  case FETCH_JOURNEYS:
    return {
      ...state,
      journeysResponse: action.data
    }
  case SET_JOURNEY_SEARCH:
    return {
      ...state,
      journeySearch: action.data,
    }
  case SET_JOURNEYS_LOADING:
    return {
      ...state,
      journeysLoading: action.data,
    }
  default:
    return state
  }
}

export default journeyReducer