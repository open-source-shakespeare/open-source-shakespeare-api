import { WordForm } from "../models/WordForm";
import { DatabaseError } from "../util/errors";

export async function getWordForms(): Promise<WordForm[]> {
  try {
    const wordforms = await WordForm.findAll();
    return wordforms;
  } catch (e) {
    const errorMessage = e instanceof Error ? e.message : "Unknown database error";
    throw new DatabaseError(errorMessage);
  }
}
