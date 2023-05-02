import { Op } from "sequelize";
import { Genre, GenreId } from "../models/Genre";
import { NotFoundError, DatabaseError } from "../util/errors";

export async function getGenres(name?: string): Promise<Genre[]> {
  try {
    const where: any = {};
    if (name) {
      where.GenreName = {
        [Op.like]: `%${name}%`,
      };
    }
    const genres = await Genre.findAll({ where });
    if (name && genres.length === 0) {
      throw new NotFoundError("Genre not found");
    }
    return genres;
  } catch (e) {
    if (e instanceof NotFoundError) {
      throw e;
    } else {
      const errorMessage = e instanceof Error ? e.message : "Unknown database error";
      throw new DatabaseError(errorMessage);
    }
  }
}

export async function getGenreById(id: GenreId): Promise<Genre> {
  try {
    const genre = await Genre.findByPk(id);
    if (!genre) {
      throw new NotFoundError("Genre not found");
    }
    return genre;
  } catch (e) {
    if (e instanceof NotFoundError) {
      throw e;
    } else {
      const errorMessage = e instanceof Error ? e.message : "Unknown database error";
      throw new DatabaseError(errorMessage);
    }
  }
}
