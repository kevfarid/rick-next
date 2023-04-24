import { SVGProps } from 'react';

function FavoriteFilled(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      width={24}
      height={24}
      viewBox='0 0 24 24'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      {...props}
    >
      <path
        d='M1.25 9c0-3.953 3.377-6.75 6.75-6.75 1.375 0 2.86.397 3.998 1.56 1.13-1.165 2.6-1.58 4.013-1.56C19.366 2.3 22.75 5.039 22.75 9c0 6.02-5.77 10.348-10.75 12.838C7.02 19.349 1.25 15.02 1.25 9z'
        fill='currentColor'
      />
    </svg>
  );
}

export default FavoriteFilled;
