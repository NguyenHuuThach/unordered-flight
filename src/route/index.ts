import { Router } from "express";
import flightItineraryListRoute from "./flightItineraryListRoute";

const router = Router();

const defaultRoutes = [
  {
    path: "/flight-itinerary-list",
    route: flightItineraryListRoute,
  },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

export default router;
