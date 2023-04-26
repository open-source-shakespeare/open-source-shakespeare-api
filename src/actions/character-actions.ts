import { Optional } from "../util/utils";
import { Op } from "sequelize";
import { models } from "../database";
import { CharacterPlain, CharacterId } from "../models/Character";
import { NotFoundError, DatabaseError } from "../util/errors";

const { Character } = models;

export async function getCharacters(): Promise<CharacterPlain[]> {
  try {
    const characters = await Character.findAll();
    return characters.map((c) => c.format());
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
    const errorMessage = e instanceof Error ? e.message : "Unknown database error";
    throw new DatabaseError(errorMessage);
  }
}

export async function getCharacterByName(name: string): Promise<CharacterPlain> {
  try {
    const character = await Character.findOne({
      where: {
        CharName: {
          [Op.like]: name,
        },
      },
    });
    if (!character) {
      throw new NotFoundError("Character not found");
    }
    return character.format();
  } catch (e) {
    const errorMessage = e instanceof Error ? e.message : "Unknown database error";
    throw new DatabaseError(errorMessage);
  }
}
