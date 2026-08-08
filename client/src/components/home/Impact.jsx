import { impactStats } from '../../data/stats';
import { Section, SectionHeading, StatCard } from '../ui';

const Impact = () => (
  <Section glow="center" fadeTop>
    <SectionHeading
      eyebrow="Making a Difference"
      title={
        <>
          Our <span className="gradient-text">Impact</span>
        </>
      }
      description="Building a thriving tech community at SRM University through innovation, collaboration, and continuous learning"
      className="mb-16"
    />

    <div className="mx-auto grid max-w-5xl grid-cols-2 gap-4 sm:gap-6 md:grid-cols-4 md:gap-8">
      {impactStats.map((stat) => (
        <StatCard key={stat.label} {...stat} size="lg" />
      ))}
    </div>
  </Section>
);

export default Impact;
