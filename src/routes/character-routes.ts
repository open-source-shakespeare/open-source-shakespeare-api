import express from "express";
import { handleGetCharacters, handleGetCharacterById } from "../controllers/character-controller";

const router = express.Router();

router.get("/", handleGetCharacters);
router.get("/:id", handleGetCharacterById);

export { router as characterRouter };
