import { Op } from "sequelize";
import { Work, WorkId } from "../models/Work";
import { NotFoundError, DatabaseError } from "../util/errors";
import { Chapter } from "../models/Chapter";
import { Genre } from "../models/Genre";
import { Paragraph } from "../models/Paragraph";

export async function getWorks(title?: string, genre?: string, date?: number): Promise<Work[]> {
  try {
    const where: any = {};
    const genreInclude: any = {
      model: Genre,
      as: "Genre",
    };

    if (genre) {
      genreInclude.where = {
        GenreName: {
          [Op.eq]: genre,
        },
      };
    }
    if (title) {
      where.title = {
        [Op.like]: `%${title}%`,
      };
    }
    if (date) {
      where.date = date;
    }
    const works = await Work.findAll({ where, include: genre ? [genreInclude] : [] });
    if (!works) {
      throw new NotFoundError("Work not found");
    }
    return works;
  } catch (e) {
    if (e instanceof NotFoundError) {
      throw e;
    } else {
      const errorMessage = e instanceof Error ? e.message : "Unknown database error";
      throw new DatabaseError(errorMessage);
    }
  }
}

export async function getWorkById(workId: WorkId, paragraphs?: boolean, chapters?: boolean): Promise<Work> {
  try {
    const where = {
      WorkId: {
        [Op.eq]: workId,
      },
    };
    const include = [];
    if (paragraphs) {
      include.push({
        model: Paragraph,
        as: "Paragraphs",
        where: Paragraph
          ? {
              WorkId: {
                [Op.like]: workId,
              },
            }
          : undefined,
      });
    }
    if (chapters) {
      include.push({
        model: Chapter,
        as: "Chapters",
        where: Chapter
          ? {
              WorkId: {
                [Op.like]: `%${workId}%`,
              },
            }
          : undefined,
      });
    }

    const work = await Work.findOne({ where, include });
    if (!work) {
      throw new NotFoundError("Work not found");
    }
    return work;
  } catch (e) {
    if (e instanceof NotFoundError) {
      throw e;
    } else {
      const errorMessage = e instanceof Error ? e.message : "Unknown database error";
      throw new DatabaseError(errorMessage);
    }
  }
}
