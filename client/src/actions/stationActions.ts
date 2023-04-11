import { FETCH_STATIONS, CREATE_STATION, StationSearch, SET_STATION_SEARCH } from './../types/stationTypes'
import stationService from './../services/stationService'
import { Dispatch } from 'redux'

/**
 * @function
 * @desc Fetches the stations
 * @param {Object} stationSearch
 */
export const fetchStations = (stationSearch: any) => async (dispatch: Dispatch<any>) => {
  try {
    const result = await stationService.getStations(stationSearch)
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
 * @desc Creates a new station.
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

/**
 * @function
 * @desc Sets station search
 * @param {Object} stationSearch
 */
export const setStationSearch = (stationSearch: StationSearch) => (dispatch: Dispatch<any>) => {
  dispatch({ type: SET_STATION_SEARCH, data: stationSearch })
}