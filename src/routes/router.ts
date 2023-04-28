import express from "express";

import { characterRouter } from "./character-routes";
import { chapterRouter } from "./chapter-routes";
import { genreRouter } from "./genre-routes";
import { NotFoundError } from "../util/errors";
import { paragraphRouter } from "./paragraph-routes";
import { quotationRouter } from "./quotation-routes";
import { wordFormRouter } from "./wordform-routes";

const router = express.Router();

router.use("/characters", characterRouter);
router.use("/chapters", chapterRouter);
router.use("/genres", genreRouter);
router.use("/paragraphs", paragraphRouter);
router.use("/quotations", quotationRouter);
router.use("/wordforms", wordFormRouter);
router.use("*", (_, __, next) => {
  next(new NotFoundError("The requested resource could not be found."));
});

export { router };
