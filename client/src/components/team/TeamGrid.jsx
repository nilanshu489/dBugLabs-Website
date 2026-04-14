import MemberCard from './MemberCard';

const TeamGrid = ({ members, title, description }) => {
  return (
    <div className="flex-1 min-w-[180px]">
      {(title || description) && (
        <div className="text-center mb-6">
          {title && (
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-3">
              {title}
            </h3>
          )}
          {description && (
            <p className="text-gray-400 max-w-2xl mx-auto">
              {description}
            </p>
          )}
        </div>
      )}
      
      <div className="flex gap-5 overflow-x-auto pb-2 md:overflow-visible flex-nowrap md:flex-wrap">
        {members.map((member, index) => (
          <MemberCard key={index} member={member} />
        ))}
      </div>
    </div>
  );
};

export default TeamGrid;
