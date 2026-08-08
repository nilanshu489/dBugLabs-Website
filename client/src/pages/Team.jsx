import { useState } from 'react';
import { Users, Code2, Megaphone, ChevronDown, ChevronUp } from 'lucide-react';
import MemberGrid from '../components/team/MemberGrid';
import { useTeamData } from '../hooks/useTeamData';
import { POSITIONS } from '../data/roster';
import { Container, PageHeader } from '../components/ui';
import cx from '../lib/cx';

/** The two verticals, in page order. */
const VERTICALS = [
  { key: 'technical', title: 'Technical', icon: Code2, tone: 'text-blue-400' },
  { key: 'corporate', title: 'Corporate', icon: Megaphone, tone: 'text-pink-400' },
];

const CollapsibleSection = ({ id, title, icon: Icon, tone, isOpen, onToggle, children }) => (
  <section className="mb-16 lg:mb-20">
    <button
      type="button"
      onClick={onToggle}
      aria-expanded={isOpen}
      aria-controls={`${id}-panel`}
      className="mb-8 flex w-full items-center justify-between gap-4 text-left"
    >
      <span className="flex items-center gap-3">
        <Icon className={cx('h-7 w-7 sm:h-8 sm:w-8', tone)} />
        <span className="text-2xl font-bold text-white sm:text-3xl md:text-4xl">{title}</span>
      </span>
      {isOpen ? (
        <ChevronUp className={cx('h-6 w-6 shrink-0', tone)} />
      ) : (
        <ChevronDown className={cx('h-6 w-6 shrink-0', tone)} />
      )}
    </button>

    {isOpen && <div id={`${id}-panel`}>{children}</div>}
  </section>
);

const Subgroup = ({ title, tone, members, emptyLabel }) => (
  <div>
    <h3 className={cx('mb-6 text-xl font-semibold sm:text-2xl', tone ?? 'text-white')}>{title}</h3>
    {members.length > 0 ? (
      <MemberGrid members={members} />
    ) : (
      <p className="py-8 text-center text-gray-500">{emptyLabel}</p>
    )}
  </div>
);

const Team = () => {
  const [openSections, setOpenSections] = useState({
    board: true,
    technical: true,
    corporate: true,
  });

  const toggleSection = (key) =>
    setOpenSections((prev) => ({ ...prev, [key]: !prev[key] }));

  const team = useTeamData();
  const { boardMembers, technicalMembers, corporateMembers } = team;

  /**
   * Flatten every seat of a given kind into one list. Driven by POSITIONS, so
   * adding a domain there puts it on the page without touching this file.
   */
  const collect = (group, kind) =>
    POSITIONS.filter((position) => position.group === group && position.kind === kind).flatMap(
      (position) => team[position.key] ?? [],
    );

  const membersFor = {
    technical: technicalMembers,
    corporate: corporateMembers,
  };

  return (
    <main className="min-h-screen pt-24 pb-16">
      <Container>
        <PageHeader
          eyebrow="Our People"
          title={
            <>
              Meet the <span className="gradient-text">Team</span>
            </>
          }
          description="The passionate individuals behind dBug Labs who make everything possible"
          className="mb-16"
        />

        <CollapsibleSection
          id="board"
          title="Board Members"
          icon={Users}
          tone="text-purple-400"
          isOpen={openSections.board}
          onToggle={() => toggleSection('board')}
        >
          <MemberGrid members={boardMembers} />
        </CollapsibleSection>

        {VERTICALS.map(({ key, title, icon, tone }) => (
          <CollapsibleSection
            key={key}
            id={key}
            title={title}
            icon={icon}
            tone={tone}
            isOpen={openSections[key]}
            onToggle={() => toggleSection(key)}
          >
            <div className="space-y-12">
              <Subgroup title="Leads" members={collect(key, 'lead')} />
              <Subgroup title="Associates" members={collect(key, 'associate')} />
              <Subgroup
                title="Members"
                tone={tone}
                members={membersFor[key]}
                emptyLabel="Members will be announced soon"
              />
            </div>
          </CollapsibleSection>
        ))}
      </Container>
    </main>
  );
};

export default Team;
