import { Request, Response, NextFunction } from "express";
import { getChapters } from "../actions/chapter-actions";

export async function handleGetChapters(_: Request, res: Response, next: NextFunction) {
  try {
    const chapters = await getChapters();
    res.json(chapters);
  } catch (e) {
    next(e);
  }
}
