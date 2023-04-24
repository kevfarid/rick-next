import { useCallback, useEffect } from 'react';
import useLocalStorage from './useLocalStorage';
import { URL_API } from '@/constants';

export default function useNewUser() {
  const [idUser, setIdUser] = useLocalStorage('rickandmorty-user');

  const getNewUser = useCallback(async () => {
    const user = await fetch(`${URL_API}/api/user`, {
      method: 'POST',
    }).then((res) => res.json());

    setIdUser(user.id);
  }, [setIdUser]);

  useEffect(() => {
    if (!idUser) {
      getNewUser();
    }
  });

  return {
    idUser,
  };
}
