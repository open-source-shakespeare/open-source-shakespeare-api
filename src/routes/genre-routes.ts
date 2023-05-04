import express from "express";
import { handleGetGenres, handleGetGenreByGenreType } from "../controllers/genre-controller";

const router = express.Router();

router.get("/", handleGetGenres);
router.get("/:genreType", handleGetGenreByGenreType);

export { router as genreRouter };
