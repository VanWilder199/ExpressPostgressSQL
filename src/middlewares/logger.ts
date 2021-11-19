import { NextFunction, Request, Response } from "express";
import Logger from "../lib/logger";

const loggerMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  Logger.http(`Path: ${req.path}, Method: ${req.method},  
    Body: ${JSON.stringify(req.body)}, Query: ${JSON.stringify(req.query)},`);
  next();
};

export default loggerMiddleware;
