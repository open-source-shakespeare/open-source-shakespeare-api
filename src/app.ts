import { Character } from './models/Character';
import { sequelize } from './util/database';


async function getCharacters(): Promise<Character[]> {
  const result = await Character.findAll();
  return result;
}

async function getCharacterById(id: String): Promise<Character[]> {
  const result = await Character.findAll({
    where: {
      CharID: id
    }
  });
  return result;
}


(async () => {
  try {
    const text = await getCharacterById("1apparition-mac");
    console.log(text[0].dataValues);
  } catch (e) {
    console.error(e);
  }
})();
