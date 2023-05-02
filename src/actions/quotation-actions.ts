import { Op } from "sequelize";
import { Quotation } from "../models/Quotation";
import { DatabaseError, NotFoundError } from "../util/errors";

export async function getQuotations(work?: string): Promise<Quotation[]> {
  try {
    const where: any = {};
    if (work) {
      where.Location = {
        [Op.like]: `%${work}%`,
      };
    }
    const quotations = await Quotation.findAll({ where });
    return quotations;
  } catch (e) {
    const errorMessage = e instanceof Error ? e.message : "Unknown database error";
    throw new DatabaseError(errorMessage);
  }
}

export async function getQuotationById(id: number): Promise<Quotation> {
  try {
    const quotation = await Quotation.findByPk(id);
    if (!quotation) {
      throw new NotFoundError("Quotation not found");
    }
    return quotation;
  } catch (e) {
    if (e instanceof NotFoundError) {
      throw e;
    } else {
      const errorMessage = e instanceof Error ? e.message : "Unknown database error";
      throw new DatabaseError(errorMessage);
    }
  }
}
