import { format, addColors, transports, createLogger } from "winston";

const levels = {
  error: 0,
  warn: 1,
  info: 2,
  http: 3,
  debug: 4,
};

const colors = {
  error: "red",
  warn: "yellow",
  info: "green",
  http: "magenta",
  debug: "white",
};

addColors(colors);

const formatLogger = format.combine(
  format.timestamp({ format: "YYYY-MM-DD HH:mm:ss:ms" }),
  format.colorize({ all: true }),
  format.json(),
  format.printf((info) => `${info.timestamp} ${info.level}: ${info.message}`)
);

const transportsLogger = [
  new transports.Console(),
  new transports.File({
    filename: "logs/error.log",
    level: "error",
  }),
  new transports.File({ filename: "logs/all.log" }),
];

const Logger = createLogger({
  level: "debug",
  levels,
  format: formatLogger,
  transports: transportsLogger,
});

export default Logger;
