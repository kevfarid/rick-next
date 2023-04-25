import { SVGProps } from 'react';

function SendFilled(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      width={30}
      height={31}
      viewBox='0 0 30 31'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      {...props}
    >
      <g clipPath='url(#clip0_1873_4721)' filter='url(#filter0_d_1873_4721)'>
        <path
          d='M9.882 12.22C6.453 10.9 4.739 10.24 4.308 9.355a2.5 2.5 0 01.113-2.396c.512-.84 2.28-1.336 5.818-2.326l9.995-2.799c2.24-.627 3.36-.94 4.127-.65a2.5 2.5 0 011.453 1.453c.29.769-.023 1.888-.65 4.128l-2.798 9.995c-.99 3.537-1.486 5.305-2.327 5.818a2.5 2.5 0 01-2.396.113c-.885-.431-1.544-2.146-2.863-5.574l-.692-1.801c-.135-.352-.203-.527-.207-.702a1 1 0 01.095-.447c.074-.158.207-.291.474-.557L17 11.06A.75.75 0 0015.94 10l-2.55 2.55c-.267.266-.4.4-.558.474a1 1 0 01-.447.095c-.175-.004-.35-.072-.702-.207l-1.801-.693z'
          fill='#2F384C'
        />
      </g>
      <defs>
        <filter
          id='filter0_d_1873_4721'
          x={-1}
          y={0}
          width={32}
          height={32}
          filterUnits='userSpaceOnUse'
          colorInterpolationFilters='sRGB'
        >
          <feFlood floodOpacity={0} result='BackgroundImageFix' />
          <feColorMatrix
            in='SourceAlpha'
            values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0'
            result='hardAlpha'
          />
          <feOffset dy={4} />
          <feGaussianBlur stdDeviation={2} />
          <feComposite in2='hardAlpha' operator='out' />
          <feColorMatrix values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0' />
          <feBlend
            in2='BackgroundImageFix'
            result='effect1_dropShadow_1873_4721'
          />
          <feBlend
            in='SourceGraphic'
            in2='effect1_dropShadow_1873_4721'
            result='shape'
          />
        </filter>
        <clipPath id='clip0_1873_4721'>
          <path fill='#fff' transform='translate(3)' d='M0 0H24V24H0z' />
        </clipPath>
      </defs>
    </svg>
  );
}

export default SendFilled;
