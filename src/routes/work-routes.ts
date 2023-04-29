import express from "express";
import {
  handleGetWorks,
  handleGetWorkById,
  handleGetWorksByGenre,
  handleGetWorkOutlineById,
  handleSearchWorks,
} from "../controllers/work-controller";

const router = express.Router();

router.get("/", handleGetWorks);
router.get("/search", handleSearchWorks);
router.get("/:id", handleGetWorkById);
router.get("/:id/outline", handleGetWorkOutlineById);
router.get("/genre/:genre", handleGetWorksByGenre);

export { router as workRouter };
