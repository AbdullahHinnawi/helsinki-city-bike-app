// Station action types
export const FETCH_STATIONS = 'FETCH_STATIONS'
export const CREATE_STATION = 'CREATE_STATION'
export const SET_STATION_SEARCH = 'SET_STATION_SEARCH'
export const GET_STATION_STATS = 'GET_STATION_STATS'
export const SET_STATIONS_LOADING = 'SET_STATIONS_LOADING'
export const SET_CURRENT_STATION_LOADING = 'SET_CURRENT_STATION_LOADING'


type FetchStationsAction = {
  type: typeof FETCH_STATIONS
  data: any
};

type CreateStationAction = {
  type: typeof CREATE_STATION
  data: any
};

type SetStationSearchAction = {
  type: typeof SET_STATION_SEARCH
  data: StationSearch
};

type GetStationStatsAction = {
  type: typeof GET_STATION_STATS
  data: any
};

type SetStationsLoadingAction = {
  type: typeof SET_STATIONS_LOADING
  data: boolean
};

type SetCurrentStationLoadingAction = {
  type: typeof SET_CURRENT_STATION_LOADING
  data: boolean
};

export type StationAction = FetchStationsAction | CreateStationAction | SetStationSearchAction | GetStationStatsAction | SetStationsLoadingAction | SetCurrentStationLoadingAction;

export interface IStationDoc {
  _id?: any
  fid: number,
  stationId: number,
  nimi: string,
  namn: string,
  name: string,
  osoite: string,
  address: string,
  kaupunki: string | undefined,
  stad: string | undefined,
  operaattor: string | undefined,
  kapasiteet: number,
  x: number,
  y: number
}

export type StationsResponse = {
  docs: IStationDoc[],
  page: number,
  limit: number,
  totalDocs: number,
  totalPages: number,
  hasNextPage: boolean,
  hasPrevPage: boolean,
  nextPage: number,
  pagingCounter: number,
  prePage: number,
}

export type StationState = {
  stationsResponse: StationsResponse,
  stationsLoading: boolean,
  search: StationSearch,
  currentStation: any,
  currentStationLoading: boolean
};

export type StationSearch = {
  query: any,
  options: {
    page: number,
    limit: number
  }
};
