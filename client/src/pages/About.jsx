import FoundersPhoto from '../components/about/FoundersPhoto';
import History from '../components/about/History';
import Mission from '../components/about/Mission';
import DomainShowcase from '../components/common/DomainShowcase';
import { features } from '../data/initiatives';
import { CtaBanner, Container, FeatureCard, PageHeader, Section, SectionHeading } from '../components/ui';

const AboutPage = () => (
  <main className="pt-24">
    <Container className="pb-8">
      <PageHeader
        eyebrow="Who We Are"
        title={
          <>
            About <span className="gradient-text">dBug Labs</span>
          </>
        }
        description="dBug Labs is the official coding and innovation club of SRM University, dedicated to nurturing tech talent and fostering a culture of innovation among students. We bring together passionate developers, designers, and tech enthusiasts to learn, build, and grow together."
      />
    </Container>

    <Section>
      <FoundersPhoto />
    </Section>

    <Section glow="vertical">
      <History />
    </Section>

    <Section>
      <Mission />
    </Section>

    <Section glow="center">
      <SectionHeading
        eyebrow="What We Do"
        eyebrowTone="purple"
        title={
          <>
            How We <span className="gradient-text">Make Impact</span>
          </>
        }
        description="Through a combination of learning, building, and sharing, we create opportunities for every member to grow and excel."
        level={3}
        className="mb-12"
      />

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        {features.map((feature) => (
          <FeatureCard key={feature.title} {...feature} />
        ))}
      </div>
    </Section>

    <Section glow="top">
      <SectionHeading
        title={
          <>
            Our <span className="gradient-text">Domains</span>
          </>
        }
        description="Explore the diverse domains that make up dBug Labs"
        className="mb-12"
      />

      <DomainShowcase />
    </Section>

    <Section>
      <CtaBanner
        title="Interested in Joining Us?"
        description="Whether you're a beginner or an experienced developer, there's a place for you in dBug Labs. Get in touch with us to learn more about membership, events, and collaboration opportunities."
      />
    </Section>
  </main>
);

export default AboutPage;
