import { Request, Response, NextFunction } from "express";
import { getGenreByName, getGenreById, getGenres } from "../actions/genre-actions";

export async function handleGetGenres(_: Request, res: Response, next: NextFunction) {
  try {
    const genres = await getGenres();
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

export async function handleGetGenreByName(req: Request, res: Response, next: NextFunction) {
  try {
    const { name } = req.params;
    const genre = await getGenreByName(name);
    res.json(genre);
  } catch (e) {
    next(e);
  }
}
