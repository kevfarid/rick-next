import Image from 'next/image';
import cn from 'classnames';
import LoadIcon from '../icons/LoadIcon';
import Favorite from './Favorite';

interface CharacterCardProps {
  name: string;
  image: string;
  species: string;
  isFavorite?: boolean;
  isLoading?: boolean;
  onFavorite?: () => void;
}

export default function CharacterCard({
  name,
  image,
  species,
  isFavorite,
  isLoading,
  onFavorite,
}: CharacterCardProps) {
  return (
    <div className='relative'>
      <Image
        className='w-full object-contain aspect-square rounded-md'
        src={image}
        alt={name}
        width={357}
        height={238}
        priority
      />
      <h3 className='text-lg font-semibold mt-2 text-ellipsis whitespace-nowrap overflow-hidden'>
        {name}
      </h3>
      <p className='text-base text-gray-600'>{species}</p>
      <button
        className={cn('absolute top-2 right-2', {
          'pointer-events-none': isLoading,
        })}
        type='button'
        onClick={onFavorite}
      >
        {isLoading ? (
          <LoadIcon className='w-6 h-6 animate-spin text-gray-500' />
        ) : (
          <Favorite isFavorite={isFavorite || false} />
        )}
      </button>
    </div>
  );
}
