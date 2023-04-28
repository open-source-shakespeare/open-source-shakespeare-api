import { models } from "../database";
import { ChapterId, ChapterPlain } from "../models/Chapter";
import { DatabaseError, NotFoundError } from "../util/errors";

const { Chapter } = models;

export async function getChapters(): Promise<ChapterPlain[]> {
  try {
    const chapters = await Chapter.findAll();
    return chapters.map((_) => _.format());
  } catch (e) {
    const errorMessage = e instanceof Error ? e.message : "Unknown database error";
    throw new DatabaseError(errorMessage);
  }
}

export async function getChapterById(id: ChapterId): Promise<ChapterPlain> {
  try {
    const chapter = await Chapter.findByPk(id);
    if (!chapter) {
      throw new NotFoundError("Chapter not found");
    }
    return chapter.format();
  } catch (e) {
    if (e instanceof NotFoundError) {
      throw e;
    } else {
      const errorMessage = e instanceof Error ? e.message : "Unknown database error";
      throw new DatabaseError(errorMessage);
    }
  }
}
