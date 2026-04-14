import { useState } from 'react';
import { Github, Linkedin, Twitter, Mail, X, Instagram } from 'lucide-react';

const MemberCard = ({ member }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { name, role, domain, image, bio, socials } = member;

  const getDomainColor = (domain) => {
    const colors = {
      'Web Development': 'from-blue-500 to-cyan-500',
      'AI/ML': 'from-purple-500 to-pink-500',
      'Events': 'from-orange-500 to-red-500',
      'Sponsorship': 'from-green-500 to-emerald-500',
      'Public Relations': 'from-yellow-500 to-orange-500',
      'Creatives': 'from-pink-500 to-rose-500',
      'Leadership': 'from-purple-600 to-pink-600',
      'Board': 'from-purple-600 to-pink-600',
    };
    return colors[domain] || 'from-purple-500 to-pink-500';
  };

  const getDomainBorder = (domain) => {
    const colors = {
      'Web Development': 'border-blue-500/30 hover:border-blue-500/60',
      'AI/ML': 'border-purple-500/30 hover:border-purple-500/60',
      'Events': 'border-orange-500/30 hover:border-orange-500/60',
      'Sponsorship': 'border-green-500/30 hover:border-green-500/60',
      'Public Relations': 'border-yellow-500/30 hover:border-yellow-500/60',
      'Creatives': 'border-pink-500/30 hover:border-pink-500/60',
      'Leadership': 'border-purple-500/30 hover:border-purple-500/60',
      'Board': 'border-purple-500/30 hover:border-purple-500/60',
    };
    return colors[domain] || 'border-purple-500/30 hover:border-purple-500/60';
  };

  const getDomainGlow = (domain) => {
    const colors = {
      'Web Development': 'hover:shadow-blue-500/20',
      'AI/ML': 'hover:shadow-purple-500/20',
      'Events': 'hover:shadow-orange-500/20',
      'Sponsorship': 'hover:shadow-green-500/20',
      'Public Relations': 'hover:shadow-yellow-500/20',
      'Creatives': 'hover:shadow-pink-500/20',
      'Leadership': 'hover:shadow-purple-500/20',
      'Board': 'hover:shadow-purple-500/20',
    };
    return colors[domain] || 'hover:shadow-purple-500/20';
  };

  return (
    <>
      <div className="group flex-1 min-w-[180px]">
      <div className={`bg-gray-900/80 backdrop-blur-sm rounded-2xl overflow-hidden border ${getDomainBorder(domain)} transition-all duration-300 hover:shadow-lg ${getDomainGlow(domain)} hover:-translate-y-1 p-6 flex flex-col items-center text-center`}>
        
        {/* Avatar */}
        <div className="relative mb-4">
          {image ? (
            <button 
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setIsModalOpen(true);
              }}
              className="relative w-24 h-24 rounded-full appearance-none focus:outline-none cursor-pointer group/dp overflow-hidden ring-2 ring-purple-500/40 group-hover:ring-purple-400/70 transition-all duration-300 hover:scale-105"
            >
              <img 
                src={image} 
                alt={name}
                className="w-full h-full object-cover"
                style={{ 
                  objectPosition: member.imagePosition || 'center',
                  transform: member.imageScale ? `scale(${member.imageScale})` : undefined
                }}
              />
            </button>
          ) : (
            <div className={`w-24 h-24 rounded-full bg-gradient-to-br ${getDomainColor(domain)} flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform duration-300`}>
              <span className="text-3xl font-bold text-white">
                {name.split(' ').map(n => n[0]).join('')}
              </span>
            </div>
          )}
          {/* Glow ring effect */}
          <div className={`absolute -inset-1 rounded-full pointer-events-none bg-gradient-to-br ${getDomainColor(domain)} opacity-0 group-hover:opacity-20 blur-md transition-opacity duration-300`}></div>
        </div>

        {/* Name */}
        <h3 className="text-base font-bold text-white group-hover:text-pink-300 transition-colors leading-tight">
          {name}
        </h3>
        
        {/* Role */}
        <p className={`text-sm font-medium mt-1.5 bg-gradient-to-r ${getDomainColor(domain)} bg-clip-text text-transparent`}>
          {role}
        </p>

        {/* Social Links - compact */}
        {(socials?.github || socials?.linkedin || socials?.twitter || socials?.instagram || socials?.email) && (
          <div className="flex items-center gap-1.5 mt-3">
            {socials?.github && (
              <a
                href={socials.github}
                target="_blank"
                rel="noopener noreferrer"
                className="w-6 h-6 rounded-full bg-purple-500/20 flex items-center justify-center text-purple-400 hover:bg-purple-500 hover:text-white transition-all"
              >
                <Github className="w-3 h-3" />
              </a>
            )}
            {socials?.linkedin && (
              <a
                href={socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="w-6 h-6 rounded-full bg-purple-500/20 flex items-center justify-center text-purple-400 hover:bg-purple-500 hover:text-white transition-all"
              >
                <Linkedin className="w-3 h-3" />
              </a>
            )}
            {socials?.twitter && (
              <a
                href={socials.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="w-6 h-6 rounded-full bg-purple-500/20 flex items-center justify-center text-purple-400 hover:bg-purple-500 hover:text-white transition-all"
              >
                <Twitter className="w-3 h-3" />
              </a>
            )}
            {socials?.email && (
              <a
                href={`mailto:${socials.email}`}
                className="w-6 h-6 rounded-full bg-purple-500/20 flex items-center justify-center text-purple-400 hover:bg-purple-500 hover:text-white transition-all"
              >
                <Mail className="w-3 h-3" />
              </a>
            )}
            {socials?.instagram && (
              <a
                href={socials.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="w-6 h-6 rounded-full bg-purple-500/20 flex items-center justify-center text-purple-400 hover:bg-purple-500 hover:text-white transition-all"
              >
                <Instagram className="w-3 h-3" />
              </a>
            )}
          </div>
        )}
      </div>
    </div>

      {/* Instagram DP Style Modal */}
      {isModalOpen && image && (
        <div 
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/95 backdrop-blur-lg p-4 cursor-zoom-out animate-in fade-in duration-300"
          onClick={() => setIsModalOpen(false)}
        >
          <div className="relative flex flex-col items-center animate-in zoom-in-90 duration-300" onClick={e => e.stopPropagation()}>
            {/* The zoomed circular DP */}
            <div className="w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 rounded-full overflow-hidden shadow-[0_0_50px_rgba(168,85,247,0.3)] ring-4 ring-gray-900">
              <img 
                src={image} 
                alt={name} 
                className="w-full h-full object-cover cursor-default"
                style={{ 
                  objectPosition: member.imagePosition || 'center',
                  transform: member.imageScale ? `scale(${member.imageScale})` : undefined
                }}
              />
            </div>
            
            {/* Name below DP like Instagram */}
            <div className="mt-6 text-center">
              <h2 className="text-2xl md:text-3xl font-bold text-white">{name}</h2>
              <p className="text-purple-400 font-medium text-lg mt-1">{role}</p>
            </div>

            <button 
              className="absolute -top-12 md:-right-12 md:top-auto text-white/50 hover:text-white transition-colors p-2 rounded-full cursor-pointer bg-white/5 hover:bg-white/10"
              onClick={() => setIsModalOpen(false)}
            >
              <X className="w-8 h-8" />
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default MemberCard;
