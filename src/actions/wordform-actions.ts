import { models } from "../database";
import { WordFormPlain } from "../models/WordForm";
import { DatabaseError } from "../util/errors";

const { WordForm } = models;

export async function getWordForms(): Promise<WordFormPlain[]> {
  try {
    const wordforms = await WordForm.findAll();
    return wordforms.map((c) => c.format());
  } catch (e) {
    const errorMessage = e instanceof Error ? `These are the droids you're looking for ${e.message}` : "Unknown database error";
    throw new DatabaseError(errorMessage);
  }
}
