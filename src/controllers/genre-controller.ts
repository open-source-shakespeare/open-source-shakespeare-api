import { Request, Response, NextFunction } from "express";
import { getGenreById, getGenres } from "../actions/genre-actions";
import { BadRequestError } from "../util/errors";

export async function handleGetGenres(req: Request, res: Response, next: NextFunction) {
  try {
    const { name } = req.query;
    let parsedName;
    if (name) {
      if (typeof name !== "string") {
        throw new BadRequestError("Please enter a string");
      }
      parsedName = name;
    }
    const genres = await getGenres(parsedName as string);
    res.json(genres);
  } catch (e) {
    next(e);
  }
}

export async function handleGetGenreById(req: Request, res: Response, next: NextFunction) {
  try {
    const { id } = req.params;
    const genre = await getGenreById(id);
    res.json(genre);
  } catch (e) {
    next(e);
  }
}
