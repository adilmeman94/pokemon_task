import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import capitalize from "../../../utils/capitalize";
import logger from "../../../utils/logger/logger";
import pokemonData from "../../../utils/pokeUtils/pokemonData";

const getAllPokemons = asyncHandler(async (req: Request, res: Response) => {
  try {
    let page: any = req.query.page ? parseInt(req.query.page as string) : 1;
    let q: any = req.query.q;
    let per_page: any = req.query.per_page
      ? parseInt(req.query.per_page as string)
      : 8;
    let type: any = req.query.type && capitalize(req.query.type as string);

    logger.log("type ===>", type);
    const IP = process.env.IP;
    let nextLink: string | null = null;
    let data: typeof pokemonData = [];
    let total = 0;
    if (q) {
      data = pokemonData.filter((d) =>
        d.name.english.toLowerCase().includes(q.toLowerCase())
      );
    } else {
      data = pokemonData;
    }
    if (type) {
      data = data.filter((d) => d.type.includes(type));
    }

    total = data.length;
    data = data.slice((page - 1) * per_page, page * per_page);
    if (total > page * per_page) {
      nextLink = `http://${IP || "localhost"}:5000/v3/pokemon?page=${
        page + 1
      }&q=${q || ""}&type=${type || ""}`;
    }
    res.json({
      data,
      total,
      next: nextLink,
    });
  } catch (error) {
    res.status(500).json(error);
    logger.logError("get all pokemon", error);
  }
});

export default getAllPokemons;
