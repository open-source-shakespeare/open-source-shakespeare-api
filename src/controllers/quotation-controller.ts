import { Request, Response, NextFunction } from "express";
import { getQuotationById, getQuotations } from "../actions/quotation-actions";
import { BadRequestError } from "../util/errors";

export async function handleGetQuotations(req: Request, res: Response, next: NextFunction) {
  try {
    const { work } = req.query;
    const quotations = await getQuotations(work as string);
    res.json(quotations);
  } catch (e) {
    next(e);
  }
}

export async function handleGetQuotationById(req: Request, res: Response, next: NextFunction) {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) throw new BadRequestError("Please enter a number");
    const quotation = await getQuotationById(id);
    res.json(quotation);
  } catch (e) {
    next(e);
  }
}
