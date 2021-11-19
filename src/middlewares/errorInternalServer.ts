import { NextFunction, Request, Response } from "express";
import Logger from "../lib/logger";
import { StatusCodes } from "../common";

export const errorInternalServer = (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  res.status(StatusCodes.INTERNALSERVERERROR).send("Internal Server Error");
  Logger.error(`Status: 500, ${error.name}: ${error.message}`);
  next();
};

export default errorInternalServer;
