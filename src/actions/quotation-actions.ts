import { models } from "../database";
import { QuotationPlain } from "../models/Quotation";
import { DatabaseError } from "../util/errors";

const { Quotation } = models;

export async function getQuotations(): Promise<QuotationPlain[]> {
  try {
    const quotations = await Quotation.findAll();
    return quotations.map((c) => c.format());
  } catch (e) {
    const errorMessage = e instanceof Error ? e.message : "Unknown database error";
    throw new DatabaseError(errorMessage);
  }
}
