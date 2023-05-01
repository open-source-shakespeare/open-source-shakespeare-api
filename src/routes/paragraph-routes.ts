import express from "express";
import { handleGetParagraphById, handleSearchParagraphs } from "../controllers/paragraph-controller";

const router = express.Router();

router.get("/", handleSearchParagraphs);
router.get("/:id", handleGetParagraphById);

export { router as paragraphRouter };
