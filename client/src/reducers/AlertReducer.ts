import { Alert, AlertAction, AlertSeverity, AlertState, GET_ALERT, REMOVE_ALERT, SET_ALERT } from './../types/AlertTypes'

const initialAlert: Alert = {
  message: '',
  severity: AlertSeverity.Success,
  open: false,
  duration: 7000
}

export const initialAlertState: AlertState = {
  alert: initialAlert
}

const AlertReducer = (state = initialAlertState, action: AlertAction): AlertState => {
  switch (action.type) {
    case GET_ALERT:
      return state
    case SET_ALERT:
      return {
        ...state,
        alert: action.alert
      }
    case REMOVE_ALERT:
      return (state = initialAlertState)
    default:
      return state
  }
}

export default AlertReducer