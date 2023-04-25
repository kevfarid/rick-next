import CharacterCard from '@/components/Characters/Card';
import useLocalStorage from '@/hooks/useLocalStorage';
import CharacterInfo from '@/interfaces/Character';
import { getMultipleCharacters } from '@/services/characters';
import CharactersList from '@/components/Characters/List';

import { PrismaClient } from '@prisma/client';
import { useCallback, useEffect, useState } from 'react';
import useFavorites from '@/hooks/useFavorites';
import Hero from '@/components/Hero';
import Link from 'next/link';
import LoadIcon from '@/components/icons/LoadIcon';
interface FavoritesProps {
  id: string;
  favoritesIds: number[];
}

export default function Favorite({ favoritesIds }: FavoritesProps) {
  const [isLoading, setIsLoading] = useState(true);

  const [characters, setCharacters] = useState<CharacterInfo[]>([]);

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    if (favoritesIds.length > 0) {
      await getMultipleCharacters(favoritesIds).then((response) => {
        setCharacters(response);
        setIsLoading(false);
      });
    } else {
      setCharacters([]);
    }
  }, [favoritesIds]);

  useEffect(() => {
    fetchData();
  }, [favoritesIds, fetchData]);

  return (
    <>
      <Hero />
      <div className='mx-auto w-full flex flex-col items-center gap-8 max-w-7xl'>
        <h2 className='text-4xl font-bold'>Favorites</h2>
        <CharactersList
          characters={characters}
          showFavorite={false}
          favorites={characters}
          isLoading={isLoading}
        />
        <Link
          href='/'
          className='ml-4 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded'
        >
          Create your list
        </Link>
      </div>
    </>
  );
}

export async function getStaticPaths() {
  const prisma = new PrismaClient();

  const user = await prisma.user.findMany();
  const paths = user.map((favorite) => ({
    params: { id: favorite.id.toString() },
  }));

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }: { params: FavoritesProps }) {
  const prisma = new PrismaClient();

  const userFind = await prisma.user.findUnique({
    where: {
      id: params.id,
    },
  });

  return {
    props: {
      id: params.id,
      favoritesIds: userFind!.favorites || [],
    },
  };
}
