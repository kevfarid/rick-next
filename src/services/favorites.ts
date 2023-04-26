export function uploadFavorites(id: string, favorites: number[]) {
  return fetch('/api/favorites', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      id,
      favorites,
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.error) {
        throw new Error(data.error);
      } else {
        return data.favorites;
      }
    });
}

export function getFavoritesIds(id: string) {
  return fetch(`/api/favorites?id=${id}`)
    .then((response) => response.json())
    .then((data) => {
      if (data.error) {
        throw new Error(data.error);
      } else {
        return data.favorites;
      }
    });
}
