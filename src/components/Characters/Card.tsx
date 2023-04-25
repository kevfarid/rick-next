import Image from 'next/image';
import cn from 'classnames';
import LoadIcon from '../icons/LoadIcon';
import Favorite from './Favorite';

interface CharacterCardProps {
  name: string;
  image: string;
  species: string;
  isFavorite?: boolean;
  onFavorite?: () => void;
  showFavorite?: boolean;
}

export default function CharacterCard({
  name,
  image,
  species,
  isFavorite,
  onFavorite,
  showFavorite = true,
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
      {showFavorite && (
        <button
          className={cn(
            'absolute top-2 right-2 bg-white rounded-full p-2 text-red-500 hover:bg-red-500 hover:text-white transition-all duration-300'
          )}
          type='button'
          onClick={onFavorite}
        >
          <Favorite isFavorite={isFavorite || false} />
        </button>
      )}
    </div>
  );
}
