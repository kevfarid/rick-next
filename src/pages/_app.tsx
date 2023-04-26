import Header from '@/components/Header';
import { FavoritesProvider } from '@/providers/Favorites';
import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import Image from 'next/image';
import { Inter } from 'next/font/google';
import Head from 'next/head';

const inter = Inter({ subsets: ['latin'] });

export default function App({ Component, pageProps }: AppProps) {
  return (
    <FavoritesProvider>
      <main className={`${inter.className} w-full`}>
        <Head>
          <title>Rick And Your Favorites</title>
        </Head>
        <Header />
        <section
          className={`${inter.className} flex flex-col w-full items-center gap-8 mb-8 relative`}
        >
          <Component {...pageProps} />
        </section>
      </main>
    </FavoritesProvider>
  );
}
