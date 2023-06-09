import express from "express";
import { handleGetParagraphs, handleGetParagraphById } from "../controllers/paragraph-controller";

const router = express.Router();

router.get("/", handleGetParagraphs);
router.get("/:id", handleGetParagraphById);

export { router as paragraphRouter };
