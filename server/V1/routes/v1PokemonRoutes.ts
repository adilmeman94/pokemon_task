import express from "express";
import getAllPokemons from "../controllers/getAllPokemons";

const v1PokemonRoutes = express.Router();

v1PokemonRoutes.get("/", getAllPokemons);

export default v1PokemonRoutes;
