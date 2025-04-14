import React, { FC, useCallback } from 'react';
import styles from './Pagination.module.scss';
import Button from '../Button';
import ArrowRightIcon from 'components/icons/ArrowRightIcon';
import ArrowLeftIcon from '../icons/ArrowLeftIcon';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
  const getVisiblePages = () => {
    const visiblePages = [];
    const maxVisible = 3;

    let startPage = currentPage > 1 ? currentPage - 1 : 1;

    if (currentPage === totalPages) {
      startPage = Math.max(1, totalPages - 2);
    } else if (currentPage === totalPages - 1) {
      startPage = Math.max(1, totalPages - 2);
    }

    for (let i = startPage; i < startPage + maxVisible && i <= totalPages; i++) {
      visiblePages.push(i);
    }

    return visiblePages;
  };

  const handlePageChange = useCallback((page: number) => {
    if (page !== currentPage && page >= 1 && page <= totalPages) {
      onPageChange(page);
    }
  }, [onPageChange, currentPage, totalPages]);

  return (
    <div className={styles.pagination}>
      <ArrowRightIcon
        color="some-black"
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
        useStrokeColor={true}
      />

      {currentPage > 2 && totalPages > 3 && (
        <>
          <Button
            children={1}
            onClick={() => handlePageChange(1)}
            className={`pagination_button ${currentPage === 1 ? 'active' : 'inactive'}`}
          />
          {currentPage > 3 && <span className="pagination_ellipsis">...</span>}
        </>
      )}

      {getVisiblePages().map((page) => (
        <Button
          key={page}
          className={`pagination_button ${currentPage === page ? 'active' : 'inactive'}`}
          onClick={() => handlePageChange(page)}
        >
          {page}
        </Button>
      ))}

      {currentPage < totalPages - 1 && totalPages > 3 && (
        <>
          {currentPage < totalPages - 2 && <span className="pagination_ellipsis">...</span>}
          <Button
            onClick={() => handlePageChange(totalPages)}
            className={`pagination_button ${currentPage === totalPages ? 'active' : 'inactive'}`}
          >
            {totalPages}
          </Button>
        </>
      )}

      <ArrowLeftIcon
        color="some-black"
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        useStrokeColor={true}
      />
    </div>
  );
};

export default React.memo(Pagination);
