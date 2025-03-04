import Chip from '@mui/material/Chip';

export default function Badges({badgeList}) {
  return (
    <ul className="skills-list">
      {
        badgeList.map((badge)=>{
          return (<li><p  className="badge">{badge}</p></li>)
        })
      }
    </ul>
  )
};
