/* eslint-disable @typescript-eslint/no-shadow */
import httpStatus from "http-status";
import responseHandler from "../../helper/responseHandler";
import IFlightItineraryListService from "../contracts/IFlightItineraryListService";
import { IFlightItinerary } from "../../models/interfaces/IFlightItinerary";
import FlightItineraryListDao from "../../dao/implementations/FlightItineraryListDao";
import { appearsOnceInArrayValues } from "../../helper/utilityHelper";

export default class FlightItineraryListService
  implements IFlightItineraryListService
{
  private flightItineraryListDao: FlightItineraryListDao;

  constructor() {
    this.flightItineraryListDao = new FlightItineraryListDao();
  }

  createFlightItineraryList = async (
    list: Array<IFlightItinerary>,
    ip: string
  ) => {
    try {
      const ok = this.checkValidItineraries(list);
      if (ok !== true) {
        return responseHandler.returnError(httpStatus.BAD_REQUEST, `${ok}`);
      }
      let message = "Successfully Create Flight Itinerary List!";
      let data = null;
      data = this.sortItinerary(list);
      if (!Array.isArray(data)) {
        message = data;
        return responseHandler.returnError(httpStatus.BAD_REQUEST, message);
      }
      await this.flightItineraryListDao.create({
        list: JSON.stringify(data),
        ip,
      });

      return responseHandler.returnSuccess(httpStatus.CREATED, message, data);
    } catch (e) {
      console.log(e);
      return responseHandler.returnError(
        httpStatus.BAD_REQUEST,
        "Something went wrong!"
      );
    }
  };

  checkValidItineraries = (
    itineraries: IFlightItinerary[]
  ): boolean | string => {
    if (itineraries.length === 1 && itineraries[0].from !== itineraries[0].to)
      return true;

    const destinationArr = itineraries.map((e) => e.to);
    const originArr = itineraries.map((e) => e.from);

    // Check if user input the same destination airport
    if (
      appearsOnceInArrayValues(destinationArr).length !== destinationArr.length
    ) {
      return "Have the same destination airport!";
    }

    // Check if user input the same depart airport
    if (appearsOnceInArrayValues(originArr).length !== originArr.length) {
      return "Have the same depart airport!";
    }

    return true;
  };

  sortItinerary = (
    flights: IFlightItinerary[]
  ): IFlightItinerary[] | string => {
    const itinerary: { [key: string]: string } = {};
    const result = [];

    // change [{from: 'xxx', to: 'yyy'}] --> {xxx: 'yyy'}
    for (const flight of flights) {
      itinerary[flight.from] = flight.to;
    }

    const sortedItinerary: string[] = [];
    // Get the first itinerary
    const start: string = Object.keys(itinerary).find(
      (key: string) => !Object.values(itinerary).includes(key)
    )!;
    if (!start) {
      // For case return flight
      return "Have the same destination airport!";
    }
    sortedItinerary.push(start);

    while (sortedItinerary.length <= flights.length) {
      const nextDest: string =
        itinerary[sortedItinerary[sortedItinerary.length - 1]];
      if (!nextDest) {
        // For case orphan flight
        return "There is an orphan flight!";
      }
      sortedItinerary.push(nextDest);
    }

    for (let index = 0; index < sortedItinerary.length - 1; index++) {
      result.push({
        from: sortedItinerary[index],
        to: sortedItinerary[index + 1],
      });
    }

    return result;
  };
}
