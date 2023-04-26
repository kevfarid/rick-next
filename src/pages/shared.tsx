import CharacterInfo from '@/interfaces/Character';
import { getMultipleCharacters } from '@/services/characters';
import CharactersList from '@/components/Characters/List';
import { getFavoritesIds } from '@/services/favorites';

import { useCallback, useEffect, useState } from 'react';
import Hero from '@/components/Hero';
import Link from 'next/link';
import { useRouter } from 'next/router';

export default function Favorite() {
  const [isLoading, setIsLoading] = useState(true);
  const [favoritesIds, setFavoritesIds] = useState<number[]>([]);
  const [characters, setCharacters] = useState<CharacterInfo[]>([]);

  const { query } = useRouter();

  const fetchData = useCallback(async () => {
    setIsLoading(true);

    if (!favoritesIds) {
      setIsLoading(false);
      return;
    }

    if (favoritesIds.length > 0) {
      await getMultipleCharacters(favoritesIds).then((response) => {
        setCharacters(response);
        setIsLoading(false);
      });
    } else {
      setCharacters([]);
    }
  }, [favoritesIds]);

  const getFavorites = useCallback(() => {
    const { id } = query;
    if (id) {
      getFavoritesIds(id as string).then((response) => {
        console.log(response);
        setFavoritesIds(response);
      });
    }
  }, [query]);

  useEffect(() => {
    getFavorites();
  }, [getFavorites]);

  useEffect(() => {
    fetchData();
  }, [fetchData, favoritesIds]);

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

// export async function getStaticPaths() {
//   const prisma = new PrismaClient();

//   const user = await prisma.user.findMany();
//   const paths = user.map((favorite) => ({
//     params: { id: favorite.id.toString() },
//   }));

//   return {
//     paths,
//     fallback: false,
//   };
// }

// export async function getStaticProps(context: GetStaticPropsContext) {
//   cons
//   const prisma = new PrismaClient();

//   const userFind = await prisma.user.findUnique({
//     where: {
//       id: params.id,
//     },
//   });

//   return {
//     props: {
//       id: params.id,
//       favoritesIds: userFind!.favorites || [],
//     },
//   };
// }
