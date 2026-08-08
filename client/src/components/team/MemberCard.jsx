import { useEffect, useState } from 'react';
import { Mail, X } from 'lucide-react';
import { Github, Linkedin, Twitter, Instagram } from '../common/BrandIcons';
import { getDomainTheme, getDisplayRole } from '../../data/domainTheme';
import cx from '../../lib/cx';

/** Order the icons appear in, and how each one turns a value into an href. */
const socialConfig = [
  { key: 'github', icon: Github, label: 'GitHub' },
  { key: 'linkedin', icon: Linkedin, label: 'LinkedIn' },
  { key: 'twitter', icon: Twitter, label: 'Twitter' },
  { key: 'email', icon: Mail, label: 'Email', toHref: (value) => `mailto:${value}` },
  { key: 'instagram', icon: Instagram, label: 'Instagram' },
];

const MemberCard = ({ member }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { name, role, domain, image, socials } = member;
  const theme = getDomainTheme(domain);

  const links = socialConfig
    .filter(({ key }) => socials?.[key])
    .map((entry) => ({
      ...entry,
      href: entry.toHref ? entry.toHref(socials[entry.key]) : socials[entry.key],
    }));

  // The zoomed avatar is a lightbox: Escape closes it, and the page behind it
  // must not scroll while it is open.
  useEffect(() => {
    if (!isModalOpen) return undefined;

    const onKeyDown = (event) => {
      if (event.key === 'Escape') setIsModalOpen(false);
    };

    document.addEventListener('keydown', onKeyDown);
    const { overflow } = document.body.style;
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = overflow;
    };
  }, [isModalOpen]);

  const avatarStyle = {
    objectPosition: member.imagePosition || 'center',
    transform: member.imageScale ? `scale(${member.imageScale})` : undefined,
  };

  return (
    <>
      <div
        // The glow is tinted to the member's domain rather than the generic
        // purple; `.card-glow` reads these two variables.
        style={{ '--glow-edge': theme.edge, '--glow-bloom': theme.bloom }}
        className={cx(
          // No backdrop-blur here on purpose: the Team page renders ~47 of
          // these, and a backdrop-filter re-samples the live animated
          // background behind every one of them on every frame. The panel is
          // opaque enough at /85 that the blur bought nothing visible.
          'card-glow group flex h-full flex-col items-center rounded-2xl border bg-[#160f28]/85 p-4 text-center',
          'transition-all duration-300 hover:-translate-y-1 sm:p-6',
          theme.border,
        )}
      >
        {/* Avatar */}
        <div className="relative mb-4">
          {image ? (
            <button
              type="button"
              onClick={() => setIsModalOpen(true)}
              aria-label={`View ${name}'s photo`}
              className="relative h-20 w-20 overflow-hidden rounded-full ring-2 ring-purple-500/40 transition-all duration-300 hover:scale-105 group-hover:ring-purple-400/70 sm:h-24 sm:w-24"
            >
              <img src={image} alt={name} className="h-full w-full object-cover" style={avatarStyle} />
            </button>
          ) : (
            <div
              className={cx(
                'flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br shadow-lg sm:h-24 sm:w-24',
                'transition-transform duration-300 group-hover:scale-105',
                theme.gradient,
              )}
            >
              <span className="text-2xl font-bold text-white sm:text-3xl">
                {name
                  .split(' ')
                  .map((part) => part[0])
                  .join('')}
              </span>
            </div>
          )}

          {/* Glow ring on hover */}
          <div
            className={cx(
              'pointer-events-none absolute -inset-1 rounded-full bg-gradient-to-br opacity-0 blur-md',
              'transition-opacity duration-300 group-hover:opacity-20',
              theme.gradient,
            )}
            aria-hidden="true"
          />
        </div>

        <h3 className="text-sm font-bold leading-tight text-white transition-colors group-hover:text-pink-300 sm:text-base">
          {name}
        </h3>

        <p
          className={cx(
            'mt-1.5 bg-gradient-to-r bg-clip-text text-xs font-medium text-transparent sm:text-sm',
            theme.gradient,
          )}
        >
          {getDisplayRole(role, domain)}
        </p>

        {/* Pushed to the bottom so cards in a row end level with each other */}
        {links.length > 0 && (
          <div className="mt-auto flex items-center gap-1.5 pt-3">
            {links.map(({ key, icon: Icon, label, href }) => (
              <a
                key={key}
                href={href}
                target={key === 'email' ? undefined : '_blank'}
                rel={key === 'email' ? undefined : 'noopener noreferrer'}
                aria-label={`${name} on ${label}`}
                className="flex h-6 w-6 items-center justify-center rounded-full bg-purple-500/20 text-purple-400 transition-all hover:bg-purple-500 hover:text-white"
              >
                <Icon className="h-3 w-3" />
              </a>
            ))}
          </div>
        )}
      </div>

      {/* Zoomed avatar lightbox */}
      {isModalOpen && image && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`${name}, ${getDisplayRole(role, domain)}`}
          className="fixed inset-0 z-9999 flex cursor-zoom-out items-center justify-center bg-black/95 p-4 backdrop-blur-lg"
          onClick={() => setIsModalOpen(false)}
        >
          <div className="relative flex flex-col items-center" onClick={(event) => event.stopPropagation()}>
            <div className="h-64 w-64 overflow-hidden rounded-full shadow-[0_0_50px_rgba(168,85,247,0.3)] ring-4 ring-gray-900 md:h-80 md:w-80 lg:h-96 lg:w-96">
              <img
                src={image}
                alt={name}
                className="h-full w-full cursor-default object-cover"
                style={avatarStyle}
              />
            </div>

            <div className="mt-6 text-center">
              <h2 className="text-2xl font-bold text-white md:text-3xl">{name}</h2>
              <p className="mt-1 text-lg font-medium text-purple-400">{getDisplayRole(role, domain)}</p>
            </div>

            <button
              type="button"
              aria-label="Close"
              className="absolute -top-12 rounded-full bg-white/5 p-2 text-white/50 transition-colors hover:bg-white/10 hover:text-white md:-right-12 md:top-auto"
              onClick={() => setIsModalOpen(false)}
            >
              <X className="h-8 w-8" />
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default MemberCard;
