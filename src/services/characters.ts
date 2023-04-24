import { URL_API_RICK } from '@/constants';

export function getCharacters(page = 1) {
  return fetch(`${URL_API_RICK}/api/character/?page=${page}`)
    .then((response) => response.json())
    .then((data) => data);
}
