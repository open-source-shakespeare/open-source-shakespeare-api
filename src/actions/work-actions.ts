import { Op } from "sequelize";
import { Work, WorkId } from "../models/Work";
import { NotFoundError, DatabaseError } from "../util/errors";
import { Chapter } from "../models/Chapter";
import { Genre } from "../models/Genre";
import { Paragraph } from "../models/Paragraph";

export async function getWorks(): Promise<Work[]> {
  try {
    const works = await Work.findAll();
    return works;
  } catch (e) {
    const errorMessage = e instanceof Error ? e.message : "Unknown database error";
    throw new DatabaseError(errorMessage);
  }
}

export async function getWorkOutlineById(id: WorkId): Promise<Work> {
  try {
    const work = await Work.findByPk(id);
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

export async function getWorkById(workId: WorkId): Promise<Work> {
  try {
    const paragraph = await Work.findOne({
      include: [
        {
          model: Paragraph,
          as: "Paragraphs",
          where: Paragraph
            ? {
                WorkId: {
                  [Op.like]: workId,
                },
              }
            : undefined,
        },
        {
          model: Chapter,
          as: "Chapters",
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
    if (!paragraph) {
      throw new NotFoundError("Work not found");
    }
    return paragraph;
  } catch (e) {
    if (e instanceof NotFoundError) {
      throw e;
    } else {
      const errorMessage = e instanceof Error ? e.message : "Unknown database error";
      throw new DatabaseError(errorMessage);
    }
  }
}

export async function getWorksByGenre(genre: string): Promise<Work[]> {
  try {
    const works = await Work.findAll({
      include: [
        {
          model: Genre,
          as: "Genre",
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

export async function searchWorks(title?: string, genre?: string, date?: number): Promise<Work[]> {
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
    const works = await Work.findAll({ where, include: [genreInclude] });
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
