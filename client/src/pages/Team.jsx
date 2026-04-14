import { useState } from 'react';
import TeamGrid from '../components/team/TeamGrid';
import { useTeamData } from '../hooks/useTeamData';
import { Users, Code2, Lightbulb, Target, Megaphone, DollarSign, Palette, ChevronDown, ChevronUp } from 'lucide-react';

const Team = () => {
  const [expandedSections, setExpandedSections] = useState({
    board: true,
    technical: true,
    webdev: true,
    aiml: true,
    corporate: true,
    events: true,
    pr: true,
    sponsorship: true,
    creatives: true,
  });

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const { boardMembers, webDevLead, aimlLead, technicalMembers, eventsLead, sponsorshipLead, prLead, creativesLead, corporateMembers, isLoading } = useTeamData();

  return (
    <main className="bg-black min-h-screen pt-24 pb-16">
      <div className="container mx-auto px-4">
        {/* Page Header */}
        <div className="text-center mb-16">
          <span className="text-pink-400 text-sm font-semibold tracking-wider uppercase">Our People</span>
          <h1 className="text-4xl md:text-5xl font-bold mt-2 mb-4">
            Meet the <span className="gradient-text">Team</span>
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto">
            The passionate individuals behind dBug Labs who make everything possible
          </p>
        </div>

        {/* Board Members Section */}
        <div className="mb-20">
          <div
            className="flex items-center justify-between cursor-pointer mb-8"
            onClick={() => toggleSection('board')}
          >
            <div className="flex items-center gap-3">
              <Users className="w-8 h-8 text-purple-400" />
              <h2 className="text-3xl md:text-4xl font-bold text-white">Board Members</h2>
            </div>
            {expandedSections.board ? <ChevronUp className="w-6 h-6 text-purple-400" /> : <ChevronDown className="w-6 h-6 text-purple-400" />}
          </div>

          {expandedSections.board && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {boardMembers.map((member, index) => (
                <TeamGrid key={index} members={[member]} />
              ))}
            </div>
          )}
        </div>

        {/* Technical Domain */}
        <div className="mb-20">
          <div
            className="flex items-center justify-between cursor-pointer mb-8"
            onClick={() => toggleSection('technical')}
          >
            <div className="flex items-center gap-3">
              <Code2 className="w-8 h-8 text-blue-400" />
              <h2 className="text-3xl md:text-4xl font-bold text-white">Technical</h2>
            </div>
            {expandedSections.technical ? <ChevronUp className="w-6 h-6 text-blue-400" /> : <ChevronDown className="w-6 h-6 text-blue-400" />}
          </div>

          {expandedSections.technical && (
            <div className="space-y-12">
              {/* Leads Section */}
              <div>
                <h3 className="text-2xl font-bold text-white mb-6">Leads</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                  <TeamGrid members={[webDevLead]} />
                  <TeamGrid members={[aimlLead]} />
                </div>
              </div>

              {/* Members Section */}
              <div>
                <h3 className="text-xl font-semibold text-blue-400 mb-6">Members</h3>
                {technicalMembers.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
                    {technicalMembers.map((member, index) => (
                      <TeamGrid key={index} members={[member]} />
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500 text-center py-8">Members will be announced soon</p>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Corporate Domain */}
        <div className="mb-20">
          <div
            className="flex items-center justify-between cursor-pointer mb-8"
            onClick={() => toggleSection('corporate')}
          >
            <div className="flex items-center gap-3">
              <Megaphone className="w-8 h-8 text-pink-400" />
              <h2 className="text-3xl md:text-4xl font-bold text-white">Corporate</h2>
            </div>
            {expandedSections.corporate ? <ChevronUp className="w-6 h-6 text-pink-400" /> : <ChevronDown className="w-6 h-6 text-pink-400" />}
          </div>

          {expandedSections.corporate && (
            <div className="space-y-12">
              {/* Leads Section */}
              <div>
                <h3 className="text-2xl font-bold text-white mb-6">Leads</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                  <TeamGrid members={[eventsLead]} />
                  <TeamGrid members={[sponsorshipLead]} />
                  <TeamGrid members={[prLead]} />
                  <TeamGrid members={[creativesLead]} />
                </div>
              </div>

              {/* Members Section */}
              <div>
                <h3 className="text-xl font-semibold text-pink-400 mb-6">Members</h3>
                {corporateMembers.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
                    {corporateMembers.map((member, index) => (
                      <TeamGrid key={index} members={[member]} />
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500 text-center py-8">Members will be announced soon</p>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
};

export default Team;
