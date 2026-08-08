import { Instagram, Github, Linkedin, Twitter } from '../components/common/BrandIcons';

/** Single source of truth for anything that names or contacts the club. */
export const site = {
  name: 'dBug Labs',
  campus: 'SRM',
  university: 'SRM University',
  address: 'SRM University,\nKattankulathur, Chennai',
  tagline:
    'Discover, build, and innovate with dBug Labs. A space where ideas are tested, ' +
    'skills are refined, and future technologists grow.',
  email: 'dbuglabs@gmail.com',
  joinEmail: 'join@dbuglabs.com',
  phone: '+91 90060 61166',
  phoneHref: 'tel:+919006061166',
  instagramHandle: '@dBugLabs',
};

export const socialLinks = [
  { icon: Instagram, href: 'https://instagram.com/dBugLabs', label: 'Instagram' },
  { icon: Github, href: 'https://github.com/dBugLabs', label: 'GitHub' },
  { icon: Linkedin, href: 'https://linkedin.com/company/dBugLabs', label: 'LinkedIn' },
  { icon: Twitter, href: 'https://twitter.com/dBugLabs', label: 'Twitter' },
];
