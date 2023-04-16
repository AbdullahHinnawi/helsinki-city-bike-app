// ***** Journey types *****
export const FETCH_JOURNEYS = 'FETCH_JOURNEYS'
export const CREATE_JOURNEY = 'CREATE_JOURNEY'
export const SET_JOURNEY_SEARCH = 'SET_JOURNEY_SEARCH'
export const SET_JOURNEYS_LOADING = 'SET_JOURNEYS_LOADING'


type FetchJourneysAction = {
  type: typeof FETCH_JOURNEYS
  data: any
};

type CreateJourneyAction = {
  type: typeof CREATE_JOURNEY
  data: any
};

type SetJourneySearchAction = {
  type: typeof SET_JOURNEY_SEARCH
  data: JourneySearch
};

type SetJourneysLoadingAction = {
  type: typeof SET_JOURNEYS_LOADING
  data: boolean
};


export type JourneyAction = FetchJourneysAction | CreateJourneyAction | SetJourneySearchAction | SetJourneysLoadingAction;


export interface IJourneyDoc {
  _id?: any,
  departure: Date,
  return: Date,
  departureStationId: number,
  departureStationName: string,
  returnStationId: number,
  returnStationName: string,
  coveredDistance: number,
  duration: number
}

export type JourneysResponse = {
  docs: IJourneyDoc[],
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

export type JourneySearch = {
  query: any,
  options: {
    page: number,
    limit: number
  }
};

export type JourneyState = {
  journeysResponse: JourneysResponse,
  search: JourneySearch,
  journeysLoading: boolean
};
