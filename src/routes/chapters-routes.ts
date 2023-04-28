import express from "express";
import { handleGetChapterById, handleGetChapters } from "../controllers/chapter-controller";

const router = express.Router();

router.get("/", handleGetChapters);
router.get("/id/:id", handleGetChapterById);

export { router as chaptersRouter };
