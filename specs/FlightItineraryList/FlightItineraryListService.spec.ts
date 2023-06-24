import { expect } from "chai";
import httpStatus from "http-status";
import "mocha";
import sinon from "sinon";
import FlightItineraryListService from "../../src/service/implementations/FlightItineraryListService";
import FlightItineraryListDao from "../../src/dao/implementations/FlightItineraryListDao";
import models from "../../src/models";
import {
  IFlightItinerary,
  IFlightItineraryList,
} from "../../src/models/interfaces/IFlightItinerary";
import { da } from "date-fns/locale";

const FlightItineraryList = models.itineraries;

let flightItineraryListService;

const list: IFlightItinerary[] = [
  { from: "GRU", to: "SCL" },
  { from: "MIA", to: "SFO" },
  { from: "SFO", to: "GRU" },
  { from: "EZE", to: "MIA" },
];

const listHaveTheSameDepartAirport: IFlightItinerary[] = [
  { from: "SFO", to: "SCL" },
  { from: "MIA", to: "SFO" },
  { from: "SFO", to: "GRU" },
  { from: "EZE", to: "MIA" },
];

const listHaveTheSameDestinationAirport: IFlightItinerary[] = [
  { from: "GRU", to: "SCL" },
  { from: "MIA", to: "SFO" },
  { from: "SFO", to: "MIA" },
  { from: "EZE", to: "MIA" },
];

const listHaveAnOrphanFlight: IFlightItinerary[] = [
  { from: "GRU", to: "SCL" },
  { from: "MIA", to: "SFO" },
  { from: "SFO", to: "GRU" },
  { from: "EZE", to: "MIA" },
  { from: "AAA", to: "DDD" },
];

const ip: string = "192.168.0.1";

describe("Get sorted list", () => {
  beforeEach(() => {
    flightItineraryListService = new FlightItineraryListService();
  });
  afterEach(() => {
    sinon.restore();
  });

  it("Get sorted list successfully and store in DB", async () => {
    const expectedResponse = {
      statusCode: httpStatus.CREATED,
      response: {
        status: true,
        code: httpStatus.CREATED,
        message: "Successfully Create Flight Itinerary List!",
        data: [
          {
            from: "EZE",
            to: "MIA",
          },
          {
            from: "MIA",
            to: "SFO",
          },
          {
            from: "SFO",
            to: "GRU",
          },
          {
            from: "GRU",
            to: "SCL",
          },
        ],
      },
    };
    const dataModel = new FlightItineraryList({
      id: 1,
      list: JSON.stringify(list),
      ip,
    });

    sinon
      .stub(FlightItineraryListDao.prototype, "getSortedList")
      .callsFake(() => {
        return dataModel;
      });

    const getSortedList =
      await flightItineraryListService.createFlightItineraryList(list, ip);
    expect(getSortedList).to.deep.include(expectedResponse);
  });

  it("Get sorted list fail because have the same depart airport", async () => {
    const expectedResponse = {
      statusCode: httpStatus.BAD_REQUEST,
      response: {
        status: false,
        code: httpStatus.BAD_REQUEST,
        message: "Have the same depart airport!",
      },
    };
    const dataModel = new FlightItineraryList({
      id: 1,
      list: JSON.stringify(listHaveTheSameDepartAirport),
      ip,
    });

    sinon
      .stub(FlightItineraryListDao.prototype, "getSortedList")
      .callsFake(() => {
        return dataModel;
      });

    const getSortedList =
      await flightItineraryListService.createFlightItineraryList(
        listHaveTheSameDepartAirport,
        ip
      );
    expect(getSortedList).to.deep.include(expectedResponse);
  });

  it("Get sorted list fail because have the same destination airport", async () => {
    const expectedResponse = {
      statusCode: httpStatus.BAD_REQUEST,
      response: {
        status: false,
        code: httpStatus.BAD_REQUEST,
        message: "Have the same destination airport!",
      },
    };
    const dataModel = new FlightItineraryList({
      id: 1,
      list: JSON.stringify(listHaveTheSameDestinationAirport),
      ip,
    });

    sinon
      .stub(FlightItineraryListDao.prototype, "getSortedList")
      .callsFake(() => {
        return dataModel;
      });

    const getSortedList =
      await flightItineraryListService.createFlightItineraryList(
        listHaveTheSameDestinationAirport,
        ip
      );
    expect(getSortedList).to.deep.include(expectedResponse);
  });

  it("Get sorted list fail because have an orphan flight", async () => {
    const expectedResponse = {
      statusCode: httpStatus.BAD_REQUEST,
      response: {
        status: false,
        code: httpStatus.BAD_REQUEST,
        message: "There is an orphan flight!",
      },
    };
    const dataModel = new FlightItineraryList({
      id: 1,
      list: JSON.stringify(listHaveAnOrphanFlight),
      ip,
    });

    sinon
      .stub(FlightItineraryListDao.prototype, "getSortedList")
      .callsFake(() => {
        return dataModel;
      });

    const getSortedList =
      await flightItineraryListService.createFlightItineraryList(
        listHaveAnOrphanFlight,
        ip
      );
    expect(getSortedList).to.deep.include(expectedResponse);
  });
});
