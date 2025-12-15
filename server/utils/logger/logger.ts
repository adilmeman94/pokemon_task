import winston from "winston";
import devLogger from "./devLogger";
import productionLogger from "./productionLogger";

let winstonlogger: winston.Logger;

if (process.env.NODE_ENV === "production") {
  winstonlogger = productionLogger();
} else {
  winstonlogger = devLogger();
}

const logger = {
  info: (...d: string[]) => {
    winstonlogger.info(d[0], d[1]);
  },
  error: (...d: string[]) => {
    winstonlogger.info(d[0], d[1]);
  },
  warn: (...d: string[]) => {
    winstonlogger.info(d[0], d[1]);
  },
  debug: (...d: string[]) => {
    winstonlogger.info(d[0], d[1]);
  },
  log: (...args: unknown[]) => {
    if (args[1]) {
      winstonlogger.debug(`${args[0]} => %o`, args[1]);
    } else {
      if (typeof args[0] === "string") {
        winstonlogger.debug(args[0]);
      } else {
        winstonlogger.debug(`%o`, args[0]);
      }
    }
  },
  logError: (...args: unknown[]) => {
    if (args[1]) {
      winstonlogger.error(`${args[0]} => %o`, args[1]);
    } else {
      if (typeof args[0] === "string") {
        winstonlogger.error(args[0]);
      } else {
        winstonlogger.error(`%o`, args[0]);
      }
    }
  },
};

export default logger;
