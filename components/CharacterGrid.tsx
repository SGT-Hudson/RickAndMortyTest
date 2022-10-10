import CharacterCard from './CharacterCard';
import { Character } from '../Types';

export default function CharacterGrid({
  characterList,
}: {
  characterList: Character[];
}) {
  return (
    <div>
      {characterList.map((value) => (
        <CharacterCard key={value.id} characterInfo={value} />
      ))}
    </div>
  );
}
