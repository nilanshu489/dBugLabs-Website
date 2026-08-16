import techImg from '../../assets/tech.png';
import { Section, SectionHeading } from '../ui';

/** Decorative "Experience the Future of Tech" panel featuring tech.png. */
const Showcase = () => (
  <Section glow="vertical">
    <SectionHeading
      eyebrow="Innovation Awaits"
      eyebrowTone="purple"
      title={
        <>
          Experience the <span className="gradient-text">Future of Tech</span>
        </>
      }
      description="Where creativity meets code, and ideas transform into reality"
      className="mb-12"
    />

    <div className="relative mx-auto max-w-5xl">
      {/* Outer ambient glow matching the image lighting */}
      <div
        className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-purple-600/40 via-pink-500/30 to-purple-600/40 opacity-75 blur-xl transition-opacity duration-500 hover:opacity-100"
        aria-hidden="true"
      />

      {/* Edge-to-edge image container */}
      <div className="relative overflow-hidden rounded-2xl border border-purple-500/30 bg-[#0d0716] shadow-[0_0_50px_rgba(168,85,247,0.25)]">
        <img
          src={techImg}
          alt="Experience the Future of Tech - dBug Labs"
          className="block h-auto w-full object-cover transition-transform duration-700 hover:scale-[1.01]"
        />
      </div>
    </div>
  </Section>
);

export default Showcase;
