import CharacterInfo from '@/interfaces/Character';
import CharacterCard from './Card';

import cn from 'classnames';
import LoadIcon from '../icons/LoadIcon';
import { Suspense } from 'react';

interface ListProps {
  characters: CharacterInfo[];
  isLoading?: boolean;
  favorites?: CharacterInfo[];
  toggleFavorite?: (character: CharacterInfo) => void;
  showFavorite?: boolean;
}

export default function CharactersList({
  characters,
  isLoading,
  favorites,
  toggleFavorite,
  showFavorite = true,
}: ListProps) {
  return (
    <ul
      className={cn(
        'grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-5 w-full px-8'
      )}
    >
      {!isLoading &&
        characters?.length > 0 &&
        characters?.map((character) => (
          <li key={character.id}>
            <CharacterCard
              onFavorite={() => toggleFavorite && toggleFavorite(character)}
              isFavorite={
                favorites?.some((fav) => fav.id === character.id) || false
              }
              {...character}
              showFavorite={showFavorite}
            />
          </li>
        ))}

      <li className='col-span-full'>
        {characters?.length === 0 && !isLoading && (
          <div className='flex justify-center items-center h-20'>
            <div className='text-gray-500'>No characters found</div>
          </div>
        )}
        {isLoading && (
          <div className='flex justify-center items-center h-20'>
            <LoadIcon className='w-6 h-6 animate-spin text-gray-500' />
          </div>
        )}
      </li>
    </ul>
  );
}
