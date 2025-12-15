import { createLogger, format, transports } from "winston";
const { combine, timestamp, label, printf } = format;

const myFormat = printf(({ level, message, label, timestamp }) => {
  return `${level}: ${message}`;
});

const devLogger = () => {
  return createLogger({
    level: "debug",
    format: combine(
      format.prettyPrint(),
      format.splat(),
      format.colorize(),
      myFormat
    ),
    transports: [new transports.Console()],
  });
};

export default devLogger;
