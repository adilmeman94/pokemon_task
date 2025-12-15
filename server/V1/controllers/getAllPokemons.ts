import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import logger from "../../utils/logger/logger";
import pokemonData from "../../utils/pokeUtils/pokemonData";

const getAllPokemons = asyncHandler(async (req: Request, res: Response) => {
  try {
    let page: any = req.query.page;
    let q: any = req.query.q;
    const per_page = 60;
    if (page) {
      page = parseInt(page);
    } else {
      page = 1;
    }
    const IP = process.env.IP;
    let nextLink: string | null = null;
    let data: any;
    let total = 0;
    if (q) {
      let tempData = pokemonData.filter((d) =>
        d.name.english.toLowerCase().includes(q.toLowerCase())
      );
      data = tempData.slice((page - 1) * per_page, page * per_page);
      total = tempData.length;
      if (total > page * per_page) {
        nextLink = `http://${IP}:5000/v1/pokemon?page=${page + 1}&q=${q}`;
      }
    } else {
      data = pokemonData.slice((page - 1) * per_page, page * per_page);
      total = pokemonData.length;
      if (total > page * per_page) {
        nextLink = `http://${IP}:5000/v1/pokemon?page=${page + 1}`;
      }
    }
    res.json({
      data,
      total,
      next: nextLink,
    });
  } catch (error) {
    res.status(500).json(error);
    logger.logError("Add employee", error);
  }
});

export default getAllPokemons;
