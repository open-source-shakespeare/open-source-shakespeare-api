import { Request, Response, NextFunction } from "express";
import { getChapterById, getChapters } from "../actions/chapter-actions";
import { BadRequestError } from "../util/errors";

export async function handleGetChapters(_: Request, res: Response, next: NextFunction) {
  try {
    const chapters = await getChapters();
    res.json(chapters);
  } catch (e) {
    next(e);
  }
}

export async function handleGetChapterById(req: Request, res: Response, next: NextFunction) {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) throw new BadRequestError("Please enter a number");
    const chapter = await getChapterById(id);
    res.json(chapter);
  } catch (e) {
    next(e);
  }
}
