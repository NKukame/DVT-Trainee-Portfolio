import React, { useEffect, useState } from 'react';

const Pagination = () => {
  const totalItems = 200;
  const [currentPage, setCurrentPage] = useState(1);

  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalItems) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const handleClick = (value) => {
    setCurrentPage(value);
  };

  const getLeftPages = () => {
    if (currentPage <= 5) {
      return Array.from({ length: currentPage - 1 }, (_, i) => i + 1);
    } else {
      return [1, 2, currentPage - 2, currentPage - 1];
    }
  };

  const getRightPages = () => {
    if (currentPage >= totalItems - 4) {
      return Array.from({ length: totalItems - currentPage }, (_, i) => currentPage + 1 + i);
    } else {
      return [currentPage + 1, currentPage + 2, totalItems - 1, totalItems];
    }
  };

  const renderButton = (page, disabled = false) => (
    <li
      key={page}
      className={`pagination-item ${page === currentPage ? 'active' : ''}`}
      onClick={() => !disabled && handleClick(page)}
      style={{ pointerEvents: disabled ? 'none' : 'auto', opacity: disabled ? 0.5 : 1 }}
    >
      {disabled ? '...' : page}
    </li>
  );

  return (
    <div className="pagination">
      <button onClick={handlePrevious} disabled={currentPage === 1} className="prevBtn">
        Prev.
      </button>
      <ul className="pagination-list">
        <div className="leftContainer">
          {getLeftPages().map((page, i) =>
            renderButton(page, [1].includes(i) && currentPage > 5)
          )}
        </div>
        <li className="pagination-item active">{currentPage}</li>
        <div className="rightContainer">
          {getRightPages().map((page, i) =>
            renderButton(page, [1].includes(i) && currentPage < totalItems - 4)
          )}
        </div>
      </ul>
      <button onClick={handleNext} disabled={currentPage === totalItems} className="nextBtn">
        Next
      </button>
    </div>
  );
};

export default Pagination;
