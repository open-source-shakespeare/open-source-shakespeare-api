import { models } from "../database";
import { ParagraphPlain, ParagraphId } from "../models/Paragraph";
import { NotFoundError, DatabaseError } from "../util/errors";

const { Paragraph } = models;

export async function getParagraphs(): Promise<ParagraphPlain[]> {
  try {
    const paragraphs = await Paragraph.findAll();
    return paragraphs.map((c) => c.format());
  } catch (e) {
    const errorMessage = e instanceof Error ? e.message : "Unknown database error";
    throw new DatabaseError(errorMessage);
  }
}

export async function getParagraphById(id: ParagraphId): Promise<ParagraphPlain> {
  try {
    const paragraph = await Paragraph.findByPk(id);
    if (!paragraph) {
      throw new NotFoundError("Paragraph not found");
    }
    return paragraph.format();
  } catch (e) {
    if (e instanceof NotFoundError) {
      throw e;
    } else {
      const errorMessage = e instanceof Error ? e.message : "Unknown database error";
      throw new DatabaseError(errorMessage);
    }
  }
}
