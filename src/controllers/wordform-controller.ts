import { Request, Response, NextFunction } from "express";
import { getWordFormById, getWordForms } from "../actions/wordform-actions";
import { BadRequestError } from "../util/errors";

export async function handleGetWordForms(_: Request, res: Response, next: NextFunction) {
  try {
    const wordforms = await getWordForms();
    res.json({ data: wordforms });
  } catch (e) {
    next(e);
  }
}

export async function handleGetWordFormById(req: Request, res: Response, next: NextFunction) {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) throw new BadRequestError("Please enter a number");
    const wordform = await getWordFormById(id);
    res.json({ data: wordform });
  } catch (e) {
    next(e);
  }
}
