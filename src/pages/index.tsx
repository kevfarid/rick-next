import CharacterCard from '@/components/Characters/Card';
import Pagination from '@/components/Pagination';
import useNewUser from '@/hooks/useNewUser';
import CharacterInfo from '@/interfaces/Character';
import Responses from '@/interfaces/Responses';
import { getCharacters } from '@/services/characters';
import { Inter } from 'next/font/google';
import { useEffect, useState } from 'react';

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
  useNewUser();

  const [page, setPage] = useState<number>(1);
  const [results, setResults] = useState<CharacterInfo[]>();
  const [info, setInfo] = useState<Responses['info']>();
  const [isLoading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    setLoading(true);
    getCharacters(page)
      .then((response) => {
        setResults(response.results);
        setInfo(response.info);
      })
      .finally(() => setLoading(false));
  }, [page]);

  return (
    <main
      className={`px-24 ${inter.className} flex flex-col w-full items-center gap-8`}
    >
      <h1 className='text-6xl font-bold'>Rick and Morty</h1>

      <ul className='grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-5 w-full'>
        {results?.map((character) => (
          <li
            key={character.id}
            className='cursor-pointer hover:scale-105 transition-all duration-100'
          >
            <CharacterCard
              {...character}
              href={`/characters/${character.id}`}
            />
          </li>
        ))}
      </ul>

      <Pagination
        count={info?.count || 0}
        handlePage={setPage}
        disabled={isLoading}
      />
    </main>
  );
}
