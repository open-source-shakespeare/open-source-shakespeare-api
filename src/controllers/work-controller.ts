import { Request, Response, NextFunction } from "express";
import { getChaptersByWorkId, getWorkById, getWorkOutlineById, getWorks, getWorksByGenre, searchWorks } from "../actions/work-actions";
import { BadRequestError } from "../util/errors";

export async function handleGetWorks(_: Request, res: Response, next: NextFunction) {
  try {
    const work = await getWorks();
    res.json(work);
  } catch (e) {
    next(e);
  }
}

export async function handleGetWorkOutlineById(req: Request, res: Response, next: NextFunction) {
  try {
    const { id } = req.params;
    const work = await getWorkOutlineById(id);
    res.json(work);
  } catch (e) {
    next(e);
  }
}

export async function handleGetWorkById(req: Request, res: Response, next: NextFunction) {
  try {
    const { id } = req.params;
    const work = await getWorkById(id);
    res.json(work);
  } catch (e) {
    next(e);
  }
}

export async function handleGetChaptersByWorkId(req: Request, res: Response, next: NextFunction) {
  try {
    const { id } = req.params;
    const work = await getChaptersByWorkId(id);
    res.json(work);
  } catch (e) {
    next(e);
  }
}

export async function handleGetWorksByGenre(req: Request, res: Response, next: NextFunction) {
  try {
    const { genre } = req.params;
    const work = await getWorksByGenre(genre);
    res.json(work);
  } catch (e) {
    next(e);
  }
}

export async function handleSearchWorks(req: Request, res: Response, next: NextFunction) {
  try {
    const { title, genre, date } = req.query;
    let parsedDate;
    if (date) {
      if (typeof date !== "string" || isNaN(parseInt(date))) throw new BadRequestError("Please enter a number");
      parsedDate = parseInt(date);
    }
    const works = await searchWorks(title as string, genre as string, parsedDate as number);
    res.json(works);
  } catch (e) {
    next(e);
  }
}
