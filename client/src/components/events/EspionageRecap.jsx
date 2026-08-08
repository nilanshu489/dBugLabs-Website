import { Calendar } from 'lucide-react';
import { espionage } from '../../data/events';
import { Card, IconBadge } from '../ui';

/** Decorative corner brackets on the poster frame. */
const corners = [
  'left-4 top-4 border-l-2 border-t-2 border-purple-500/40 rounded-tl-md',
  'right-4 top-4 border-r-2 border-t-2 border-pink-500/40 rounded-tr-md',
  'bottom-4 left-4 border-b-2 border-l-2 border-pink-500/40 rounded-bl-md',
  'bottom-4 right-4 border-b-2 border-r-2 border-purple-500/40 rounded-br-md',
];

const EspionageRecap = () => (
  <div className="relative">
    <div
      className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-purple-600/20 to-pink-500/20 blur-lg"
      aria-hidden="true"
    />

    <Card className="relative p-8 md:p-12">
      <div className="grid items-center gap-10 md:grid-cols-2">
        <div>
          <div className="mb-6 flex items-center gap-3">
            <IconBadge icon={Calendar} size="sm" tone="solid" />
            <div>
              <p className="text-lg font-semibold text-white">{espionage.date}</p>
              <p className="text-sm text-gray-400">Event Date</p>
            </div>
          </div>

          <h3 className="mb-4 text-2xl font-bold text-white md:text-3xl">
            Coding Contest — <span className="text-red-500">{espionage.theme}</span> Theme
          </h3>
          <p className="mb-4 text-gray-300">
            Espionage was a high-stakes coding competition that challenged participants to think
            like detectives and solve intricate problems. Inspired by the theme of{' '}
            <span className="font-medium text-red-500">{espionage.theme}</span>, contestants
            navigated through layers of logic puzzles, algorithmic challenges, and code-breaking
            missions to prove their mettle.
          </p>
          <p className="text-sm text-gray-400">
            Participants put their problem-solving skills to the test in a competitive yet
            collaborative environment, showcasing the best of dBug Labs&apos; coding community.
          </p>

          <div className="mt-6 flex flex-wrap gap-2">
            {espionage.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-purple-500/20 bg-purple-500/10 px-3 py-1 text-xs font-medium text-purple-300"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        <div className="relative">
          <div
            className="absolute -inset-2 rounded-2xl bg-gradient-to-br from-purple-600/20 to-pink-500/20 blur-xl"
            aria-hidden="true"
          />
          <div className="relative h-[420px] overflow-hidden rounded-2xl border border-purple-500/20 bg-black/80">
            <img
              src={espionage.poster}
              alt={`${espionage.name} — ${espionage.theme} theme poster`}
              className="h-full w-full object-contain"
            />
            <div
              className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"
              aria-hidden="true"
            />
            <p className="absolute inset-x-0 bottom-5 z-10 text-center text-sm font-semibold uppercase tracking-widest text-red-500">
              {espionage.tagline}
            </p>
            {corners.map((position) => (
              <div key={position} className={`absolute h-10 w-10 ${position}`} aria-hidden="true" />
            ))}
          </div>
        </div>
      </div>
    </Card>
  </div>
);

export default EspionageRecap;
