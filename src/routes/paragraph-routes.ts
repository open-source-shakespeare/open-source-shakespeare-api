import express from "express";
import {
  handleGetParagraphs,
  handleGetParagraphById,
  handleSearchParagraphs,
} from "../controllers/paragraph-controller";

const router = express.Router();

router.get("/", handleGetParagraphs);
router.get("/id/:id", handleGetParagraphById);
router.get("/search", handleSearchParagraphs);

export { router as paragraphRouter };
