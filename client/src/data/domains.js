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
        name: 'Web Development',
        icon: Code2,
        description: 'Full-stack web applications and modern frameworks',
      },
      {
        name: 'App Development',
        icon: Smartphone,
        description: 'Native and cross-platform mobile applications',
      },
      {
        name: 'QA & Testing',
        icon: CheckCircle2,
        description: 'Software quality assurance, testing, and reliability',
      },
      {
        name: 'AI/ML',
        icon: Layers,
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
        name: 'Events',
        icon: Calendar,
        description: 'Organizing tech events, workshops, and hackathons',
      },
      {
        name: 'Sponsorship',
        icon: Network,
        description: 'Building partnerships with industry leaders',
      },
      {
        name: 'Public Relations',
        icon: Users,
        description: 'Managing community and public outreach',
      },
      {
        name: 'Creatives',
        icon: Lightbulb,
        description: 'Design, content, and creative strategy',
      },
    ],
  },
};

export const domainKeys = Object.keys(domains);
