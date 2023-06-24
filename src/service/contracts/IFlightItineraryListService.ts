import { ApiServiceResponse } from "../../@types/apiServiceResponse";
import { IFlightItinerary } from "../../models/interfaces/IFlightItinerary";

export default interface IFlightItineraryListService {
  createFlightItineraryList: (
    list: Array<IFlightItinerary>,
    ip: string
  ) => Promise<ApiServiceResponse>;
}
