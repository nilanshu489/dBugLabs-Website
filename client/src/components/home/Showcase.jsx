import { Code2 } from 'lucide-react';
import { Section, SectionHeading } from '../ui';

/** Decorative "Experience the Future of Tech" panel. */
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
      <div
        className="absolute -inset-1 animate-pulse rounded-2xl bg-gradient-to-r from-purple-600 to-pink-500 opacity-30 blur-sm"
        aria-hidden="true"
      />

      <div className="relative overflow-hidden rounded-2xl border border-purple-500/20">
        <div className="relative flex h-[400px] items-center justify-center bg-gradient-to-br from-purple-900/40 via-black to-pink-900/40 md:h-[500px] lg:h-[600px]">
          <div className="absolute inset-0 bg-[radial-gradient(circle,rgba(147,51,234,0.12)_2px,transparent_2px)] [background-size:60px_60px]" />

          <div className="relative z-10 px-6 text-center">
            <div className="glow-purple mx-auto mb-6 flex h-32 w-32 items-center justify-center rounded-full bg-gradient-to-br from-purple-600 to-pink-500 md:h-40 md:w-40">
              <Code2 className="h-16 w-16 text-white md:h-20 md:w-20" />
            </div>
            <p className="mx-auto max-w-xl text-lg text-gray-300 md:text-xl">
              Pushing boundaries through innovation and collaboration
            </p>
          </div>

          {/* Decorative shapes */}
          <div className="absolute left-10 top-10 h-20 w-20 animate-pulse rounded-lg border-2 border-purple-500/30" />
          <div
            className="absolute bottom-10 right-10 h-24 w-24 animate-pulse rounded-full border-2 border-pink-500/30"
            style={{ animationDelay: '1s' }}
          />
          <div className="absolute right-1/4 top-1/4 h-16 w-16 rotate-45 rounded-lg bg-purple-500/10" />
          <div className="absolute bottom-1/4 left-1/4 h-12 w-12 rounded-full bg-pink-500/10" />
        </div>
      </div>
    </div>
  </Section>
);

export default Showcase;
