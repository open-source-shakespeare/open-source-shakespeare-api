import {getCharacters, getCharacterById} from "./actions/character-actions"

(async () => {
  try {
    const text = await getCharacterById("1apparition-mac");
    console.log(text);
  } catch (e) {
    console.error(e);
  }
})();

(async () => {
  try {
    const text = await getCharacters();
    console.log(text[1]);
  } catch (e) {
    console.error(e);
  }
})();