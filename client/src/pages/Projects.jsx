import { useState } from 'react';
import ProjectCard from '../components/projects/ProjectCard';
import EventCard from '../components/projects/EventCard';
import { FolderGit2, Trophy, Code2, Lightbulb } from 'lucide-react';

const Projects = () => {
  const [activeTab, setActiveTab] = useState('projects');

  const projects = [
    {
      title: 'espionage-event',
      description: 'Event platform for the Espionage hackathon organized by dBug Labs.',
      techStack: ['TypeScript'],
      team: ['dBug Labs'],
      status: 'Completed',
      githubUrl: 'https://github.com/dbuglabs/espionage-event',
      completionDate: 'Apr 2026'
    },
    {
      title: 'nova_care',
      description: 'Healthcare application built with modern web technologies.',
      techStack: ['TypeScript'],
      team: ['dBug Labs'],
      status: 'Completed',
      githubUrl: 'https://github.com/dbuglabs/nova_care',
      completionDate: 'Mar 2026'
    },
    {
      title: 'MLExplorerHub',
      description: 'ML Domain Projects — a collection of machine learning explorations and experiments.',
      techStack: ['Jupyter Notebook', 'Python'],
      team: ['dBug Labs'],
      status: 'Completed',
      githubUrl: 'https://github.com/dbuglabs/MLExplorerHub',
      completionDate: 'Feb 2024'
    },
    {
      title: 'IoTExplorerHub',
      description: 'IoT Domain Projects — exploring Internet of Things with embedded systems.',
      techStack: ['C++', 'IoT'],
      team: ['dBug Labs'],
      status: 'Completed',
      githubUrl: 'https://github.com/dbuglabs/IoTExplorerHub',
      completionDate: 'Jan 2024'
    },
    {
      title: 'SensorExplorer',
      description: 'Research on different types of sensors and their applications.',
      techStack: ['Python', 'IoT'],
      team: ['dBug Labs'],
      status: 'Completed',
      githubUrl: 'https://github.com/dbuglabs/SensorExplorer',
      completionDate: 'Dec 2023'
    },
    {
      title: 'SG-REPOSITARY',
      description: 'Study group repository with shared learning resources and Colab notebooks.',
      techStack: ['Python', 'Jupyter'],
      team: ['dBug Labs'],
      status: 'Completed',
      githubUrl: 'https://github.com/dbuglabs/SG-REPOSITARY',
      completionDate: 'Apr 2023'
    },
    {
      title: 'lacasadeflutter',
      description: 'Flutter development projects and learning resources.',
      techStack: ['Flutter', 'Dart'],
      team: ['dBug Labs'],
      status: 'Completed',
      githubUrl: 'https://github.com/dbuglabs/lacasadeflutter',
      completionDate: 'Aug 2023'
    },
  ];

  const events = [
    {
      title: 'Hackathon 2024',
      description: 'Our flagship 24-hour hackathon bringing together 200+ developers to build innovative solutions.',
      date: 'March 15-16, 2024',
      location: 'Tech Block, SRM University',
      attendees: 200,
      type: 'Hackathon',
      winners: ['Team Alpha', 'Team Beta', 'Team Gamma']
    },
    {
      title: 'Web Dev Bootcamp',
      description: 'Intensive 3-day workshop covering modern web development with React and Node.js.',
      date: 'February 20-22, 2024',
      location: 'Lab Complex, SRM University',
      attendees: 120,
      type: 'Bootcamp',
      winners: []
    },
    {
      title: 'AI Challenge',
      description: 'Competitive programming contest focused on AI and machine learning problems.',
      date: 'January 25, 2024',
      location: 'Online',
      attendees: 350,
      type: 'Competition',
      winners: ['Alex Chen', 'Priya Sharma', 'Rahul Verma']
    },
    {
      title: 'Open Source Workshop',
      description: 'Hands-on workshop teaching students how to contribute to open source projects.',
      date: 'December 10, 2023',
      location: 'Seminar Hall',
      attendees: 80,
      type: 'Workshop',
      winners: []
    }
  ];

  const tabs = [
    { key: 'projects', label: 'Projects', icon: FolderGit2 },
    { key: 'events', label: 'Past Events', icon: Trophy },
  ];

  return (
    <main className="bg-black min-h-screen pt-24 pb-16">
      <div className="container mx-auto px-6">
        {/* Page Header */}
        <div className="text-center mb-12">
          <span className="text-pink-400 text-sm font-semibold tracking-wider uppercase">Our Work</span>
          <h1 className="text-4xl md:text-5xl font-bold mt-2 mb-4">
            Projects & <span className="gradient-text">Events</span>
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Explore the innovative projects we&apos;ve built and the events we&apos;ve organized
          </p>
        </div>

        {/* Tabs */}
        <div className="flex justify-center gap-4 mb-12">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`flex items-center gap-2 px-8 py-4 rounded-full font-semibold transition-all ${
                activeTab === tab.key
                  ? 'bg-gradient-to-r from-purple-600 to-pink-500 text-white shadow-lg shadow-purple-500/30'
                  : 'bg-purple-500/10 text-gray-400 border border-purple-500/20 hover:border-purple-500/50'
              }`}
            >
              <tab.icon className="w-5 h-5" />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content */}
        {activeTab === 'projects' ? (
          <>
            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
              {[
                { value: '20+', label: 'Projects', icon: FolderGit2 },
                { value: '15+', label: 'Technologies', icon: Code2 },
                { value: '50+', label: 'Contributors', icon: Lightbulb },
                { value: '5+', label: 'Deployments', icon: Trophy },
              ].map((stat, index) => (
                <div key={index} className="card p-6 text-center">
                  <stat.icon className="w-8 h-8 text-purple-400 mx-auto mb-3" />
                  <div className="text-3xl font-bold gradient-text mb-1">{stat.value}</div>
                  <div className="text-sm text-gray-400">{stat.label}</div>
                </div>
              ))}
            </div>

            {/* Projects Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.map((project, index) => (
                <ProjectCard key={index} project={project} />
              ))}
            </div>
          </>
        ) : (
          <>
            {/* Coming Soon Placeholder */}
            <div className="flex flex-col items-center justify-center py-24 text-center">
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-purple-600/20 to-pink-500/20 flex items-center justify-center mb-8">
                <Trophy className="w-12 h-12 text-purple-400" />
              </div>
              <h3 className="text-3xl font-bold text-white mb-4">
                Curating Our <span className="gradient-text">Journey</span>
              </h3>
              <p className="text-gray-400 max-w-lg mx-auto text-lg mb-3">
                We're compiling highlights from our past events. Stay tuned — great memories are on their way!
              </p>
              <span className="inline-flex items-center gap-2 px-6 py-2 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-300 text-sm font-medium">
                <span className="w-2 h-2 rounded-full bg-purple-400 animate-pulse" />
                In Progress
              </span>
            </div>
          </>
        )}
      </div>
    </main>
  );
};

export default Projects;
