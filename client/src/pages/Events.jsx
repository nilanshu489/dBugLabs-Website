import EventJourney from '../components/events/EventJourney';
import EspionageRecap from '../components/events/EspionageRecap';
import EventGallery from '../components/events/EventGallery';
import { espionage } from '../data/events';
import { CtaBanner, Section, SectionHeading } from '../components/ui';

const EventsPage = () => (
  <main className="pt-24">
    <Section glow="top">
      <EventJourney />
    </Section>

    <Section width="wide">
      <SectionHeading
        eyebrow="Recent Event"
        title={<span className="text-red-500">{espionage.name}</span>}
        description="A thrilling coding contest inspired by the world of espionage and mystery"
        className="mb-12"
      />

      <EspionageRecap />
    </Section>

    <Section width="wide">
      <EventGallery />
    </Section>

    <Section width="content">
      <CtaBanner
        title="Get in Touch"
        description="Have questions about our events or want to collaborate? We'd love to hear from you. Reach out to us and let's create something amazing together!"
      />
    </Section>
  </main>
);

export default EventsPage;
