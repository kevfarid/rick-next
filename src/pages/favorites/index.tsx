import CharactersList from '@/components/Characters/List';
import Hero from '@/components/Hero';
import useFavorites from '@/hooks/useFavorites';
import useLocalStorage from '@/hooks/useLocalStorage';
import CharacterInfo from '@/interfaces/Character';
import { getMultipleCharacters } from '@/services/characters';
import { useEffect, useState } from 'react';

export default function Favorites() {
  const { favorites, toggleFavorite } = useFavorites();

  return (
    <>
      <Hero />
      <div className='flex w-full justify-center relative'>
        <h2 className='text-2xl font-bold justify-self-center text-center'>
          Your Favorites {favorites.length}/5
        </h2>
        <button className='ml-4 absolute top-1 right-0 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>
          Share
        </button>
      </div>
      <CharactersList
        characters={favorites}
        favorites={favorites}
        toggleFavorite={toggleFavorite}
      />
    </>
  );
}
