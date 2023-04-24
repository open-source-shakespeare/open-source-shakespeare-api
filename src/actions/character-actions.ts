import Character from "../models/character";

export async function getCharacters(): Promise<Character[]> {
  const characters = await Character.findAll();
  return characters.map(c => c.get({plain: true}))
}

export async function getCharacterById(id: String): Promise<Character> {
  const [character] = await Character.findAll({
    where: {
      CharID: id
    }
  });
  return character.get({plain: true});
}
