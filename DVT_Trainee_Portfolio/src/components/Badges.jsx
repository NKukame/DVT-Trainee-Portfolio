import Chip from '@mui/material/Chip';
import { useContext } from 'react';
import { SearchContext } from '../contexts/SearchContext';
import { generatePastelColor } from '../lib/color';

export default function Badges({ badgeList }) {
  const { selectedFilter } = useContext(SearchContext);
  const visibleBadges = badgeList.slice(0, 3);
  const itemsLeft = badgeList.length - visibleBadges.length;

  return (
    <ul className="skills-list">
      {visibleBadges.map((badge, index) => (
        <li key={index}>
          <p
            className="badge-default"
            style={
              selectedFilter.includes(badge)
                ? { borderColor: generatePastelColor(badge), borderWidth: '2.2px' }
                : {}
            }
          >
            {badge}
          </p>
        </li>
      ))}

      {itemsLeft > 0 && (
        <li>
          <p className="text-md-muted more-skills">{itemsLeft} more...</p>
        </li>
      )}
    </ul>
  );
}
