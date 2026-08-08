import { useState } from 'react';
import { FolderGit2, Trophy } from 'lucide-react';
import ProjectCard from '../components/projects/ProjectCard';
import { projects } from '../data/projects';
import { projectStats } from '../data/stats';
import { Container, PageHeader, StatCard, TabSwitcher } from '../components/ui';

const tabs = [
  { key: 'projects', label: 'Projects', icon: FolderGit2 },
  { key: 'events', label: 'Past Events', icon: Trophy },
];

const PastEventsPlaceholder = () => (
  <div className="flex flex-col items-center justify-center py-24 text-center">
    <div className="mb-8 flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-purple-600/20 to-pink-500/20">
      <Trophy className="h-12 w-12 text-purple-400" />
    </div>
    <h2 className="mb-4 text-3xl font-bold text-white">
      Curating Our <span className="gradient-text">Journey</span>
    </h2>
    <p className="mx-auto mb-3 max-w-lg text-lg text-gray-400">
      We&apos;re compiling highlights from our past events. Stay tuned — great memories are on their
      way!
    </p>
    <span className="inline-flex items-center gap-2 rounded-full border border-purple-500/20 bg-purple-500/10 px-6 py-2 text-sm font-medium text-purple-300">
      <span className="h-2 w-2 animate-pulse rounded-full bg-purple-400" />
      In Progress
    </span>
  </div>
);

const Projects = () => {
  const [activeTab, setActiveTab] = useState('projects');

  return (
    <main className="min-h-screen pt-24 pb-16">
      <Container>
        <PageHeader
          eyebrow="Our Work"
          title={
            <>
              Projects & <span className="gradient-text">Events</span>
            </>
          }
          description="Explore the innovative projects we've built and the events we've organized"
          className="mb-12"
        />

        <TabSwitcher tabs={tabs} value={activeTab} onChange={setActiveTab} className="mb-12" />

        {activeTab === 'projects' ? (
          <>
            <div className="mb-12 grid grid-cols-2 gap-4 sm:gap-6 md:grid-cols-4">
              {projectStats.map((stat) => (
                <StatCard key={stat.label} {...stat} size="sm" />
              ))}
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {projects.map((project) => (
                <ProjectCard key={project.title} project={project} />
              ))}
            </div>
          </>
        ) : (
          <PastEventsPlaceholder />
        )}
      </Container>
    </main>
  );
};

export default Projects;
