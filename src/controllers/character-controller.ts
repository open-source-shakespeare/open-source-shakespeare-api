import { Request, Response } from "express";
import { getCharacterByName, getCharacterById, getCharacters } from "../actions/character-actions";
import { DatabaseError, NotFoundError } from "../util/errors";

export async function handleGetCharacters(_: Request, res: Response) {
  try {
    const characters = await getCharacters();
    res.json(characters);
  } catch (e) {
    const errorMessage = e instanceof DatabaseError ? e.message : "Fie, there is no such man; it is impossible.";
    res.status(500).json({ error: errorMessage });
  }
}

export async function handleGetCharacterById(req: Request, res: Response) {
  try {
    const id = req.params.id;
    const character = await getCharacterById(id);
    res.json(character);
  } catch (e) {
    if (e instanceof NotFoundError) {
      res.status(404).json({ error: e.message });
    } else {
      const errorMessage = e instanceof DatabaseError ? e.message : "Fie, there is no such man; it is impossible.";
      res.status(500).json({ error: errorMessage });
    }
  }
}

export async function handleGetCharacterByName(req: Request, res: Response) {
  try {
    const name = req.params.name;
    const character = await getCharacterByName(name);
    res.json(character);
  } catch (e) {
    if (e instanceof NotFoundError) {
      res.status(404).json({ error: e.message });
    } else {
      const errorMessage = e instanceof DatabaseError ? e.message : "Fie, there is no such man; it is impossible.";
      res.status(500).json({ error: errorMessage });
    }
  }
}
