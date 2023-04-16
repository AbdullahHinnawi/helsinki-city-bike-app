import { FETCH_STATIONS, CREATE_STATION, StationSearch, SET_STATION_SEARCH, GET_STATION_STATS, SET_CURRENT_STATION_LOADING, SET_STATIONS_LOADING } from './../types/stationTypes'
import stationService from './../services/stationService'
import { Dispatch } from 'redux'

/**
 * @function
 * @desc Fetches the stations
 * @param {Object} stationSearch
 */
export const fetchStations = (stationSearch: any) => async (dispatch: Dispatch<any>) => {
  try {
    dispatch({ type: SET_STATIONS_LOADING, data: true })
    const result = await stationService.getStations(stationSearch)
    dispatch({ type: FETCH_STATIONS, data: result })
    dispatch({ type: SET_STATIONS_LOADING, data: false })
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

/**
 * @function
 * @desc Gets station statistics
 * @param stationId
 */
export const getStationStats = (stationId: number) => async (dispatch: Dispatch<any>) => {
  try {
    dispatch({ type: SET_CURRENT_STATION_LOADING, data: true })
    const stationStats = await stationService.getStationStats(stationId)
    dispatch({ type: GET_STATION_STATS, data: stationStats })
    dispatch({ type: SET_CURRENT_STATION_LOADING, data: false })
  } catch (error) {
    console.log(error)
  }
}