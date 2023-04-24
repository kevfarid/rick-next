import { LIMIT_FAVORITES } from '@/constants';
import useLocalStorage from '@/hooks/useLocalStorage';
import { setFavorite, getFavorites } from '@/services/favorites';
import { ReactNode, createContext, useEffect, useState } from 'react';

interface FavoritesContextData {
  favorites: number[];
  isLoading: boolean;
  toggleFavorite: (id: number) => void;
  error?: string;
}

export const FavoritesContext = createContext<FavoritesContextData>({
  favorites: [],
  isLoading: false,
  toggleFavorite: () => {},
  error: '',
});

export function FavoritesProvider({ children }: { children: ReactNode }) {
  const [favorites, setFavorites] = useState<number[]>([]);
  const [isLoading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [idUser] = useLocalStorage('rickandmorty-user');

  const toggleFavorite = (id: number) => {
    setLoading(true);

    setFavorite(idUser, id)
      .then((data) => {
        if (data) {
          setFavorites(data);
        }
      })
      .catch((err) => {
        setError(err.message);
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    if (idUser) {
      getFavorites(idUser).then((data) => {
        setFavorites(data);
      });
    }
  }, [idUser]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setError('');
    }, 4000);

    return () => clearTimeout(timer);
  }, [error]);

  const values = {
    favorites,
    toggleFavorite,
    isLoading,
    error,
  };

  return (
    <FavoritesContext.Provider value={values}>
      {children}
    </FavoritesContext.Provider>
  );
}
