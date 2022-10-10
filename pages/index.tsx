import { ReactElement, useEffect, useState } from 'react';
import Head from 'next/head';
import styles from '../styles/Home.module.css';
import { getCharacters } from 'rickmortyapi';
import { GetServerSideProps } from 'next';
import { Info, Character } from '../Types';
import CharacterCard from '../components/CharacterCard';
import Image from 'next/image';
import CharacterModal from '../components/CharacterModal';

export default function Home({
  characters,
}: {
  characters: Info<Character[]>;
}): ReactElement {
  console.log(characters);
  const [page, setPage] = useState(1);
  const [selectedCharacter, setSelectedCharacter] = useState({} as Character);
  const [showModal, setShowModal] = useState(false);

  function openModal(character: Character): void {
    console.log(character);
    setSelectedCharacter(character);
    setShowModal(true);
  }

  function closeModal(): void {
    setShowModal(false);
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Rickedex</title>
        <meta
          name='description'
          content='Search for characters of the Rick and Morty universe'
        />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <header>
        <h1 className={styles.title}>Rickedex</h1>
      </header>
      <main className={styles.main}>
        <section className={styles.grid}>
          {characters.results &&
            characters.results.map((value) => (
              <CharacterCard
                key={value.id}
                characterInfo={value}
                setSelectedCharacter={() => setSelectedCharacter(value)}
                setShowModal={() => setShowModal(true)}
              />
            ))}
        </section>
        {showModal ? (
          <CharacterModal
            characterInfo={selectedCharacter}
            setSelectedCharacter={() => setSelectedCharacter(selectedCharacter)}
            setShowModal={() => setShowModal(false)}
          />
        ) : null}
      </main>
      <footer className={styles.footer}>
        <a
          href='https://www.linkedin.com/in/gonzalo-salvador/'
          target='_blank'
          rel='noopener noreferrer'
        >
          Created by Gonzalo S. for Tattoox
        </a>
      </footer>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  const result = await getCharacters({ page: 1 });
  const characters = result.data;
  return {
    props: {
      characters,
    },
  };
};
