import Pagination from '@/components/Pagination';
import useFavorites from '@/hooks/useFavorites';
import CharacterInfo from '@/interfaces/Character';
import Responses from '@/interfaces/Responses';
import { getCharacters } from '@/services/characters';
import CharactersList from '@/components/Characters/List';
import Hero from '@/components/Hero';

import { ChangeEvent, useEffect, useState } from 'react';

export default function Home() {
  const [page, setPage] = useState<number>(1);
  const [search, setSearch] = useState<string>('');

  const [results, setResults] = useState<CharacterInfo[]>();
  const [info, setInfo] = useState<Responses['info']>();
  const [isLoading, setLoading] = useState<boolean>(true);

  const { favorites, toggleFavorite, error } = useFavorites();

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
    <>
      <Hero
        element={
          <input
            type='text'
            className='w-full max-w-[500px] p-4 rounded-md border-2 border-gray-300 focus:outline-none focus:border-indigo-500'
            placeholder='Search for a character'
            value={search}
            onChange={onSearch}
          />
        }
      />
      <div className='flex flex-col items-center w-full gap-4 relative max-w-7xl xl:mx-auto'>
        {error && (
          <div className='bg-red-300 text-red-800 py-3 px-6 rounded-md w-full sticky top-2 z-30'>
            <p className='text-sm font-semibold'>{error}</p>
          </div>
        )}
        <CharactersList
          characters={results || []}
          isLoading={isLoading}
          toggleFavorite={toggleFavorite}
          favorites={favorites}
        />
        <Pagination
          count={info?.count || 0}
          handlePage={setPage}
          disabled={isLoading}
          initialPage={page}
        />
      </div>
    </>
  );
}
