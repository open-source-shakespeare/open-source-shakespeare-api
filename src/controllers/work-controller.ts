import { Request, Response, NextFunction } from "express";
import { BadRequestError } from "../util/errors";
import { getWorkById, getWorks } from "../actions/work-actions";

export async function handleGetWorks(req: Request, res: Response, next: NextFunction) {
  try {
    const { title, genre, date } = req.query;
    const parsedDate = parseInt(date as string);
    if (isNaN(parsedDate)) throw new BadRequestError("Please enter a number");
    const works = await getWorks(title as string, genre as string, parsedDate as number);
    res.json(works);
  } catch (e) {
    next(e);
  }
}

export async function handleGetWorkById(req: Request, res: Response, next: NextFunction) {
  try {
    const { id } = req.params;
    const work = await getWorkById(id, "paragraphs" in req.query, "chapters" in req.query);
    res.json(work);
  } catch (e) {
    next(e);
  }
}
