import React, { useState } from 'react';

const Pagination = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const pages = [1, 2, 3, 4, 100];

  const handleClick = (index) => {
    setCurrentIndex(index);
  };

  const handlePrevious = () => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : prev));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev < pages.length - 1 ? prev + 1 : prev));
  };

  return (
    <div className="pagination">
      <button
        onClick={handlePrevious}
        className={currentIndex === 0 ? '' : 'active'}
        disabled={currentIndex === 0}
      >
        Prev.
      </button>
      <ul className='pagination-list'>
        {pages.map((page, index) => (
          <li
            key={index}
            className={ `pagination-item ${index === currentIndex ? 'active' : ''}`}
            onClick={() => handleClick(index)}
          >
            {page}
          </li>
        ))}
      </ul>
      <button
        onClick={handleNext}
        className={currentIndex === pages.length - 1 ? '' : 'active'}
        disabled={currentIndex === pages.length - 1}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
