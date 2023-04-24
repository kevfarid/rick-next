export function setFavorite(id: string, favorite: number) {
  return fetch('/api/favorites', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      id,
      favorite,
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

export function getFavorites(id: string) {
  return fetch(`/api/favorites?id=${id}`)
    .then((response) => response.json())
    .then((data) => data.favorites);
}
