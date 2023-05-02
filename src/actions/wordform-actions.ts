import { WordForm } from "../models/WordForm";
import { DatabaseError, NotFoundError } from "../util/errors";

export async function getWordForms(): Promise<WordForm[]> {
  try {
    const wordforms = await WordForm.findAll();
    return wordforms;
  } catch (e) {
    const errorMessage = e instanceof Error ? e.message : "Unknown database error";
    throw new DatabaseError(errorMessage);
  }
}

export async function getWordFormById(id: number): Promise<WordForm> {
  try {
    const wordform = await WordForm.findByPk(id);
    if (!wordform) {
      throw new NotFoundError("WordForms not found");
    }
    return wordform;
  } catch (e) {
    if (e instanceof NotFoundError) {
      throw e;
    } else {
      const errorMessage = e instanceof Error ? e.message : "Unknown database error";
      throw new DatabaseError(errorMessage);
    }
  }
}
