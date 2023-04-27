import { Request, Response, NextFunction } from "express";
import { NotFoundError, DatabaseError } from "../util/errors";

export function errorHandler(err: Error, _: Request, res: Response, next: NextFunction) {
  if (err instanceof NotFoundError) {
    res.status(404).json({ error: err.message });
  } else {
    const errorMessage = err instanceof DatabaseError ? err.message : "Fie, there is no such man; it is impossible.";
    res.status(500).json({ error: errorMessage });
  }
}
