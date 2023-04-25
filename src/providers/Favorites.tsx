import { LIMIT_FAVORITES } from '@/constants';
import useLocalStorage from '@/hooks/useLocalStorage';
import CharacterInfo from '@/interfaces/Character';
import { uploadFavorites } from '@/services/favorites';
import { ReactNode, createContext, use, useEffect, useState } from 'react';

interface FavoritesContextData {
  favorites: CharacterInfo[];
  toggleFavorite: (character: CharacterInfo) => void;
  error?: string;
}

export const FavoritesContext = createContext<FavoritesContextData>({
  favorites: [],
  toggleFavorite: () => {},
  error: '',
});

export function FavoritesProvider({ children }: { children: ReactNode }) {
  const [favorites, setFavorites] = useState<CharacterInfo[]>([]);
  const [storedFavorites, setStoredFavorites] = useLocalStorage<
    CharacterInfo[]
  >('favorites', []);
  const [error, setError] = useState<string>('');

  const toggleFavorite = (character: CharacterInfo) => {
    const isFavorite = favorites.find((fav) => fav.id === character.id);
    const filter = (fav: CharacterInfo) => fav.id !== character.id;

    if (isFavorite) {
      setFavorites(favorites.filter(filter));
      setStoredFavorites(storedFavorites.filter(filter));
      return;
    }

    if (favorites.length >= LIMIT_FAVORITES) {
      setError('You have reached the limit of favorites');
      return;
    }

    setStoredFavorites((prev: CharacterInfo[]) => prev.concat(character));
    setFavorites((prev) => prev.concat(character));
  };

  useEffect(() => {
    if (storedFavorites.length === 0) return;

    setFavorites(storedFavorites);
  }, [storedFavorites]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setError('');
    }, 4000);

    return () => clearTimeout(timer);
  }, [error]);

  const values = {
    favorites,
    toggleFavorite,
    error,
  };

  return (
    <FavoritesContext.Provider value={values}>
      {children}
    </FavoritesContext.Provider>
  );
}
