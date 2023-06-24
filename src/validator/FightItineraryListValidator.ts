/* eslint-disable class-methods-use-this */
import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";
import Joi from "joi";
import ApiError from "../helper/ApiError";

export default class FlightItineraryListValidator {
  async fightItineraryListCreateValidator(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    // create schema object

    const fightItineraryItem = Joi.object().keys({
      from: Joi.string().alphanum().max(30).required(),
      to: Joi.string()
        .alphanum()
        .max(30)
        .invalid(Joi.ref("from"))
        .required()
        .label(
          "The place of departure cannot be the same as the place of arrival"
        ),
    });

    const schema = Joi.object({
      list: Joi.array()
        .items(fightItineraryItem)
        .unique((a, b) => a.from === b.from && a.to === b.to),
    });

    // schema options
    const options = {
      abortEarly: false, // include all errors
      allowUnknown: true, // ignore unknown props
      stripUnknown: true, // remove unknown props
    };

    // validate request body against schema
    const { error, value } = schema.validate(req.body, options);

    if (error) {
      // on fail return comma separated errors
      const errorMessage = error.details
        .map((details) => {
          return details.message;
        })
        .join(", ");
      next(new ApiError(httpStatus.BAD_REQUEST, errorMessage));
    } else {
      // on success replace req.body with validated value and trigger next middleware function
      req.body = value;
      return next();
    }
  }
}
