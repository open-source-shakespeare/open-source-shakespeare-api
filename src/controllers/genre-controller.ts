import { Request, Response, NextFunction } from "express";
import { getGenreById, getGenres } from "../actions/genre-actions";
import { BadRequestError } from "../util/errors";

export async function handleGetGenres(req: Request, res: Response, next: NextFunction) {
  try {
    const { genre } = req.query;
    let parsedGenre;
    if (genre) {
      if (typeof genre !== "string") {
        throw new BadRequestError("Please enter a string");
      }
      parsedGenre = genre;
    }
    const genres = await getGenres(parsedGenre as string);
    res.json({ data: genres });
  } catch (e) {
    next(e);
  }
}

export async function handleGetGenreByGenreType(req: Request, res: Response, next: NextFunction) {
  try {
    const { genreType } = req.params;
    const genre = await getGenreById(genreType);
    res.json({ data: genre });
  } catch (e) {
    next(e);
  }
}
