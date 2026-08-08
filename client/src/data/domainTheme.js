/**
 * Per-domain colour treatment for team cards.
 *
 * This replaces three parallel lookup tables (gradient / border / glow) that
 * each repeated the same 14 domain keys and had to be kept in sync by hand.
 *
 * Class strings are written out in full so Tailwind's source scanner can see
 * them — do not build these by concatenation.
 */
/**
 * `edge` / `bloom` feed the --glow-edge and --glow-bloom custom properties of
 * `.card-glow`, so a member card's glowing border matches its domain instead
 * of the generic purple. They are rgba() rather than Tailwind classes because
 * they are set inline as CSS variables.
 */
const themes = {
  web: {
    gradient: 'from-blue-500 to-cyan-500',
    border: 'border-blue-500/25 hover:border-blue-500/55',
    edge: 'rgba(59, 130, 246, 0.6)',
    bloom: 'rgba(59, 130, 246, 0.45)',
  },
  app: {
    gradient: 'from-cyan-500 to-blue-600',
    border: 'border-cyan-500/25 hover:border-cyan-500/55',
    edge: 'rgba(6, 182, 212, 0.6)',
    bloom: 'rgba(6, 182, 212, 0.45)',
  },
  qa: {
    gradient: 'from-teal-500 to-emerald-500',
    border: 'border-teal-500/25 hover:border-teal-500/55',
    edge: 'rgba(20, 184, 166, 0.6)',
    bloom: 'rgba(20, 184, 166, 0.45)',
  },
  aiml: {
    gradient: 'from-purple-500 to-pink-500',
    border: 'border-purple-500/25 hover:border-purple-500/55',
    edge: 'rgba(168, 85, 247, 0.6)',
    bloom: 'rgba(168, 85, 247, 0.45)',
  },
  events: {
    gradient: 'from-orange-500 to-red-500',
    border: 'border-orange-500/25 hover:border-orange-500/55',
    edge: 'rgba(249, 115, 22, 0.6)',
    bloom: 'rgba(249, 115, 22, 0.45)',
  },
  sponsorship: {
    gradient: 'from-green-500 to-emerald-500',
    border: 'border-green-500/25 hover:border-green-500/55',
    edge: 'rgba(34, 197, 94, 0.6)',
    bloom: 'rgba(34, 197, 94, 0.45)',
  },
  pr: {
    gradient: 'from-yellow-500 to-orange-500',
    border: 'border-yellow-500/25 hover:border-yellow-500/55',
    edge: 'rgba(234, 179, 8, 0.6)',
    bloom: 'rgba(234, 179, 8, 0.45)',
  },
  creatives: {
    gradient: 'from-pink-500 to-rose-500',
    border: 'border-pink-500/25 hover:border-pink-500/55',
    edge: 'rgba(236, 72, 153, 0.6)',
    bloom: 'rgba(236, 72, 153, 0.45)',
  },
  board: {
    gradient: 'from-purple-600 to-pink-600',
    border: 'border-purple-500/25 hover:border-purple-500/55',
    edge: 'rgba(147, 51, 234, 0.65)',
    bloom: 'rgba(147, 51, 234, 0.5)',
  },
};

/** Long and short spellings of every domain the CMS can hand us. */
const aliases = {
  'Web Development': 'web',
  'Web Dev': 'web',
  'App Development': 'app',
  'App Dev': 'app',
  'QA & Testing': 'qa',
  'QA and Testing': 'qa',
  'AI/ML': 'aiml',
  Events: 'events',
  Sponsorship: 'sponsorship',
  'Public Relations': 'pr',
  PR: 'pr',
  Creatives: 'creatives',
  Leadership: 'board',
  Board: 'board',
};

/** Abbreviations used when a domain name has to fit inside a role label. */
const shortNames = {
  'Public Relations': 'PR',
  'Web Development': 'Web Dev',
  'App Development': 'App Dev',
  'QA & Testing': 'QA',
  'QA and Testing': 'QA',
};

export const getDomainTheme = (domain) => themes[aliases[domain]] ?? themes.aiml;

export const shortDomain = (domain) => shortNames[domain] ?? domain;

/**
 * "Lead" + "Web Development" reads as "Web Dev Lead". Roles that already name
 * their domain (or don't have one) are passed through untouched.
 */
export const getDisplayRole = (role, domain) => {
  if (!role) return '';
  if (role === 'Lead' || role === 'Associate') return `${shortDomain(domain)} ${role}`;
  return role;
};
