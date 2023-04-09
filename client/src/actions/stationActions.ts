import { FETCH_STATIONS, CREATE_STATION } from './../types/stationTypes'
import stationService from './../services/stationService'
import { Dispatch } from 'redux'

/**
 * @function
 * @desc Fetches the stations
 */
export const fetchStations = (reqBody: any) => async (dispatch: Dispatch<any>) => {
  try {
    const result = await stationService.getStations(reqBody)
    dispatch({
      type: FETCH_STATIONS,
      data: result,
    })
  } catch (error) {
    console.log(error)
  }
}

/**
 * @function
 * @desc Creates a new journey.
 * @param {Object} station
 */
export const createStation = (station: any) => async (dispatch: Dispatch<any>) => {
  try {
    const result = await stationService.createStation(station)
    dispatch({ type: CREATE_STATION, data: result })
  } catch (error) {
    console.log(error)
  }
}