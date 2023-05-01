// Alert action types
export const GET_ALERT = 'GET_ALERT'
export const SET_ALERT = 'SET_ALERT'
export const REMOVE_ALERT = 'REMOVE_ALERT'

export enum AlertSeverity {
  Error = 'error',
  Success = 'success',
  Warning = 'warning',
  Info = 'info'
}

export type Alert = {
  open: boolean
  message: string,
  severity: AlertSeverity,
  duration?: number | null
}

type GetAlertAction = {
  type: typeof GET_ALERT
}
type SetAlertAction = {
  type: typeof SET_ALERT,
  alert: Alert
}

type RemoveAlertAction = {
  type: typeof REMOVE_ALERT
}

export type AlertAction = GetAlertAction | SetAlertAction | RemoveAlertAction

export type AlertState = {
  alert: Alert,
}