import { Link } from 'react-router-dom';
import { ArrowRight, UserPlus } from 'lucide-react';
import HeroScene from './HeroScene';
import { Container } from '../ui';

/**
 * The landing hero.
 *
 * The eyebrows, the wordmark and the two buttons flank the beam; only the
 * tagline spans the full width and reads straight through it.
 *
 * The `.hero-split` grid and the `.btn-cosmic` / `.btn-ghost` pills are
 * bespoke art direction defined in index.css — they deliberately sit outside
 * the shared <Button> / <Section> system.
 *
 * The ambient backdrop (nebula, clouds, stars) is mounted once in App and is
 * fixed behind every route; <HeroScene> adds the planet, beam and horizon on
 * top of it, here only.
 */
const Hero = () => (
  <section className="relative flex min-h-screen items-center justify-center overflow-hidden">
    <HeroScene />

    <Container className="relative z-10 pt-24 pb-44 md:pt-28 md:pb-52">
      <div className="hero-split">
        {/* Eyebrow */}
        <div className="hero-split__l hero-row-1">
          <span className="eyebrow">Debugging ideas</span>
        </div>
        <div className="hero-split__r hero-row-1">
          <span className="eyebrow">Building future</span>
        </div>

        {/* Wordmark — display:contents drops both halves straight into the grid */}
        <h1 className="contents">
          <span className="hero-split__l hero-row-2 font-display gradient-text--left text-5xl leading-[0.92] sm:text-7xl lg:text-[8.5rem]">
            dBug
          </span>
          <span className="hero-split__r hero-row-2 font-display gradient-text--right text-5xl leading-[0.92] sm:text-7xl lg:text-[8.5rem]">
            Labs
          </span>
        </h1>

        {/* Tagline — spans the full width, so it reads straight through the beam */}
        <div className="hero-span hero-tagline flex flex-col items-center gap-2.5">
          <span className="eyebrow">Engineering ideas into impact</span>
          <p className="hero-slogan text-2xl sm:text-3xl md:text-4xl">
            Build. Break. Become.
          </p>
        </div>

        {/* Calls to action */}
        <div className="hero-split__l hero-row-4">
          <Link to="/about" className="btn-cosmic">
            Discover Excellence
            <span className="btn-chip">
              <ArrowRight className="h-4 w-4" />
            </span>
          </Link>
        </div>
        <div className="hero-split__r hero-row-4">
          <a
            href="https://dbuglabsbnd.vercel.app/#top"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-ghost"
          >
            Join Us
            <span className="btn-chip">
              <UserPlus className="h-4 w-4" />
            </span>
          </a>
        </div>
      </div>
    </Container>

    {/* Scroll cue */}
    <div className="absolute bottom-7 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-3">
      <div className="flex h-9 w-[22px] justify-center rounded-full border border-purple-300/30 bg-black/30 pt-2 backdrop-blur-xs">
        <div className="h-2 w-1 animate-bounce rounded-full bg-gradient-to-b from-purple-300 to-pink-400" />
      </div>
      <span className="eyebrow text-[0.6rem] tracking-[0.28em] text-white/40">Scroll</span>
    </div>
  </section>
);

export default Hero;
