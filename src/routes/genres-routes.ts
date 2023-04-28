import express from "express";
import { handleGetGenres, handleGetGenreById, handleGetGenreByName } from "../controllers/genre-controller";

const router = express.Router();

router.get("/", handleGetGenres);
router.get("/id/:id", handleGetGenreById);
router.get("/name/:name", handleGetGenreByName);

export { router as genresRouter };
