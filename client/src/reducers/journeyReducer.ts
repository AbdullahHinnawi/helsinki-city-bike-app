import { JourneyAction, FETCH_JOURNEYS, CREATE_JOURNEY, JourneyState, SET_JOURNEY_SEARCH, JourneySearch } from './../types/journeyTypes'

const initialJourneySearch: JourneySearch = {
  query: {},
  options: {
    page: 1,
    limit: 100
  }
}
const initialState: JourneyState = {
  journeysResponse: undefined,
  search: initialJourneySearch
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
  case CREATE_JOURNEY:
    return {
      ...state,
      journeysResponse: { ...state.journeysResponse, docs: [...state.journeysResponse.docs, action.data] },
    }
  case SET_JOURNEY_SEARCH:
    return {
      ...state,
      search: action.data,
    }
  default:
    return state
  }
}

export default journeyReducer