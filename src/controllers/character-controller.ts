import { Request, Response, NextFunction } from "express";
import { getCharacterById, getCharacters } from "../actions/character-actions";
import { BadRequestError } from "../util/errors";

export async function handleGetCharacters(req: Request, res: Response, next: NextFunction) {
  try {
    const { name } = req.query;
    let parsedName;
    if (name) {
      if (typeof name !== "string") {
        throw new BadRequestError("Please enter a string");
      }
      parsedName = name;
    }
    const characters = await getCharacters(parsedName as string);
    res.json({ data: characters });
  } catch (e) {
    next(e);
  }
}

export async function handleGetCharacterById(req: Request, res: Response, next: NextFunction) {
  try {
    const { id } = req.params;
    const character = await getCharacterById(id);
    res.json({ data: character });
  } catch (e) {
    next(e);
  }
}
