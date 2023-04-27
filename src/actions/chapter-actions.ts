import { models } from "../database";
import { ChapterPlain } from "../models/Chapter";
import { DatabaseError } from "../util/errors";

const { Chapter } = models;

export async function getChapters(): Promise<ChapterPlain[]> {
  try {
    const chapters = await Chapter.findAll();
    return chapters.map((c) => c.format());
  } catch (e) {
    const errorMessage = e instanceof Error ? e.message : "Unknown database error";
    throw new DatabaseError(errorMessage);
  }
}
