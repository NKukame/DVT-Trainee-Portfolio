
import { ChevronLeft, ChevronRight } from '@untitled-ui/icons-react';
import  {useState} from 'react';

export default function PaginationControls({ totalPages, apiEndpoint, setResults}) {
  const [currentPage, setCurrentPage] = useState(1);
  const pages = [];

  const handlePageClick = (page) => {
    if (page !== currentPage) {
      setCurrentPage(page);
    }
  };

  const getPagination = () => {

    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } 
    else {
      pages.push(1);

      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);

      if (start > 2) pages.push('...');
      for (let i = start; i <= end; i++) {
        pages.push(i);
      }
      if (end < totalPages - 2) pages.push('...');
      
      pages.push(totalPages);
    }

    return pages;
  }
  
  const paginationItems = getPagination();

  return (
      <div style={{ display: 'flex',gap:'24px', alignItems: 'center', alignSelf:'center' , margin:'20px'}} className='pagination-container'>
        <button
          className='pagination-btn'
          onClick={() => currentPage > 1 && handlePageClick(currentPage - 1)}
          disabled={currentPage === 1}
          style={{
            border: 'none',
            cursor: currentPage === 1 ? 'not-allowed' : 'pointer',
          }}
        >
          <ChevronLeft/>
        </button>

        {paginationItems.map((item, index) => (
          <button
            className={`pagination-btn ${item === currentPage ? 'active' : 'not-active'}`}
            key={index}
            onClick={() => typeof item === 'number' && handlePageClick(item)}
            disabled={item === '...'}
            style={{
              cursor: item === '...' ? 'default' : 'pointer',
            }}
          >
            {item}
          </button>
        ))}

        <button
          className='pagination-btn'
          onClick={() =>
            currentPage < totalPages && handlePageClick(currentPage + 1)
          }
          disabled={currentPage === totalPages}
          style={{
            border: 'none',
            cursor: currentPage === totalPages ? 'not-allowed' : 'pointer',
          }}
        >
          <ChevronRight fontSize={'inherit'}/>
        </button>
      </div>
  );
}
