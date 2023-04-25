import { ReactNode } from 'react';
import Image from 'next/image';

interface HeroProps {
  element?: ReactNode;
}

export default function Hero({ element }: HeroProps) {
  return (
    <section
      id='hero'
      className='h-96 bg-hero-pattern bg-[length:450px_450px] w-full relative flex flex-col items-center justify-center'
    >
      <div className='absolute top-0 left-0 w-full h-full bg-blue-700 opacity-20' />
      <Image
        src='/rick.png'
        alt='Rick and Morty'
        width={400}
        height={300}
        className='z-30'
      />
      <div className='w-full absolute bottom-4 flex justify-center text-white'>
        {element}
      </div>
    </section>
  );
}
