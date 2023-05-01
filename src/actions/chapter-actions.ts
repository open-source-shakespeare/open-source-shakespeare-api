import { Chapter } from "../models/Chapter";
import { DatabaseError, NotFoundError } from "../util/errors";

export async function getChapters(): Promise<Chapter[]> {
  try {
    const chapters = await Chapter.findAll();
    return chapters;
  } catch (e) {
    const errorMessage = e instanceof Error ? e.message : "Unknown database error";
    throw new DatabaseError(errorMessage);
  }
}

export async function getChapterById(id: number): Promise<Chapter> {
  try {
    const chapter = await Chapter.findByPk(id);
    if (!chapter) {
      throw new NotFoundError("Chapter not found");
    }
    return chapter;
  } catch (e) {
    if (e instanceof NotFoundError) {
      throw e;
    } else {
      const errorMessage = e instanceof Error ? e.message : "Unknown database error";
      throw new DatabaseError(errorMessage);
    }
  }
}
