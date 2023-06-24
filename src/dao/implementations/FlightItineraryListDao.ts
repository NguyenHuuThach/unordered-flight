import models from "../../models";
import { IFlightItinerary } from "../../models/interfaces/IFlightItinerary";
import IFlightItineraryListDao from "../contracts/IFlightItineraryListDao";
import SuperDao from "./SuperDao";

const FlightItineraryList = models.itineraries;

export default class FlightItineraryListDao
  extends SuperDao
  implements IFlightItineraryListDao
{
  constructor() {
    super(FlightItineraryList);
  }

  async getSortedList(list: Array<IFlightItinerary>, ip: string) {
    return FlightItineraryList.create({ list, ip });
  }
}
