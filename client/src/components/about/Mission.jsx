import { Target, Rocket } from 'lucide-react';

const pillars = [
  {
    icon: Target,
    tone: 'text-purple-400',
    title: 'Our Vision',
    body: 'To be the leading student tech community that bridges the gap between academic learning and industry requirements, producing job-ready graduates who can make immediate impact in the tech world.',
  },
  {
    icon: Rocket,
    tone: 'text-pink-400',
    title: 'Our Purpose',
    body: 'To create a vibrant ecosystem where students can explore technology, develop their skills through hands-on projects, collaborate with peers, and build innovative solutions that address real-world problems.',
  },
];

const Mission = () => (
  <div className="relative overflow-hidden rounded-2xl">
    <div
      className="absolute inset-0 bg-gradient-to-r from-purple-900/50 to-pink-900/50"
      aria-hidden="true"
    />
    <div
      className="absolute inset-0 bg-[radial-gradient(circle,rgba(147,51,234,0.08)_2px,transparent_2px)] [background-size:60px_60px]"
      aria-hidden="true"
    />

    <div className="relative p-8 md:p-12">
      <div className="mb-8 text-center">
        <span className="text-sm font-semibold uppercase tracking-wider text-pink-400">
          What Drives Us
        </span>
        <h3 className="mb-4 mt-2 text-3xl font-bold text-white md:text-4xl">
          Our <span className="gradient-text">Mission</span>
        </h3>
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        {pillars.map(({ icon: Icon, tone, title, body }) => (
          <div key={title}>
            <h4 className="mb-3 flex items-center gap-2 text-xl font-semibold text-white">
              <Icon className={`h-5 w-5 ${tone}`} />
              {title}
            </h4>
            <p className="text-gray-300">{body}</p>
          </div>
        ))}
      </div>
    </div>
  </div>
);

export default Mission;
