import Chip from '@mui/material/Chip';

export default function Badges({badgeList}) {
  const filteredList = []
  return (
    <ul className="skills-list">
      {
        badgeList.map((badge)=>{
          return (<li><p  className={filteredList.includes(badge) ? `badge ${fn(badge)}` : 'badge'}>{badge}</p></li>)
        })
      }
    </ul>
  )
};
