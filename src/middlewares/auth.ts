import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "../common";
import jwt, { VerifyErrors } from "jsonwebtoken";

export async function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  const token = req.headers.authorization;

  if (!token) {
    res.status(StatusCodes.UNAUTHORIDED).send("No token");
  } else {
    jwt.verify(token, process.env.SECRET_KEY, (err: VerifyErrors) => {
      if (err) {
        res.status(StatusCodes.FORBIDDENERROR).send(err.message);
      }
      next();
    });
  }
}
