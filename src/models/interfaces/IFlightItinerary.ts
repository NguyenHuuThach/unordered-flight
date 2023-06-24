export interface IFlightItinerary {
  from: string;
  to: string;
}

export interface IFlightItineraryList {
  id?: number;
  list: string;
  ip: string;
  created_at?: Date;
  updated_at?: Date;
}
