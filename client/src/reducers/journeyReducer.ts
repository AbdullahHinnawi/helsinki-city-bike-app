import { JourneyAction, FETCH_JOURNEYS, CREATE_JOURNEY, JourneyState } from './../types/journeyTypes'

const initialState: JourneyState = {
  journeys: [],
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
      journeys: action.data?.docs,
    }
  case CREATE_JOURNEY:
    return {
      ...state,
      journeys: [...state.journeys, action.data],
    }
  default:
    return state
  }
}

export default journeyReducer