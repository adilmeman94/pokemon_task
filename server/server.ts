import dotenv from "dotenv";
import express, { Express } from "express";

import cors from "cors";

import v1PokemonRoutes from "./V1/routes/v1PokemonRoutes";
import usersRoutes from "./V2/routes/usersRouts";
import v3pokemonRoutes from "./V2/routes/v3PokemonRoutes";
import { errorHandler, notFound } from "./middleware/errorMiddleware";
import logger from "./utils/logger/logger";
const app: Express = express();
dotenv.config();

app.use(express.json());
app.use(cors());
app.use("/api/check", (req, res) => {
  res.send("working....");
});

app.use("/v1/pokemon", v1PokemonRoutes);
app.use("/v3/pokemon", v3pokemonRoutes);
app.use("/v3/user", usersRoutes);

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
let IP = process.env.IP;

if (IP) {
  // @ts-ignore
  app.listen(PORT, IP, () => {
    logger.info(`Base URL: http://${IP}:${PORT}`);
  });
} else {
  app.listen(PORT, () => {
    logger.info(`Base URL: http://localhost:${PORT}`);
  });
}
