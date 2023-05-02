import express from "express";
import { handleGetQuotationById, handleGetQuotations } from "../controllers/quotation-controller";

const router = express.Router();

router.get("/", handleGetQuotations);
router.get("/:id", handleGetQuotationById);

export { router as quotationRouter };
