import { getCharacter, getLocation } from 'rickmortyapi';
import { Character } from '../Types';

export const getLastPartOfUrl = (url: string) => {
  return parseInt(url.substring(url.lastIndexOf('/') + 1));
};

export const charactersFromLocation = async (characterInfo: Character) => {
  const responseLocation = await getLocation(
    getLastPartOfUrl(characterInfo.location.url)
  );
  const characterIDs = responseLocation.data.residents.map((url) =>
    // The types from the API are wrong here, it should be a string not a Character.
    getLastPartOfUrl(url)
  );
  const responseCharacters = await getCharacter(characterIDs);
  return responseCharacters.data;
};
