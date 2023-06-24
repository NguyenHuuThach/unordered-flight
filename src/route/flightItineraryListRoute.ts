import { Router } from "express";
import FlightItineraryListController from "../controllers/FlightItineraryListController";
import FlightItineraryListValidator from "../validator/FightItineraryListValidator";

const router = Router();

const flightItineraryListController = new FlightItineraryListController();
const flightItineraryListValidator = new FlightItineraryListValidator();

router.post(
  "/sorted-list",
  flightItineraryListValidator.fightItineraryListCreateValidator,
  flightItineraryListController.getSortedList
);

export default router;
