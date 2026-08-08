import DomainShowcase from '../common/DomainShowcase';
import { Section, SectionHeading } from '../ui';

const CoreDomains = () => (
  <Section glow="center">
    <SectionHeading
      eyebrow="Expertise Areas"
      eyebrowTone="purple"
      title={
        <>
          Our Core <span className="gradient-text">Domains</span>
        </>
      }
      description="Explore the diverse areas where we innovate and excel"
      className="mb-16"
    />

    <DomainShowcase />
  </Section>
);

export default CoreDomains;
