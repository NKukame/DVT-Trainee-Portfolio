import Chip from '@mui/material/Chip';

export default function Badges({badgeList}) {
  return (
    <ul className="skills-list">
      {
        badgeList.map((badge)=>{
          return (<li><Chip label={badge} size='small' variant='outlined' /></li>)
        })
      }
    </ul>
  )
};
