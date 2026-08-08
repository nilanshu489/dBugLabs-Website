import { Calendar } from 'lucide-react';
import { site } from '../../data/site';
import { IconBadge } from '../ui';

/** Corner brackets that frame the panel. */
const corners = [
  'left-6 top-6 border-l-4 border-t-4 rounded-tl-lg',
  'right-6 top-6 border-r-4 border-t-4 rounded-tr-lg',
  'bottom-6 left-6 border-b-4 border-l-4 rounded-bl-lg',
  'bottom-6 right-6 border-b-4 border-r-4 rounded-br-lg',
];

const EventJourney = () => (
  <div className="relative mx-auto max-w-5xl">
    <div
      className="absolute -inset-1 animate-pulse rounded-2xl bg-gradient-to-r from-purple-600 to-pink-500 opacity-30 blur-sm"
      aria-hidden="true"
    />

    <div className="relative rounded-2xl border border-purple-500/30 bg-gradient-to-br from-purple-900/20 via-black to-pink-900/20 p-8 text-center sm:p-12 md:p-20">
      {corners.map((position) => (
        <div
          key={position}
          className={`absolute hidden h-16 w-16 border-purple-500/30 sm:block ${position}`}
          aria-hidden="true"
        />
      ))}

      <IconBadge icon={Calendar} size="xl" tone="solid" className="mx-auto mb-8" />

      <h2 className="font-display mb-6 text-4xl md:text-6xl lg:text-7xl">
        <span className="gradient-text">{site.name}</span>
      </h2>
      <p className="mb-8 text-3xl font-bold text-white md:text-5xl lg:text-6xl">Event Journey</p>

      <div className="mx-auto mb-8 h-1 w-24 rounded-full bg-gradient-to-r from-purple-600 to-pink-500" />

      <p className="mb-4 text-2xl font-semibold text-purple-400 md:text-3xl">Coming Soon</p>
      <p className="mx-auto max-w-2xl text-lg text-gray-400">
        We&apos;re preparing something amazing for you. Stay tuned for our upcoming events,
        workshops, and hackathons that will elevate your tech journey!
      </p>
    </div>
  </div>
);

export default EventJourney;
