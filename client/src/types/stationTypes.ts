// Station action types
export const FETCH_STATIONS = 'FETCH_STATIONS'
export const CREATE_STATION = 'CREATE_STATION'
export const SET_STATION_SEARCH = 'SET_STATION_SEARCH'

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

export type StationAction = FetchStationsAction | CreateStationAction | SetStationSearchAction;

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
  search: StationSearch
};

export type StationSearch = {
  query: any,
  options: {
    page: number,
    limit: number
  }
};
