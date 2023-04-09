// Journey action types
export const FETCH_JOURNEYS = 'FETCH_JOURNEYS'
export const CREATE_JOURNEY = 'CREATE_JOURNEY'

type FetchJourneysAction = {
  type: typeof FETCH_JOURNEYS
  data: any
};

type CreateJourneyAction = {
  type: typeof CREATE_JOURNEY
  data: any
};

export type JourneyAction = FetchJourneysAction | CreateJourneyAction;

export type JourneyState = {
  journeys: any[]
};

