import Image from 'next/image';
import { Character } from '../Types';
import styles from '../styles/Home.module.css';
import { Dispatch, SetStateAction } from 'react';

const Character = ({
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

  const onClickAction = () => {
    setSelectedCharacter(characterInfo);
    console.log(characterInfo);
  };

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

export default Character;
