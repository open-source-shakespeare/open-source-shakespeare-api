import express from "express";
import { handleGetChapters } from "../controllers/chapter-controller";

const router = express.Router();

router.get("/", handleGetChapters);

export { router as chaptersRouter };
