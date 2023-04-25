import FavoriteFilledIcon from '../icons/FavoriteFilledIcon';
import FavoriteIcon from '../icons/FavoriteIcon';

export default function Favorite({ isFavorite }: { isFavorite: boolean }) {
  if (isFavorite) {
    return <FavoriteFilledIcon className='w-6 h-6' />;
  }

  return <FavoriteIcon className='w-6 h-6' />;
}
