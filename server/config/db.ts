import mongoose from "mongoose";
import logger from "../utils/logger/logger";

const connectDB = async () => {
  logger.info("Connecting to DB..........");
  return new Promise((resolve, reject) => {
    mongoose
      .connect(process.env.MONGO_URI as string)
      .then((db) => {
        logger.info("Database Connected Successfuly.", db.connection.host);
        resolve("");
      })
      .catch((err) => {
        logger.error("Error Connectiong to the Database", err);
        reject(err);
      });
  });
};

export default connectDB;
