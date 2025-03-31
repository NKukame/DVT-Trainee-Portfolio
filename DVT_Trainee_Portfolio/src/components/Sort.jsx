import './Sort.css';  // Import the CSS file
import SwapVertIcon from '@mui/icons-material/SwapVert';

const SortDropdown = () => {
  
  return (
    <button className="result-nav-btn sort-btn" onClick={''}>
          <span className="sort-txt">Sort</span>
          <SwapVertIcon/>
    </button>
  );
};

export default SortDropdown;
