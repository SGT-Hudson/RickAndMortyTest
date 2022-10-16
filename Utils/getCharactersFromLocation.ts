import { getCharacter, getLocation } from 'rickmortyapi';
import { Character, ApiResponse, Location } from '../Types';

export const getLastPartOfUrl = (url: string) => {
  return parseInt(url.substring(url.lastIndexOf('/') + 1));
};

export const charactersFromLocation = async (characterInfo: Character) => {
  // The types from the API are wrong here,
  //response.data.residents should be a string not a Character.
  //If that was fixed, the as unknown as ApiResponse<Location> would not be needed.
  const responseLocation = (await getLocation(
    getLastPartOfUrl(characterInfo.location.url)
  )) as unknown as ApiResponse<Location>;
  const characterIDs = responseLocation.data.residents.map((url) =>
    getLastPartOfUrl(url)
  );
  const responseCharacters = await getCharacter(characterIDs);
  return responseCharacters.data;
};
