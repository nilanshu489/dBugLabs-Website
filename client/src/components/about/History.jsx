import { historyStats } from '../../data/stats';
import { Card } from '../ui';

const History = () => (
  <Card className="p-8 md:p-12">
    <div className="grid items-center gap-8 md:grid-cols-2">
      <div>
        <span className="text-sm font-semibold uppercase tracking-wider text-purple-400">
          Our Journey
        </span>
        <h3 className="mb-4 mt-2 text-3xl font-bold text-white md:text-4xl">
          Our <span className="gradient-text">History</span>
        </h3>
        <p className="mb-4 text-gray-400">
          Founded in 2023, dBug Labs started as a small group of coding enthusiasts who wanted to
          create a collaborative learning environment at SRM. What began as weekly coding sessions
          has grown into a thriving community of 30+ active members working on cutting-edge
          projects.
        </p>
        <p className="text-gray-400">
          Over the years, we&apos;ve organized numerous hackathons, tech workshops, and industry
          collaborations, establishing ourselves as one of the most active tech communities on
          campus.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {historyStats.map((stat) => (
          <Card key={stat.label} className="p-6 text-center">
            <div className="gradient-text mb-2 text-3xl font-bold sm:text-4xl">{stat.value}</div>
            <div className="text-sm text-gray-400">{stat.label}</div>
          </Card>
        ))}
      </div>
    </div>
  </Card>
);

export default History;
