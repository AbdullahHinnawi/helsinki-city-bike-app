import { Dispatch } from 'redux'
import journeyService from './../services/journeyService'
import { CREATE_JOURNEY, FETCH_JOURNEYS, JourneySearch, SET_JOURNEYS_LOADING, SET_JOURNEY_SEARCH } from './../types/journeyTypes'

/**
 * @function
 * @desc Fetches the journeys
 * @param {Object} journeySearch
 */
export const fetchJourneys = (journeySearch: JourneySearch) => async (dispatch: Dispatch<any>) => {
  try {
    dispatch({ type: SET_JOURNEYS_LOADING, data: true })
    const result = await journeyService.getJourneys(journeySearch)
    dispatch({ type: FETCH_JOURNEYS, data: result })
    dispatch({ type: SET_JOURNEYS_LOADING, data: false })
  } catch (error) {
    console.log(error)
  }
}

/**
 * @function
 * @desc Creates a new journey.
 * @param {Object} journey
 */
export const createJourney = (journey: any) => async (dispatch: Dispatch<any>) => {
  try {
    const result = await journeyService.createJourney(journey)
    dispatch({ type: CREATE_JOURNEY, data: result })
  } catch (error) {
    console.log(error)
  }
}

/**
 * @function
 * @desc Sets journey search
 * @param {Object} journeySearch
 */
export const setJourneySearch = (journeySearch: JourneySearch) => (dispatch: Dispatch<any>) => {
  dispatch({ type: SET_JOURNEY_SEARCH, data: journeySearch })
}