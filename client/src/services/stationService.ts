import axios from 'axios'

const baseApiUri = process.env.REACT_APP_BASE_API_URI

/**
 * @function
 * @desc Fetches the stations
 * @returns
 */
const getStations = async (reqBody: any) => {
  const res = await axios.post(`${baseApiUri}/api/stations`, reqBody)
  return res.data
}

/**
 * @function
 * @desc Creates a new station
 * @param {Object} newStation
 * @returns created station object
 */
const createStation = async (newStation: any) => {
  const res = await axios.post(`${baseApiUri}/api/stations/create`, newStation)
  return res.data
}

/**
 * @function
 * @desc Get station stats
 * @returns
 */
const getStationStats = async (stationId: number, startDate: string | undefined, endDate: string | undefined) => {
  const res = await axios.get(`${baseApiUri}/api/stations/${stationId}/${startDate}/${endDate}`)
  return res.data
}


const stationService = { getStations, createStation, getStationStats }
export default stationService