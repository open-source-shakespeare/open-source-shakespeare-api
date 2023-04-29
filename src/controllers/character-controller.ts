import { Request, Response, NextFunction } from "express";
import { getCharactersByName, getCharacterById, getCharacters } from "../actions/character-actions";

export async function handleGetCharacters(_: Request, res: Response, next: NextFunction) {
  try {
    const characters = await getCharacters();
    res.json(characters);
  } catch (e) {
    next(e);
  }
}

export async function handleGetCharacterById(req: Request, res: Response, next: NextFunction) {
  try {
    const { id } = req.params;
    const character = await getCharacterById(id);
    res.json(character);
  } catch (e) {
    next(e);
  }
}

export async function handleGetCharactersByName(req: Request, res: Response, next: NextFunction) {
  try {
    const { name } = req.params;
    const character = await getCharactersByName(name);
    res.json(character);
  } catch (e) {
    next(e);
  }
}
