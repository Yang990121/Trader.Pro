const { createLogger, transports, format } = require("winston");
const isProduction = process.env.NODE_ENV === "production";

let winstonFormat = format.combine(
  format.json(),
  format.prettyPrint(),
  format.colorize(),
  format.errors({ stack: true })
);

const logger = createLogger({
  format: winstonFormat,
  transports: [
    new transports.File({
      filename: "logs/info.log",
      level: "info",
    }),
  ],
  exceptionHandlers: [
    new transports.File({ level: "error", filename: "logs/exceptions.log" }),
  ],
});

if (isProduction) {
  winstonFormat = format.json();
} else {
  logger.add(
    new transports.Console({
      level: "info",
    })
  );
  logger.exceptions.handle(
    new transports.Console({
      level: "error",
    })
  );
}

module.exports = logger;
