import InfoItem from './InfoItem';
import Badges from '../../Badges';

export default function UserDetails({ user }) {
  return (
    <>
      <div className="flex-row flex-row-between gap-10-px">
        <InfoItem icon="./Icon.png" text={user.location} />
        <InfoItem icon="/Award-01.png" text={user.years_active} />
      </div>
      <div className='skills-list'>
        <Badges badgeList={user.skills} />
      </div>
    </>
  );
}