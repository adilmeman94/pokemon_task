import winston from "winston";

const productionLogger = () => {
  return winston.createLogger({
    level: "info",
    format: winston.format.json(),
    transports: [new winston.transports.Console()],
  });
};

export default productionLogger;
