import Image from 'next/image';
import { Character } from '../Types';
import styles from '../styles/Home.module.css';
import { Dispatch, SetStateAction } from 'react';
import Link from 'next/link';

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
    setShowModal(true);
    console.log(characterInfo);
  };

  return (
    <div className={styles.card} onClick={() => onClickAction()}>
      <Image
        src={image}
        alt={name}
        width='150'
        height='150'
        className={styles.roundImage}
      />
      <h3>{name.length > 20 ? `${name.substring(0, 20)}...` : name}</h3>

      <p className='text-slate-300  text-[12px]'>
        {location.length > 25 ? `${location.substring(0, 25)}...` : location}
      </p>
    </div>
  );
};

export default Character;
