import Image from 'next/image';
import CharacterCard from './CharacterCard';
import { Character } from '../Types';
import styles from '../styles/Home.module.css';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { charactersFromLocation } from '../Utils/getCharactersFromLocation';

const CharacterModal = ({
  characterInfo,
  setSelectedCharacter,
  setShowModal,
}: {
  characterInfo: Character;
  setSelectedCharacter: Dispatch<SetStateAction<Character>>;
  setShowModal: Dispatch<SetStateAction<boolean>>;
}) => {
  let location = characterInfo.location.name;
  let name = characterInfo.name;
  let image = characterInfo.image;

  const [characterList, setCharacterList] = useState<Character[]>([]);

  useEffect(() => {
    const getCharacters = async () => {
      const characters = await charactersFromLocation(characterInfo);
      setCharacterList(characters);
    };
    if (characterInfo.location.url.length > 0) getCharacters();
  }, [characterInfo]);

  return (
    <div className={styles.modal}>
      <div onClick={() => setShowModal(false)} className={styles.overlay}></div>
      <div className={styles.modalContent}>
        <Image
          src={image}
          alt={name}
          width='150'
          height='150'
          className={styles.roundImage}
        />
        <h2>{name}</h2>
        <p>{location}</p>
        {characterList.length > 0 && (
          <>
            <hr />
            <p>Other characters from this location:</p>
            <section className={styles.gridModal}>
              {characterList.map((value) => (
                <CharacterCard
                  key={value.id}
                  characterInfo={value}
                  setSelectedCharacter={() => setSelectedCharacter(value)}
                  setShowModal={null}
                />
              ))}
            </section>
          </>
        )}
        <button
          className={styles.closeButton}
          onClick={() => setShowModal(false)}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default CharacterModal;
