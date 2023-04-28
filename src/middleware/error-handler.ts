import { Request, Response, NextFunction } from "express";

export function errorHandler(e: Error, _: Request, res: Response, next: NextFunction) {
  switch (e.constructor.name) {
    case "BadRequestError":
      res.status(400).json({ error: e.message });
      break;
    case "NotFoundError":
      res.status(404).json({ error: e.message });
      break;
    case "DatabaseError":
      res.status(500).json({ error: e.message });
      break;
    default:
      res.status(500).json({ error: "Fie, there is no such man; it is impossible." });
  }
}
