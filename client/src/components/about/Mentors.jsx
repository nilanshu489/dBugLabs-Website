import MemberCard from '../team/MemberCard';
import { useTeamData } from '../../hooks/useTeamData';
import { SectionHeading } from '../ui';

const Mentors = () => {
  const { mentorMembers, isLoading } = useTeamData();

  const hasMentors = mentorMembers && mentorMembers.length > 0;

  return (
    <div>
      <SectionHeading
        eyebrow="Guidance & Vision"
        eyebrowTone="pink"
        title={
          <>
            Our <span className="gradient-text">Mentors</span>
          </>
        }
        description="Distinguished leaders and industry experts who guide us throughout our journey and empower our members to excel."
        level={3}
        className="mb-12"
      />

      {isLoading ? (
        <div className="flex justify-center py-12">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-pink-500 border-t-transparent" />
        </div>
      ) : hasMentors ? (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {mentorMembers.map((mentor, index) => (
            <MemberCard key={mentor._id || mentor.name + index} member={mentor} />
          ))}
        </div>
      ) : (
        <div className="card-glow rounded-2xl border border-amber-500/25 bg-[#160f28]/85 p-8 text-center">
          <p className="text-base text-gray-300">
            Our mentor lineup is being updated. Stay tuned to meet the leaders guiding dBug Labs!
          </p>
        </div>
      )}
    </div>
  );
};

export default Mentors;
