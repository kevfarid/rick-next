import Image from 'next/image';
import Link from 'next/link';

interface CharacterCardProps {
  name: string;
  image: string;
  species: string;
  href: string;
}

export default function CharacterCard({
  name,
  image,
  species,
  href,
}: CharacterCardProps) {
  return (
    <Link href={href}>
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
    </Link>
  );
}
