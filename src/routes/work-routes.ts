import express from "express";
import {
  handleGetWorks,
  handleGetWorkById,
  handleSearchWorks,
  handleGetWorksByGenre,
  handleGetWorkOutlineById
} from "../controllers/work-controller";

const router = express.Router();

router.get("/", handleGetWorks);
router.get("/:id", handleGetWorkById);
router.get("/:id/outline", handleGetWorkOutlineById);
router.get("/genre/:genre", handleGetWorksByGenre);
router.get("/search", handleSearchWorks);

export { router as workRouter };
