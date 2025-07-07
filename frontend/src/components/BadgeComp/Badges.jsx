
export default function Badges({ badgeList, sliceList=true }) {

  const visibleBadges = sliceList ?  badgeList.slice(0, 3) : badgeList;
  const itemsLeft = badgeList.length - visibleBadges.length;

  return (
    <ul className="flex-row gap-10-px align-items-center font-size-12-px badge-list">
      {visibleBadges.map((badge, index) => (
        <li key={index}>
          <Badge badge={badge} />
        </li>
      ))}

      {itemsLeft > 0 && (
        <li>
          <p className="text-md-muted more-skills">+ {itemsLeft}</p>
        </li>
      )}
    </ul>
  );
}


function Badge({badge}){
  return (<p className="badge-default line-clamp-1">{badge}</p>)
}