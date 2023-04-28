import express from "express";
import { handleGetQuotations } from "../controllers/quotation-controller";

const router = express.Router();

router.get("/", handleGetQuotations);

export { router as quotationRouter };
