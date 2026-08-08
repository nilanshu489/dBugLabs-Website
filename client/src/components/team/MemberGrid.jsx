import cx from '../../lib/cx';
import MemberCard from './MemberCard';

/**
 * A flat grid of team members.
 *
 * Replaces TeamGrid, which nested a flex row inside each cell of the page's
 * grid. That put `flex-1 min-w-[180px]` on elements whose parent was a grid
 * (where flex sizing does nothing), and when a domain had two leads both cards
 * landed in a single ~285px track with a combined minimum of 380px — so they
 * overflowed into the neighbouring column. Members are flattened into one list
 * here instead, so every card is a real grid item on the shared track.
 */
const MemberGrid = ({ members, className }) => {
  const people = members.filter(Boolean);

  if (people.length === 0) return null;

  return (
    <div className={cx('grid grid-cols-2 gap-4 sm:gap-5 md:grid-cols-3 lg:grid-cols-4', className)}>
      {people.map((member, index) => (
        <MemberCard key={`${member.name}-${member.role}-${index}`} member={member} />
      ))}
    </div>
  );
};

export default MemberGrid;
