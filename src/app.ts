import express from "express";
import usersRouter from "./routes/users.router";
import cors from "cors";
import groupRouter from "./routes/group.routers";
import loggerMiddleware from "./middlewares/logger";
import errorInternalServer from "./middlewares/errorInternalServer";
import authRouter from "./routes/auth.routers";
import { authMiddleware } from "./middlewares/auth";

export const app = express();

app.use(
  cors({
    methods: "GET, POST, PUT, DELETE",
    origin: "*",
  })
);
app.use(express.json());
app.use(loggerMiddleware);
app.use(authRouter);
app.use(authMiddleware);
app.use(usersRouter);
app.use(groupRouter);
app.use(errorInternalServer);
