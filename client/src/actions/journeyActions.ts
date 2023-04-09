import { Dispatch } from 'redux'
import journeyService from './../services/journeyService'
import { CREATE_JOURNEY, FETCH_JOURNEYS } from './../types/journeyTypes'

/**
 * @function
 * @desc Fetches the journeys
 */
export const fetchJourneys = (reqBody: any) => async (dispatch: Dispatch<any>) => {
  try {
    const result = await journeyService.getJourneys(reqBody)
    dispatch({
      type: FETCH_JOURNEYS,
      data: result,
    })
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