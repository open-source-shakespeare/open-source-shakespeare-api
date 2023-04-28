import { Op } from "sequelize";
import { models } from "../database";
import { GenrePlain, GenreId } from "../models/Genre";
import { NotFoundError, DatabaseError } from "../util/errors";

const { Genre } = models;

export async function getGenres(): Promise<GenrePlain[]> {
  try {
    const genres = await Genre.findAll();
    return genres.map((c) => c.format());
  } catch (e) {
    const errorMessage = e instanceof Error ? e.message : "Unknown database error";
    throw new DatabaseError(errorMessage);
  }
}

export async function getGenreById(id: GenreId): Promise<GenrePlain> {
  try {
    const genre = await Genre.findByPk(id);
    if (!genre) {
      throw new NotFoundError("Genre not found");
    }
    return genre.format();
  } catch (e) {
    if (e instanceof NotFoundError) {
      throw e;
    } else {
      const errorMessage = e instanceof Error ? e.message : "Unknown database error";
      throw new DatabaseError(errorMessage);
    }
  }
}

export async function getGenreByName(name: string): Promise<GenrePlain> {
  try {
    const genre = await Genre.findOne({
      where: {
        GenreName: {
          [Op.like]: `%${name}%`,
        },
      },
    });
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
