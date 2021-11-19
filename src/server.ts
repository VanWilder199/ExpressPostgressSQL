import { createConnection } from "typeorm";
import { app } from "./app";
import Logger from "./lib/logger";

const PORT = process.env.PORT || 3000;

const start = async () => {
  await createConnection();
  app.listen(PORT, () => Logger.debug(`Running on port ${PORT}`));
};

start();

process.on("uncaughtException", (err) => {
  Logger.error("There is uncaught exception inside application", {
    errorMessage: err.message,
    stacktrace: err.stack,
  });
});

process.on("unhandledRejection", (reason) => {
  Logger.error(
    "There is unhandled promise rejection inside application",
    reason
  );
});
