import express from "express";
import { handleGetWorks, handleGetWorkById } from "../controllers/work-controller";

const router = express.Router();

router.get("/", handleGetWorks);
router.get("/:id", handleGetWorkById);

export { router as workRouter };
