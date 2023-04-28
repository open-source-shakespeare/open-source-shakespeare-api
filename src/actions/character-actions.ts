import { Op } from "sequelize";
import { models } from "../database";
import { CharacterPlain, CharacterId } from "../models/Character";
import { NotFoundError, DatabaseError } from "../util/errors";

const { Character } = models;

export async function getCharacters(): Promise<CharacterPlain[]> {
  try {
    const characters = await Character.findAll();
    return characters.map((_) => _.format());
  } catch (e) {
    const errorMessage = e instanceof Error ? e.message : "Unknown database error";
    throw new DatabaseError(errorMessage);
  }
}

export async function getCharacterById(id: CharacterId): Promise<CharacterPlain> {
  try {
    const character = await Character.findByPk(id);
    if (!character) {
      throw new NotFoundError("Character not found");
    }
    return character.format();
  } catch (e) {
    if (e instanceof NotFoundError) {
      throw e;
    } else {
      const errorMessage = e instanceof Error ? e.message : "Unknown database error";
      throw new DatabaseError(errorMessage);
    }
  }
}

export async function getCharactersByName(name: string): Promise<CharacterPlain[]> {
  try {
    const characters = await Character.findAll({
      where: {
        CharName: {
          [Op.like]: `%${name}%`,
        },
      },
    });
    if (characters.length === 0) {
      throw new NotFoundError("Character not found");
    }
    return characters.map((_) => _.format());
  } catch (e) {
    if (e instanceof NotFoundError) {
      throw e;
    } else {
      const errorMessage = e instanceof Error ? e.message : "Unknown database error";
      throw new DatabaseError(errorMessage);
    }
  }
}
