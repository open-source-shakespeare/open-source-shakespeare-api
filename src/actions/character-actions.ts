import { Op } from "sequelize";
import { Character, CharacterId } from "../models/Character";
import { NotFoundError, DatabaseError } from "../util/errors";

export async function getCharacters(): Promise<Character[]> {
  try {
    const characters = await Character.findAll();
    return characters;
  } catch (e) {
    const errorMessage = e instanceof Error ? e.message : "Unknown database error";
    throw new DatabaseError(errorMessage);
  }
}

export async function getCharacterById(id: CharacterId): Promise<Character> {
  try {
    const character = await Character.findByPk(id);
    if (!character) {
      throw new NotFoundError("Character not found");
    }
    return character;
  } catch (e) {
    if (e instanceof NotFoundError) {
      throw e;
    } else {
      const errorMessage = e instanceof Error ? e.message : "Unknown database error";
      throw new DatabaseError(errorMessage);
    }
  }
}

export async function getCharactersByName(name: string): Promise<Character[]> {
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
    return characters;
  } catch (e) {
    if (e instanceof NotFoundError) {
      throw e;
    } else {
      const errorMessage = e instanceof Error ? e.message : "Unknown database error";
      throw new DatabaseError(errorMessage);
    }
  }
}
