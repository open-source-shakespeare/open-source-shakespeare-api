import { Request, Response, NextFunction } from "express";
import { BadRequestError } from "../util/errors";
import { getWorkById, getWorks } from "../actions/work-actions";

export async function handleGetWorks(req: Request, res: Response, next: NextFunction) {
  try {
    const { title, genre, date } = req.query;
    const parsedDate = parseInt(date as string);
    if (date && isNaN(parsedDate)) throw new BadRequestError("Please enter a number");
    const works = await getWorks(title as string, genre as string, parsedDate as number);
    res.json({ data: works });
  } catch (e) {
    next(e);
  }
}

export async function handleGetWorkById(req: Request, res: Response, next: NextFunction) {
  try {
    const { id } = req.params;
    const { paragraphs, chapters } = req.query;
    const parsedParagraphs =
      typeof paragraphs === "string" && (paragraphs as string).toLowerCase() === "true";
    const parsedChapters = typeof chapters === "string" && (chapters as string).toLowerCase() === "true";
    const work = await getWorkById(id, parsedParagraphs, parsedChapters);
    res.json({ data: work });
  } catch (e) {
    next(e);
  }
}
