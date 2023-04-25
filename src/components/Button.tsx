import { ButtonHTMLAttributes, ReactNode } from 'react';
import cn from 'classnames';

import LoadIcon from './icons/LoadIcon';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon?: ReactNode;
  isLoading?: boolean;
}

export default function Button({
  icon,
  children,
  isLoading,
  onClick,
  ...rest
}: ButtonProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        'bg-red-500 max-w-max hover:bg-red-600 hover:text-red-200 text-white font-bold py-2 px-4 rounded flex items-center gap-2',
        {
          'cursor-not-allowed opacity-70': isLoading,
        }
      )}
      {...rest}
    >
      {isLoading ? <LoadIcon className='w-4 h-4 animate-spin' /> : icon}
      {children}
    </button>
  );
}
