import Responses from '@/interfaces/Responses';
import CharacterInfo from '@/interfaces/Character';

import { URL_API_RICK } from '@/constants';

export function getCharacters(
  page: number,
  search: string
): Promise<Responses<CharacterInfo>> {
  const name = search ? `&name=${search}` : '';

  return fetch(`${URL_API_RICK}/api/character/?page=${page}${name}`)
    .then((response) => response.json())
    .then((data) => data);
}

export function getMultipleCharacters(ids: number[]): Promise<CharacterInfo[]> {
  if (ids.length === 0) {
    return Promise.resolve([]);
  }

  return fetch(`${URL_API_RICK}/api/character/${ids}`)
    .then((response) => response.json())
    .then((data) => {
      return Array.isArray(data) ? data : [data];
    });
}
