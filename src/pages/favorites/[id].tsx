import CharacterCard from '@/components/Characters/Card';
import useLocalStorage from '@/hooks/useLocalStorage';
import CharacterInfo from '@/interfaces/Character';
import { getMultipleCharacters } from '@/services/characters';
import CharactersList from '@/components/Characters/List';

import { PrismaClient } from '@prisma/client';
import { useEffect, useState } from 'react';
import useFavorites from '@/hooks/useFavorites';
interface FavoritesProps {
  id: string;
  favoritesIds: number[];
}

export default function Favorite({ favoritesIds }: FavoritesProps) {
  const [isLoading, setIsLoading] = useState(true);

  const [characters, setCharacters] = useState<CharacterInfo[]>([]);

  useEffect(() => {
    setIsLoading(true);
    if (favoritesIds.length > 0) {
      getMultipleCharacters(favoritesIds).then((response) => {
        setCharacters(response), setIsLoading(false);
      });
    } else {
      setCharacters([]);
    }
    setIsLoading(false);
  }, [favoritesIds]);

  return (
    <>
      <h1 className='text-6xl font-bold'>Rick and Morty</h1>
      <h2 className='text-4xl font-bold'>Favorites</h2>
      <CharactersList
        characters={characters}
        showFavorite={false}
        favorites={favoritesIds}
        isLoading={isLoading}
      />
    </>
  );
}

export async function getStaticPaths() {
  if (process.env.SKIP_BUILD_STATIC_GENERATION) {
    return {
      paths: [],
      fallback: 'blocking',
    };
  }

  const prisma = new PrismaClient();

  const user = await prisma.user.findMany();
  const paths = user.map((favorite) => ({
    params: { id: favorite.id.toString() },
  }));

  prisma.$disconnect();

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

  prisma.$disconnect();

  return {
    props: {
      id: params.id,
      favoritesIds: userFind!.favorites || [],
    },
  };
}
