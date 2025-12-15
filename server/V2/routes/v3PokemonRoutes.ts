import express from "express";
import { authMiddleware } from "../../middleware/authMiddleware";
import getAllPokemons from "../controllers/pokemon/getAllPokemons";
import getPokemonTypes from "../controllers/pokemon/getPokemonTypes";

const v3pokemonRoutes = express.Router();

v3pokemonRoutes.get("/", authMiddleware, getAllPokemons);
v3pokemonRoutes.get("/types", authMiddleware, getPokemonTypes);

export default v3pokemonRoutes;
