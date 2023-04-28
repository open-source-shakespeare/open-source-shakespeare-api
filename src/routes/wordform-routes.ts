import express from "express";
import { handleGetWordForms } from "../controllers/wordform-controller";

const router = express.Router();

router.get("/", handleGetWordForms);

export { router as wordFormRouter };
