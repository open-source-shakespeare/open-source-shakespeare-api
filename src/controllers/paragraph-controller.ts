import { Request, Response, NextFunction } from "express";
import { getParagraphById, getParagraphs } from "../actions/paragraph-actions";
import { BadRequestError } from "../util/errors";

export async function handleGetParagraphs(req: Request, res: Response, next: NextFunction) {
  try {
    const { term, workId, charId, workInfo } = req.query;
    let parsedWorkInfo = false;
    if ((workInfo as string).toLowerCase() === "true") {
      parsedWorkInfo = true;
    }
    const paragraphs = await getParagraphs(
      term as string[],
      workId as string,
      charId as string,
      parsedWorkInfo
    );
    res.json({ data: paragraphs });
  } catch (e) {
    next(e);
  }
}

export async function handleGetParagraphById(req: Request, res: Response, next: NextFunction) {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) throw new BadRequestError("Please enter a number");
    const paragraph = await getParagraphById(id);
    res.json({ data: paragraph });
  } catch (e) {
    next(e);
  }
}
