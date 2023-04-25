import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';
import cn from 'classnames';

export default function Header() {
  const router = useRouter();

  return (
    <header className='flex px-2 py-4 justify-between items-center w-full max-w-7xl xl:mx-auto'>
      <h1 className='font-bold col-span-2 text-lg'>
        <Link
          href='/'
          className='justify-center flex items-center gap-2 hover:opacity-80'
        >
          <Image src='/logo.svg' alt='Rick and Morty' width={40} height={100} />
          Rick and Morty
        </Link>
      </h1>
      <nav className='flex items-center space-x-4'>
        <Link
          href='/favorites'
          className={cn('text-lg font-semibold hover:text-red-500', {
            underline: router.pathname === '/favorites',
          })}
        >
          Favorites
        </Link>
      </nav>
    </header>
  );
}
