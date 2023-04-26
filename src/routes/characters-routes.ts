import express from "express";
import { handleGetCharacters, handleGetCharacterById, handleGetCharacterByName } from "../controllers/character-controller";

const router = express.Router();

router.get("/", handleGetCharacters);
router.get("/id/:id", handleGetCharacterById);
router.get("/name/:name", handleGetCharacterByName);

export { router as charactersRouter };
