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


// import * as React from "react";
// import { useState } from "react";

// export function SelectScrollable() {
//   const [selectedValue, setSelectedValue] = useState("");

//   const handleChange = (event) => {
//     setSelectedValue(event.target.value);
//   };

//   return (
//     <div className="select-wrapper">
//       <select
//         value={selectedValue}
//         onChange={handleChange}
//         className="select-control w-[280px]"
//       >
//         <option value="" disabled>
//           Select a timezone
//         </option>
        
//         <optgroup label="North America">
//           <option value="est">Eastern Standard Time (EST)</option>
//           <option value="cst">Central Standard Time (CST)</option>
//           <option value="mst">Mountain Standard Time (MST)</option>
//           <option value="pst">Pacific Standard Time (PST)</option>
//           <option value="akst">Alaska Standard Time (AKST)</option>
//           <option value="hst">Hawaii Standard Time (HST)</option>
//         </optgroup>
        
//         <optgroup label="Europe & Africa">
//           <option value="gmt">Greenwich Mean Time (GMT)</option>
//           <option value="cet">Central European Time (CET)</option>
//           <option value="eet">Eastern European Time (EET)</option>
//           <option value="west">Western European Summer Time (WEST)</option>
//           <option value="cat">Central Africa Time (CAT)</option>
//           <option value="eat">East Africa Time (EAT)</option>
//         </optgroup>
        
//         <optgroup label="Asia">
//           <option value="msk">Moscow Time (MSK)</option>
//           <option value="ist">India Standard Time (IST)</option>
//           <option value="cst_china">China Standard Time (CST)</option>
//           <option value="jst">Japan Standard Time (JST)</option>
//           <option value="kst">Korea Standard Time (KST)</option>
//           <option value="ist_indonesia">Indonesia Central Standard Time (WITA)</option>
//         </optgroup>
        
//         <optgroup label="Australia & Pacific">
//           <option value="awst">Australian Western Standard Time (AWST)</option>
//           <option value="acst">Australian Central Standard Time (ACST)</option>
//           <option value="aest">Australian Eastern Standard Time (AEST)</option>
//           <option value="nzst">New Zealand Standard Time (NZST)</option>
//           <option value="fjt">Fiji Time (FJT)</option>
//         </optgroup>
        
//         <optgroup label="South America">
//           <option value="art">Argentina Time (ART)</option>
//           <option value="bot">Bolivia Time (BOT)</option>
//           <option value="brt">Brasilia Time (BRT)</option>
//           <option value="clt">Chile Standard Time (CLT)</option>
//         </optgroup>
//       </select>
//     </div>
//   );
// }


