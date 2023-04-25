import cn from 'classnames';
import { useEffect, useState } from 'react';
import ButtonPagination from './ButtonPagination';

interface PaginationProps {
  count: number;
  initialPage?: number;
  handlePage: (page: number) => void;
  disabled?: boolean;
}

const getTotalPage = (count: number) => {
  return Math.ceil(count / 10);
};

export default function Pagination({
  count,
  handlePage,
  disabled,
}: PaginationProps) {
  const [showPages, setShowPages] = useState<number[]>([]);
  const [totalPages, setTotalPages] = useState<number[]>([]);
  const [page, setPage] = useState<number>(0);

  useEffect(() => {
    const totalPages = getTotalPage(count);
    const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

    setTotalPages(pages);
    setShowPages(totalPages <= 5 ? pages : pages.slice(0, 5));
  }, [count]);

  const handleNext = () => {
    if (page === totalPages.length) return;

    const nextPage = page + 1;

    if (page === showPages[showPages.length - 1] || totalPages.length <= 5) {
      const nextPages = totalPages.slice(nextPage - 1, nextPage + 4);
      setShowPages(nextPages);
    }

    setPage(nextPage);
    handlePage(nextPage);
  };

  const handlePrev = () => {
    if (page === 1) return;

    const prevPage = page - 1;

    if (page === showPages[0]) {
      const prevPages = totalPages.slice(prevPage - 5, prevPage);
      setShowPages(prevPages);
    }

    setPage(prevPage);
    handlePage(prevPage);
  };

  return (
    <nav
      className={cn(
        'isolate inline-flex -space-x-px rounded-md shadow-sm max-w-max',
        {
          'opacity-50 pointer-events-none': disabled,
        }
      )}
      aria-label='Pagination'
    >
      <ButtonPagination
        disabled={page === 1}
        onClick={() => handlePrev()}
        direction='prev'
      />
      {showPages.map((i) => (
        <button
          key={i}
          onClick={() => {
            setPage(i);
            handlePage(i);
          }}
          className={cn(
            'relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0',
            {
              'bg-indigo-600 text-white hover:bg-indigo-500': i === page,
            }
          )}
        >
          {i}
        </button>
      ))}
      <ButtonPagination
        disabled={page === totalPages.length || totalPages.length <= 5}
        onClick={() => handleNext()}
      />
    </nav>
  );
}
