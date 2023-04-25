import { SVGProps } from 'react';

function UploadIcon(props: SVGProps<SVGSVGElement>) {
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
        d="M3.2 18A4.427 4.427 0 011 14.167a4.422 4.422 0 013.301-4.285l-.001-.14C4.3 5.468 7.747 2 12 2c3.621 0 6.658 2.513 7.48 5.9A5.532 5.532 0 0123 13.061c0 1.81-.864 3.416-2.2 4.425M12 22v-9m0 0l-3.5 3.5M12 13l3.5 3.5"
        stroke="currentColor"
        strokeWidth={3}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default UploadIcon;
