import express from "express";

import dotenv from "dotenv";
import { logger } from "../middleware/logger";
import { charactersRouter } from "./characters-routes";
import { chaptersRouter } from "./chapters-routes";
import { genresRouter } from "./genres-routes";
import { NotFoundError } from "../util/errors";
import { errorHandler } from "../middleware/error-handler";

dotenv.config();

const router = express.Router();

router.use(logger);
router.use("/characters", charactersRouter);
router.use("/chapters", chaptersRouter);
router.use("/genres", genresRouter);
router.use("*", (_, __, next) => {
  next(new NotFoundError("The requested resource could not be found."));
});
router.use(errorHandler);

export { router };
