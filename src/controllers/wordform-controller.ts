import { Request, Response, NextFunction } from "express";
import { getWordForms } from "../actions/wordform-actions";

export async function handleGetWordForms(_: Request, res: Response, next: NextFunction) {
  try {
    const wordforms = await getWordForms();
    res.json(wordforms);
  } catch (e) {
    next(e);
  }
}
