import { Op } from "sequelize";
import { models } from "../database";
import { WorkPlain, WorkId } from "../models/Work";
import { NotFoundError, DatabaseError } from "../util/errors";
import { Chapter } from "../models/Chapter";
import { Genre } from "../models/Genre";
import { Paragraph } from "../models/Paragraph";

const { Work } = models;

export async function getWorks(): Promise<WorkPlain[]> {
  try {
    const works = await Work.findAll();
    return works.map((_) => _.format());
  } catch (e) {
    const errorMessage = e instanceof Error ? e.message : "Unknown database error";
    throw new DatabaseError(errorMessage);
  }
}

export async function getWorkOutlineById(id: WorkId): Promise<WorkPlain> {
  try {
    const work = await Work.findByPk(id);
    if (!work) {
      throw new NotFoundError("Work not found");
    }
    return work.format();
  } catch (e) {
    if (e instanceof NotFoundError) {
      throw e;
    } else {
      const errorMessage = e instanceof Error ? e.message : "Unknown database error";
      throw new DatabaseError(errorMessage);
    }
  }
}

export async function getChaptersByWorkId(workId: WorkId): Promise<WorkPlain[]> {
  try {
    const chapters = await Work.findAll({
      include: [
        {
          model: Chapter,
          as: "chapters",
          where: Chapter
            ? {
                WorkId: {
                  [Op.like]: `%${workId}%`,
                },
              }
            : undefined,
        },
      ],
    });
    if (!chapters) {
      throw new NotFoundError("Work not found");
    }
    chapters.map((_) => _.format());
    return chapters;
  } catch (e) {
    if (e instanceof NotFoundError) {
      throw e;
    } else {
      const errorMessage = e instanceof Error ? e.message : "Unknown database error";
      throw new DatabaseError(errorMessage);
    }
  }
}

export async function getWorkById(workId: WorkId): Promise<WorkPlain[]> {
  try {
    const paragraphs = await Work.findAll({
      include: [
        {
          model: Paragraph,
          as: "paragraphs",
          where: Paragraph
            ? {
                WorkId: {
                  [Op.like]: `%${workId}%`,
                },
              }
            : undefined,
        },
        {
          model: Chapter,
          as: "chapters",
          where: Chapter
            ? {
                WorkId: {
                  [Op.like]: `%${workId}%`,
                },
              }
            : undefined,
        },
      ],
    });
    if (!paragraphs) {
      throw new NotFoundError("Work not found");
    }
    paragraphs.map((_) => _.format());
    return paragraphs;
  } catch (e) {
    if (e instanceof NotFoundError) {
      throw e;
    } else {
      const errorMessage = e instanceof Error ? e.message : "Unknown database error";
      throw new DatabaseError(errorMessage);
    }
  }
}

export async function getWorksByGenre(genre: string): Promise<WorkPlain[]> {
  try {
    const works = await Work.findAll({
      include: [
        {
          model: Genre,
          as: "genre",
          where: genre
            ? {
                GenreName: {
                  [Op.eq]: genre,
                },
              }
            : undefined,
          required: genre ? true : false,
        },
      ],
    });
    if (!works) {
      throw new NotFoundError("Work not found");
    }
    works.map((_) => _.format());
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

export async function searchWorks(title?: string, genre?: string, date?: number): Promise<WorkPlain[]> {
  try {
    const where: any = {};
    if (title) {
      where.Title = {
        where: {
          Title: {
            [Op.like]: `%${title}%`,
          },
        },
      };
    }
    if (date) {
      where.Date = {
        where: {
          Date: {
            [Op.eq]: date,
          },
        },
      };
    }
    if (genre) {
      where.Genre = {
        include: [
          {
            model: Genre,
            as: "genre",
            where: genre
              ? {
                  GenreName: {
                    [Op.eq]: genre,
                  },
                }
              : undefined,
            required: genre ? true : false,
          },
        ],
      };
    }
    const works = await Work.findAll(where);
    if (!works) {
      throw new NotFoundError("Work not found");
    }
    return works.map((_) => _.format());
  } catch (e) {
    if (e instanceof NotFoundError) {
      throw e;
    } else {
      const errorMessage = e instanceof Error ? e.message : "Unknown database error";
      throw new DatabaseError(errorMessage);
    }
  }
}
