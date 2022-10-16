import Image from 'next/image';
import { Character } from '../Types';
import styles from '../styles/Home.module.css';
import { Dispatch, SetStateAction } from 'react';
import Link from 'next/link';

const CharacterCard = ({
  characterInfo,
  setSelectedCharacter,
  setShowModal,
}: {
  characterInfo: Character;
  setSelectedCharacter: Dispatch<SetStateAction<Character>>;
  setShowModal: Dispatch<SetStateAction<boolean>> | null;
}) => {
  let location = characterInfo.location.name;
  let name = characterInfo.name;
  let image = characterInfo.image;

  const onClickAction = () => {
    setSelectedCharacter(characterInfo);
    if (setShowModal) setShowModal(true);
  };

  return (
    <div
      className={styles.card}
      onClick={() => {
        if (setShowModal) onClickAction();
      }}
    >
      <Image
        src={image}
        alt={name}
        width='150'
        height='150'
        className={styles.roundImage}
      />
      <h3>{name}</h3>
      <p>{location}</p>
    </div>
  );
};

export default CharacterCard;
