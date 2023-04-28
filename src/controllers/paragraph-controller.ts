import { Request, Response, NextFunction } from "express";
import { getParagraphById, getParagraphs } from "../actions/paragraph-actions";
import { BadRequestError } from "../util/errors";

export async function handleGetParagraphs(_: Request, res: Response, next: NextFunction) {
  try {
    const paragraphs = await getParagraphs();
    res.json(paragraphs);
  } catch (e) {
    next(e);
  }
}

export async function handleGetParagraphById(req: Request, res: Response, next: NextFunction) {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) throw new BadRequestError("Please enter a number");
    const paragraph = await getParagraphById(id);
    res.json(paragraph);
  } catch (e) {
    next(e);
  }
}
