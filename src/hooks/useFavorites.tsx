import { FavoritesContext } from '@/providers/Favorites';
import React, { useContext } from 'react';

export default function useFavorites() {
  const { favorites, toggleFavorite, error } = useContext(FavoritesContext);

  return {
    favorites,
    toggleFavorite,
    error,
  };
}
