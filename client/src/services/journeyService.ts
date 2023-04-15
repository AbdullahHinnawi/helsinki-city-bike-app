import axios from 'axios'
import { baseUrl } from '../utils/config'


/**
 * @function
 * @desc Fetches the journeys
 * @returns
 */
const getJourneys = async (reqBody: any) => {
  const res = await axios.post(`${baseUrl}/api/journeys`, reqBody)
  return res.data
}

/**
 * @function
 * @desc Creates a new station
 * @param {Object} newStation
 * @returns created station object
 */
const createJourney = async (newStation: any) => {
  const res = await axios.post(`${baseUrl}/api/journeys/create`, newStation)
  return res.data
}


const journeyService = { getJourneys, createJourney }
export default journeyService