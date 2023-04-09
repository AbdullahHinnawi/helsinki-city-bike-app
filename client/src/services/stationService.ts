import axios from 'axios'

/**
 * @function
 * @desc Fetches the stations
 * @returns
 */
const getStations = async (reqBody: any) => {
  const res = await axios.post('/api/stations', reqBody)
  return res.data
}

/**
 * @function
 * @desc Creates a new station
 * @param {Object} newStation
 * @returns created station object
 */
const createStation = async (newStation: any) => {
  const res = await axios.post('/api/stations/create', newStation)
  return res.data
}


const stationService = { getStations, createStation }
export default stationService