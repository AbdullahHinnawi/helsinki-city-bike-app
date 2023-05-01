import { Dispatch } from 'react'
import { Alert, GET_ALERT, REMOVE_ALERT, SET_ALERT } from './../types/AlertTypes'

/**
 * @function
 * @desc Fetches current alert
 */
export const getAlert = () => (dispatch: Dispatch<any>) => {
  dispatch({ type: GET_ALERT })
}

/**
 * @function
 * @desc Sets alert
 * @param {Object} alert
 */
export const setAlert = (alert: Alert) => (dispatch: Dispatch<any>) => {
  dispatch({ type: SET_ALERT, alert })
}

/**
 * @function
 * @desc Removes current alert
 */
export const removeAlert = () => (dispatch: Dispatch<any>) => {
  dispatch({ type: REMOVE_ALERT })
}


