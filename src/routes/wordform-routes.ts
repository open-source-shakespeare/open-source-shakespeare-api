import express from "express";
import { handleGetWordFormById, handleGetWordForms } from "../controllers/wordform-controller";

const router = express.Router();

router.get("/", handleGetWordForms);
router.get("/:id", handleGetWordFormById);

export { router as wordFormRouter };
