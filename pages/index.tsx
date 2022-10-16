import { ReactElement, useEffect, useState } from 'react';
import Head from 'next/head';
import styles from '../styles/Home.module.css';
import { getCharacters } from 'rickmortyapi';
import { GetServerSideProps } from 'next';
import { Info, Character } from '../Types';
import CharacterCard from '../components/CharacterCard';
import CharacterModal from '../components/CharacterModal';

export default function Home({
  characters,
}: {
  characters: Info<Character[]>;
}): ReactElement {
  const [characterList, setCharacterList] =
    useState<Info<Character[]>>(characters);
  const [page, setPage] = useState(1);
  const [selectedCharacter, setSelectedCharacter] = useState({} as Character);
  const [showModal, setShowModal] = useState(false);

  let maxPage = 0;
  if (characterList.info) {
    maxPage = characterList.info.pages;
  }

  const getNewPage = async (page: number) => {
    const newPage = await getCharacters({ page });
    setCharacterList(newPage.data);
  };

  useEffect(() => {
    getNewPage(page);
  }, [page]);

  return (
    <div className={styles.container}>
      <Head>
        <title>Rickpedia</title>
        <meta
          name='description'
          content='Search for characters of the Rick and Morty universe'
        />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <header>
        <h1 className={styles.title}>Rickedex</h1>
      </header>
      <nav className={styles.nav}>
        <button
          onClick={() => {
            if (page > 1) setPage(page - 1);
          }}
        >
          Previous
        </button>
        <h2>
          Page {page}/{maxPage}
        </h2>
        <button
          onClick={() => {
            if (characterList.info && page < characterList.info?.pages)
              setPage(page + 1);
          }}
        >
          Next
        </button>
      </nav>

      <main className={styles.main}>
        <section className={styles.grid}>
          {characterList.results &&
            characterList.results.map((value) => (
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
        <p>
          Created by Gonzalo S. -{' '}
          <a
            href='https://www.linkedin.com/in/gonzalo-salvador/'
            target='_blank'
            rel='noopener noreferrer'
          >
            LinkedIn
          </a>
          {' - '}
          <a
            href='https://github.com/SGT-Hudson/Rickpedia'
            target='_blank'
            rel='noopener noreferrer'
          >
            Github Repo
          </a>
        </p>
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
