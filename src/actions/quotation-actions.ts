import { Quotation } from "../models/Quotation";
import { DatabaseError } from "../util/errors";

export async function getQuotations(): Promise<Quotation[]> {
  try {
    const quotations = await Quotation.findAll();
    return quotations;
  } catch (e) {
    const errorMessage = e instanceof Error ? e.message : "Unknown database error";
    throw new DatabaseError(errorMessage);
  }
}
