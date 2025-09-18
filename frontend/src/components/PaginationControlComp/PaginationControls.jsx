import { useContext,  useState } from 'react';
import { SearchContext } from '../../contexts/SearchContext';
import { ChevronLeft, ChevronRight } from '@untitled-ui/icons-react';

export default function Pagination( {isEmployeeSearch} ){
  const {total, searchData, params, query, isAvailable, totalProjects} = useContext(SearchContext);
  const totalPages = isEmployeeSearch ? total : totalProjects; 
  const [currentPage, setCurrentPage] = useState(1);
  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
      let page = currentPage-1;
      searchData(page, query, params, isAvailable);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
      let page = currentPage+1;
      searchData(page, query, params, isAvailable);
    }
  };

  const handleClick = (value) => {
    setCurrentPage(value);
    searchData(value, query, params, isAvailable);
  };

  const getLeftPages = () => {
    if (currentPage <= 5) {
      return Array.from({ length: currentPage - 1 }, (_, i) => i + 1);
    } else {
      return [1, 2, currentPage - 2, currentPage - 1];
    }
  };

  const getRightPages = () => {
    if (currentPage >= totalPages - 4) {
      return Array.from({ length: totalPages - currentPage }, (_, i) => currentPage + 1 + i);
    } else {
      return [currentPage + 1, currentPage + 2, totalPages - 1, totalPages];
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

    <>
    {
      totalPages > 1 &&
      <div className="pagination">
        <button onClick={handlePrevious} disabled={currentPage === 1} className="prevBtn">
          <ChevronLeft />
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
              renderButton(page, [1].includes(i) && currentPage < totalPages - 4)
            )}
          </div>
        </ul>
        <button onClick={handleNext} disabled={currentPage === totalPages} className="nextBtn">
          <ChevronRight />
        </button>
      </div>
    }
    </>
  );
};

