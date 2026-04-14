import { ExternalLink, Github, Users, Calendar } from 'lucide-react';

const ProjectCard = ({ project }) => {
  const { title, description, image, techStack, team, status, githubUrl, liveUrl, completionDate } = project;

  const getStatusColor = (status) => {
    const colors = {
      'Completed': 'bg-green-500/20 text-green-400 border-green-500/30',
      'In Progress': 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
      'Planning': 'bg-blue-500/20 text-blue-400 border-blue-500/30',
    };
    return colors[status] || 'bg-gray-500/20 text-gray-400 border-gray-500/30';
  };

  return (
    <div className="card group overflow-hidden flex flex-col h-full">
      {/* Project Image */}
      <div className="relative h-48 overflow-hidden bg-gradient-to-br from-purple-900/50 to-pink-900/50">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-purple-600 to-pink-500 flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
            <span className="text-3xl font-bold text-white">
              {title.charAt(0)}
            </span>
          </div>
        </div>
        
        {/* Status Badge */}
        <div className="absolute top-4 right-4">
          <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getStatusColor(status)}`}>
            {status}
          </span>
        </div>

        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
          {githubUrl && (
            <a
              href={githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-purple-500 hover:scale-110 transition-all"
            >
              <Github className="w-6 h-6" />
            </a>
          )}
          {liveUrl && (
            <a
              href={liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-purple-500 hover:scale-110 transition-all"
            >
              <ExternalLink className="w-6 h-6" />
            </a>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col flex-1">
        <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-pink-400 transition-colors">
          {title}
        </h3>
        <p className="text-gray-400 text-sm mb-4 line-clamp-2 flex-1">
          {description}
        </p>

        {/* Tech Stack */}
        <div className="flex flex-wrap gap-2 mb-4">
          {techStack.map((tech, index) => (
            <span
              key={index}
              className="px-3 py-1 rounded-full text-xs font-medium bg-purple-500/10 text-purple-300 border border-purple-500/20"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Meta Info */}
        <div className="flex items-center justify-between pt-4 border-t border-purple-500/10">
          <div className="flex items-center gap-2 text-sm text-gray-400">
            <Users className="w-4 h-4 text-purple-400" />
            <span>{team.length} members</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-400">
            <Calendar className="w-4 h-4 text-purple-400" />
            <span>{completionDate}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
