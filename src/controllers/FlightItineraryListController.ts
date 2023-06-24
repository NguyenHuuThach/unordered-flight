import { Request, Response } from "express";
import httpStatus from "http-status";
import { ApiServiceResponse } from "../@types/apiServiceResponse";
import FlightItineraryListService from "../service/implementations/FlightItineraryListService";

export default class FlightItineraryListController {
  private flightItineraryListService: FlightItineraryListService;

  constructor() {
    this.flightItineraryListService = new FlightItineraryListService();
  }

  getSortedList = async (req: Request, res: Response) => {
    try {
      const flightItineraryList: ApiServiceResponse =
        await this.flightItineraryListService.createFlightItineraryList(
          req.body.list,
          req.ip
        );
      const { status } = flightItineraryList.response;
      const { message, data } = flightItineraryList.response;
      res
        .status(flightItineraryList.statusCode)
        .send({ status, message, data });
    } catch (e) {
      res.status(httpStatus.BAD_GATEWAY).send(e);
    }
  };
}
