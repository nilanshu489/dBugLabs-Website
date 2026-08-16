import {
  Code2,
  Users,
  Smartphone,
  CheckCircle2,
  Layers,
  Calendar,
  Network,
  Lightbulb,
} from 'lucide-react';

/**
 * The club's two verticals and their sub-domains. Rendered on both the home
 * page ("Our Core Domains") and the about page ("Our Domains") — they used to
 * be two hand-maintained copies that had already drifted apart.
 */
export const domains = {
  technical: {
    title: 'Technical',
    icon: Code2,
    description: 'Building innovative solutions through code',
    subdomains: [
      {
        slug: 'web-development',
        name: 'Web Development',
        icon: Code2,
        image: '/web-domain.png',
        description: 'Full-stack web applications and modern frameworks',
      },
      {
        slug: 'app-development',
        name: 'App Development',
        icon: Smartphone,
        image: '/app-domain.png',
        description: 'Native and cross-platform mobile applications',
      },
      {
        slug: 'qa-testing',
        name: 'QA & Testing',
        icon: CheckCircle2,
        image: '/qa-domain.png',
        description: 'Software quality assurance, testing, and reliability',
      },
      {
        slug: 'aiml',
        name: 'AI/ML',
        icon: Layers,
        image: '/aiml-domain.png',
        description: 'Machine learning models and AI-driven solutions',
      },
    ],
  },
  corporate: {
    title: 'Corporate',
    icon: Users,
    description: 'Managing operations and external relations',
    subdomains: [
      {
        slug: 'events',
        name: 'Events',
        icon: Calendar,
        image: '/events-domain.png',
        description: 'Organizing tech events, workshops, and hackathons',
      },
      {
        slug: 'sponsorship',
        name: 'Sponsorship',
        icon: Network,
        image: '/sponsorship-domain.png',
        description: 'Building partnerships with industry leaders',
      },
      {
        slug: 'public-relations',
        name: 'Public Relations',
        icon: Users,
        image: '/pr-domain.png',
        description: 'Managing community and public outreach',
      },
      {
        slug: 'creatives',
        name: 'Creatives',
        icon: Lightbulb,
        image: '/creatives-domain.png',
        description: 'Design, content, and creative strategy',
      },
    ],
  },
};

export const domainKeys = Object.keys(domains);
