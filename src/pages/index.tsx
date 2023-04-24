import CharacterCard from '@/components/Characters/Card';
import Pagination from '@/components/Pagination';
import useNewUser from '@/hooks/useNewUser';
import useFavorites from '@/hooks/useFavorites';
import CharacterInfo from '@/interfaces/Character';
import Responses from '@/interfaces/Responses';
import { getCharacters } from '@/services/characters';

import { Inter } from 'next/font/google';
import { ChangeEvent, useEffect, useState } from 'react';
import cn from 'classnames';

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
  useNewUser();

  const [page, setPage] = useState<number>(1);
  const [search, setSearch] = useState<string>('');

  const [results, setResults] = useState<CharacterInfo[]>();
  const [info, setInfo] = useState<Responses['info']>();
  const [isLoading, setLoading] = useState<boolean>(true);

  const {
    favorites,
    toggleFavorite,
    isLoading: isLoadingFav,
    error,
  } = useFavorites();

  useEffect(() => {
    setLoading(true);
    getCharacters(page, search)
      .then((response) => {
        setResults(response.results);
        setInfo(response.info);
      })
      .finally(() => setLoading(false));
  }, [page, search]);

  const onSearch = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setPage(1);
    setSearch(value);
  };

  return (
    <main
      className={`px-24 ${inter.className} flex flex-col w-full items-center gap-8 mb-8`}
    >
      <h1 className='text-6xl font-bold'>Rick and Morty</h1>
      <input
        type='text'
        className='w-full max-w-[500px] p-4 rounded-md border-2 border-gray-300 focus:outline-none focus:border-indigo-500'
        placeholder='Search for a character'
        value={search}
        onChange={onSearch}
      />
      {error && (
        <div className='bg-red-500/30 text-red-800 py-3 px-6 rounded-md w-full'>
          <p className='text-sm font-semibold'>{error}</p>
        </div>
      )}
      {results && results.length > 0 ? (
        <>
          <ul
            className={cn(
              'grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-5 w-full',
              {
                'opacity-50': isLoading,
              }
            )}
          >
            {results?.map((character) => (
              <li key={character.id}>
                <CharacterCard
                  isLoading={isLoadingFav}
                  onFavorite={() => toggleFavorite(Number(character.id))}
                  isFavorite={favorites.includes(Number(character.id))}
                  {...character}
                />
              </li>
            ))}
          </ul>
          <Pagination
            count={info?.count || 0}
            handlePage={setPage}
            disabled={isLoading}
            initialPage={page}
          />
        </>
      ) : (
        <h2 className='text-base font-semibold'>No results found</h2>
      )}
    </main>
  );
}
