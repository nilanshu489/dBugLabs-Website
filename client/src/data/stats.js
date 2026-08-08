import {
  Users,
  Calendar,
  Layers,
  Code2,
  FolderGit2,
  Trophy,
  Lightbulb,
} from 'lucide-react';

/** Home page — "Our Impact". */
export const impactStats = [
  { value: '50+', label: 'Active Members', icon: Users },
  { value: '10+', label: 'Events Organized', icon: Calendar },
  { value: '5+', label: 'Core Domains', icon: Layers },
  { value: '20+', label: 'Projects Completed', icon: Code2 },
];

/** Projects page header strip. */
export const projectStats = [
  { value: '20+', label: 'Projects', icon: FolderGit2 },
  { value: '15+', label: 'Technologies', icon: Code2 },
  { value: '50+', label: 'Contributors', icon: Lightbulb },
  { value: '5+', label: 'Deployments', icon: Trophy },
];

/** About page — "Our History" figures. */
export const historyStats = [
  { value: '2023', label: 'Year Founded' },
  { value: '30+', label: 'Active Members' },
  { value: '20+', label: 'Projects Completed' },
  { value: '15+', label: 'Events Organized' },
];
