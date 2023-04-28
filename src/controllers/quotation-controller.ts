import { Request, Response, NextFunction } from "express";
import { getQuotations } from "../actions/quotation-actions";

export async function handleGetQuotations(_: Request, res: Response, next: NextFunction) {
  try {
    const quotations = await getQuotations();
    res.json(quotations);
  } catch (e) {
    next(e);
  }
}
