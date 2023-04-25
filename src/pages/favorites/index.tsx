import CharactersList from '@/components/Characters/List';
import Hero from '@/components/Hero';
import SendFilledIcon from '@/components/icons/SendFilledIcon';
import useFavorites from '@/hooks/useFavorites';
import Button from '@/components/Button';
import useLocalStorage from '@/hooks/useLocalStorage';

import { useCallback, useEffect, useState } from 'react';
import { createNewUser } from '@/services/user';
import useClipboard from '@/hooks/useClipboard';
import UploadIcon from '@/components/icons/UploadIcon';
import { uploadFavorites } from '@/services/favorites';

export default function Favorites() {
  const { favorites, toggleFavorite } = useFavorites();
  const { copyToClipboard, isCopied } = useClipboard();
  const [idUser, setIdUser] = useLocalStorage('idUser', '');

  const [id, setId] = useState('');
  const [urlPublic, setUrlPublic] = useState('');

  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingUpload, setIsLoadingUpload] = useState(false);
  const [error, setError] = useState('');

  const createUser = useCallback(() => {
    setIsLoading(true);
    const favoritesIds = favorites.map((character) => Number(character.id));
    createNewUser(favoritesIds)
      .then((id) => {
        setIdUser(id);
        copyToClipboard(`${urlPublic}/favorites/${id}`);
      })
      .catch((error) => setError(error.message))
      .finally(() => {
        setIsLoading(false);
      });
  }, [copyToClipboard, favorites, setIdUser, urlPublic]);

  const uploadFavorite = useCallback(() => {
    setIsLoadingUpload(true);
    const favoritesIds = favorites.map((character) => Number(character.id));
    uploadFavorites(id, favoritesIds)
      .catch((error) => setError(error.message))
      .finally(() => {
        setIsLoadingUpload(false);
      });
  }, [favorites, id]);

  const haddleShare = () => {
    if (!idUser) {
      createUser();
    } else {
      copyToClipboard(`${urlPublic}/favorites/${id}`);
    }
  };

  useEffect(() => {
    setUrlPublic(window.location.origin);
  }, []);

  useEffect(() => {
    if (!idUser) return;
    setId(idUser);
  }, [idUser]);

  return (
    <>
      <Hero />
      <div className='mx-auto max-w-7xl w-full'>
        {error && (
          <div className='w-full px-16'>
            <span className='text-red-500 text-ellipsis whitespace-nowrap overflow-hidden py-2 px-4 bg-red-200 rounded flex gap-2 items-center'>
              {error}
            </span>
          </div>
        )}
        <div className='flex w-full justify-between relative px-8 flex-col items-center gap-4 md:flex-row mt-4 mb-8'>
          <h2 className='text-2xl font-bold justify-self-center text-center'>
            Your Favorites {favorites.length}/5
          </h2>
          <div className='flex gap-4 flex-col-reverse items-center sm:flex-row'>
            {id && (
              <>
                <div className='py-2 px-4 bg-slate-200 max-h-80 rounded max-w-sm flex gap-2 items-center'>
                  <span className='text-slate-500 text-ellipsis whitespace-nowrap overflow-hidden w-52'>
                    {urlPublic}/favorites/{id}
                  </span>
                  <button
                    onClick={haddleShare}
                    className='bg-slate-300 hover:bg-slate-400 text-slate-500 hover:text-slate-600 font-bold py-1 px-2 rounded'
                  >
                    {isCopied ? 'Copied' : 'Copy'}
                  </button>
                </div>
                <Button
                  isLoading={isLoadingUpload}
                  icon={<UploadIcon className='w-4 h-4' />}
                  onClick={uploadFavorite}
                >
                  Update favorites
                </Button>
              </>
            )}
            {!id && (
              <Button
                isLoading={isLoading}
                onClick={haddleShare}
                icon={<SendFilledIcon className='w-4 h-4' />}
              >
                Share
              </Button>
            )}
          </div>
        </div>
        <CharactersList
          characters={favorites}
          favorites={favorites}
          toggleFavorite={toggleFavorite}
        />
      </div>
    </>
  );
}
