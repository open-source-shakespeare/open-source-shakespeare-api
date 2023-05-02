import express from "express";
import { handleGetGenres, handleGetGenreById } from "../controllers/genre-controller";

const router = express.Router();

router.get("/", handleGetGenres);
router.get("/:id", handleGetGenreById);

export { router as genreRouter };
