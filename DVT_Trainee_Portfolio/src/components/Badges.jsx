import Chip from '@mui/material/Chip';
import { useContext } from 'react';
import { SearchContext } from '../contexts/SearchContext';
import { generatePastelColor } from '../lib/color';

export default function Badges({badgeList}) {
  const {selectedFilter} = useContext(SearchContext);
  return (
    <ul className="skills-list">
      {
        badgeList.map((badge)=>{
          return (<li><p  className='badge' style={selectedFilter.includes(badge)? {borderColor:generatePastelColor(badge), borderWidth: '2.2px'}:{}}>{badge}</p></li>)
        })

      }
    </ul>
  )
};

export function BadgeItems({badge}){
  return (<li><Chip label={badge} size='small' variant='outlined' /></li>);
}