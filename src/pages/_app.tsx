import { FavoritesProvider } from '@/providers/Favorites';
import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export default function App({ Component, pageProps }: AppProps) {
  return (
    <FavoritesProvider>
      <main
        className={`px-24 pt-8 ${inter.className} flex flex-col w-full items-center gap-8 mb-8 relative`}
      >
        <Component {...pageProps} />
      </main>
    </FavoritesProvider>
  );
}
