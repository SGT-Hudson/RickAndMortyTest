import Image from 'next/image';
import { Character } from '../Types';
import styles from '../styles/Home.module.css';

const Character = ({ characterInfo }: { characterInfo: Character }) => {
  let location = characterInfo.location.name;
  let name = characterInfo.name;
  let image = characterInfo.image;

  return (
    <div className={styles.card}>
      <Image
        src={image}
        alt={name}
        width='200'
        height='200'
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
