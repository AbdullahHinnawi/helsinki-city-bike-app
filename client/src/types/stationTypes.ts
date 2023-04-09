// Station action types
export const FETCH_STATIONS = 'FETCH_STATIONS'
export const CREATE_STATION = 'CREATE_STATION'

type FetchStationsAction = {
  type: typeof FETCH_STATIONS
  data: any
};

type CreateStationAction = {
  type: typeof CREATE_STATION
  data: any
};

export type StationAction = FetchStationsAction | CreateStationAction;

export type StationState = {
  stations: any[]
};
