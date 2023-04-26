import {Character, CharacterId, CharacterPlain } from "../models/Character";
import { Optional } from "../util/utils"

export async function getCharacters(): Promise<Optional<CharacterPlain[]>> {
  const characters = await Character.findAll();
  return characters.map(c => c.format());
}

export async function getCharacterById(id: CharacterId): Promise<Optional<CharacterPlain>> {
  const character = await Character.findOne({
    where: {
      CharID: id
    }
  });
  return character ? character.format() : null;
}
