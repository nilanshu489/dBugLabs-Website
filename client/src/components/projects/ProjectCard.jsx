import { ExternalLink, Users, Calendar } from 'lucide-react';
import { Github } from '../common/BrandIcons';
import { Card } from '../ui';
import cx from '../../lib/cx';

const statusStyles = {
  Completed: 'bg-green-500/20 text-green-400 border-green-500/30',
  'In Progress': 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
  Planning: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
};

const ProjectCard = ({ project }) => {
  const { title, description, image, techStack, team, status, githubUrl, liveUrl, completionDate } =
    project;

  const links = [
    { href: githubUrl, icon: Github, label: `${title} on GitHub` },
    { href: liveUrl, icon: ExternalLink, label: `${title} live site` },
  ].filter((link) => link.href);

  return (
    <Card interactive className="group flex h-full flex-col overflow-hidden">
      {/* Cover */}
      <div className="relative h-48 overflow-hidden bg-gradient-to-br from-purple-950/80 via-indigo-950/70 to-purple-950/90 border-b border-purple-500/20">
        {image ? (
          <img
            src={image}
            alt={title}
            className="h-full w-full object-cover scale-[1.1] transition-transform duration-500 group-hover:scale-125 brightness-110 contrast-110"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-purple-600 to-pink-500 transition-transform duration-500 group-hover:scale-110">
              <span className="text-3xl font-bold text-white">{title.charAt(0)}</span>
            </div>
          </div>
        )}

        <span
          className={cx(
            'absolute right-4 top-4 rounded-full border px-3 py-1 text-xs font-semibold',
            statusStyles[status] ?? 'border-gray-500/30 bg-gray-500/20 text-gray-400',
          )}
        >
          {status}
        </span>

        {links.length > 0 && (
          <div className="absolute inset-0 flex items-center justify-center gap-4 bg-black/60 opacity-0 transition-opacity group-hover:opacity-100">
            {links.map(({ href, icon: Icon, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white transition-all hover:scale-110 hover:bg-purple-500"
              >
                <Icon className="h-6 w-6" />
              </a>
            ))}
          </div>
        )}
      </div>

      {/* Body */}
      <div className="flex flex-1 flex-col p-6">
        <h3 className="mb-2 text-xl font-semibold text-white transition-colors group-hover:text-pink-400">
          {title}
        </h3>
        <p className="mb-4 line-clamp-2 flex-1 text-sm text-gray-400">{description}</p>

        <div className="mb-4 flex flex-wrap gap-2">
          {techStack.map((tech) => (
            <span
              key={tech}
              className="rounded-full border border-purple-500/20 bg-purple-500/10 px-3 py-1 text-xs font-medium text-purple-300"
            >
              {tech}
            </span>
          ))}
        </div>

        <div className="flex items-center justify-between border-t border-purple-500/10 pt-4 text-sm text-gray-400">
          <span className="flex items-center gap-2">
            <Users className="h-4 w-4 text-purple-400" />
            {team.length} {team.length === 1 ? 'member' : 'members'}
          </span>
          <span className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-purple-400" />
            {completionDate}
          </span>
        </div>
      </div>
    </Card>
  );
};

export default ProjectCard;
