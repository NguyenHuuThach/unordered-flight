import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";
import compression from "compression";
import express, { Express, NextFunction, Request, Response } from "express";
import httpStatus from "http-status";
import ApiError from "./helper/ApiError";
import { errorConverter, errorHandler } from "./middlewares/error";
import db from "./models";
import routes from "./route";

process.env.PWD = process.cwd();

const app: Express = express();

// init middleWares
app.use(
  cors({
    origin: "*",
  })
);

app.use(morgan("combined"));
app.use(helmet());
app.use(compression());
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.get("/api/v1/test", async (req, res) => {
  res.status(200).send("Congratulations!Typescript API is working!");
});

app.use("/api/v1", routes);

// send back a 404 error for any unknown api request
app.use((req: Request, res: Response, next: NextFunction) => {
  next(new ApiError(httpStatus.NOT_FOUND, "Not found"));
});

// convert error to ApiError, if needed
app.use(errorConverter);
// handle error
app.use(errorHandler);

// Uncomment this line if you want to sync database model
db.sequelize.sync();

export default app;
