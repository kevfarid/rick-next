export async function createNewUser(favorites: number[]) {
  return fetch('/api/user', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      favorites,
    }),
  }).then((res) => res.json()).then((res) => res.id);
}
