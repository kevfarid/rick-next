import { URL_API_RICK } from '@/constants';
import useFetch from '@/hooks/useFetch';
import useNewUser from '@/hooks/useNewUser';
import CharacterInfo from '@/interfaces/Character';
import Responses from '@/interfaces/Responses';
import { Inter } from 'next/font/google';
import Image from 'next/image';

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
  useNewUser();

  const { data } = useFetch<Responses<CharacterInfo>>(
    `${URL_API_RICK}/api/character`
  );

  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between p-24 ${inter.className}`}
    >
      <h1 className='text-6xl font-bold'>Rick and Morty</h1>

      <ul className='grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-4 w-full'>
        {data?.results?.map((character) => (
          <li key={character.id}>
            <Image
              src={character.image}
              alt={character.name}
              width={200}
              height={200}
            />
            <h2>{character.name}</h2>
          </li>
        ))}
      </ul>
    </main>
  );
}
