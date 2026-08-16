import { useParams, Link, Navigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight, CheckCircle, Sparkles, Code, Terminal, Layers } from 'lucide-react';
import { domainDetails } from '../data/domainDetails';
import { Container, Section, Card, Button } from '../components/ui';

const DomainDetail = () => {
  const { slug } = useParams();
  const domain = domainDetails[slug];

  if (!domain) {
    return <Navigate to="/about" replace />;
  }

  const IconComponent = domain.icon;

  return (
    <main className="pt-28 pb-20 overflow-hidden">
      {/* Hero Section */}
      <Section className="relative">
        <Container>
          {/* Back Button */}
          <Link
            to="/about"
            className="inline-flex items-center gap-2 mb-8 text-sm font-medium text-purple-300 hover:text-pink-400 transition-colors group"
          >
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
            Back to All Domains
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 space-y-6">
              {/* Category Eyebrow */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-purple-500/30 bg-purple-950/40 text-purple-300 text-xs font-semibold uppercase tracking-wider backdrop-blur-md">
                <Sparkles className="h-3.5 w-3.5 text-pink-400 animate-pulse" />
                {domain.category}
              </div>

              {/* Title */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-tight">
                About <span className="gradient-text">{domain.title}</span>
              </h1>

              {/* Tagline & Overview */}
              <p className="text-lg sm:text-xl text-purple-200/90 font-medium leading-relaxed">
                {domain.tagline}
              </p>

              <p className="text-base text-gray-300/80 leading-relaxed">
                {domain.overview}
              </p>

              {/* Action Buttons */}
              <div className="pt-4 flex flex-wrap gap-4 items-center">
                <a
                  href="https://dbuglabsbnd.vercel.app/#top"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button variant="primary" size="lg" className="shadow-lg shadow-purple-500/25">
                    Join {domain.title}
                    <ArrowRight className="h-5 w-5 ml-1" />
                  </Button>
                </a>
                <Link to="/projects">
                  <Button variant="secondary" size="lg">
                    Explore Domain Projects
                  </Button>
                </Link>
              </div>
            </div>

            {/* Hero Domain Graphic Frame */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="relative w-full max-w-sm aspect-square rounded-3xl p-1 bg-gradient-to-br from-purple-500/40 via-pink-500/30 to-indigo-500/40 shadow-[0_0_50px_rgba(168,85,247,0.35)]">
                <div className="relative h-full w-full rounded-[22px] overflow-hidden bg-gradient-to-br from-[#1b0d38] via-[#120726] to-[#0a0318] p-6 flex flex-col items-center justify-center text-center">
                  {/* Ambient Glows */}
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(217,70,239,0.3)_0%,rgba(147,51,234,0.1)_70%,transparent_100%)] pointer-events-none" />

                  {domain.image ? (
                    <div className="relative z-10 w-44 h-44 rounded-2xl overflow-hidden border-2 border-purple-400/60 shadow-[0_0_30px_rgba(217,70,239,0.4)] mb-4 bg-purple-950/60 flex items-center justify-center">
                      <img
                        src={domain.image}
                        alt={domain.title}
                        className="w-full h-full object-cover scale-[1.28] brightness-125 contrast-115 drop-shadow-lg"
                      />
                    </div>
                  ) : (
                    <div className="relative z-10 p-6 rounded-2xl bg-purple-900/40 border border-purple-400/50 mb-4">
                      <IconComponent className="h-20 w-20 text-pink-400" />
                    </div>
                  )}

                  <h3 className="relative z-10 text-2xl font-bold text-white mb-1">
                    {domain.title}
                  </h3>
                  <span className="relative z-10 text-xs font-mono text-purple-300/80 tracking-widest uppercase">
                    dBug Labs Domain
                  </span>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* Core Focus Areas / Pillars */}
      <Section glow="center" className="py-16">
        <Container>
          <div className="text-center max-w-3xl mx-auto mb-14">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Core <span className="gradient-text">Focus Areas</span>
            </h2>
            <p className="text-gray-300/80 text-base sm:text-lg">
              Explore the key technical and operational pillars that define our work in {domain.title}.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {domain.pillars.map((pillar, idx) => {
              const PillarIcon = pillar.icon;
              return (
                <Card
                  key={idx}
                  interactive
                  className="p-7 sm:p-8 border border-purple-500/20 bg-[#160f2a]/80 hover:border-purple-400/50 transition-all duration-300 group"
                >
                  <div className="flex flex-col sm:flex-row items-start gap-5">
                    {pillar.image ? (
                      <div className="shrink-0 relative w-20 h-20 sm:w-24 sm:h-24 rounded-2xl overflow-hidden border-2 border-purple-400/60 bg-gradient-to-br from-purple-900/80 via-indigo-950/70 to-purple-950/90 shadow-[0_0_20px_rgba(168,85,247,0.3)] ring-1 ring-purple-300/40 transition-transform duration-300 group-hover:scale-105">
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(217,70,239,0.35)_0%,rgba(147,51,234,0.15)_60%,transparent_100%)] pointer-events-none" />
                        <img
                          src={pillar.image}
                          alt={pillar.title}
                          className="relative z-10 w-full h-full object-cover scale-[1.28] brightness-125 contrast-115 saturate-110 drop-shadow-[0_4px_10px_rgba(0,0,0,0.5)] group-hover:scale-[1.38] transition-transform duration-500"
                        />
                      </div>
                    ) : (
                      <div className="shrink-0 p-3.5 rounded-2xl bg-gradient-to-br from-purple-600/30 to-pink-600/20 border border-purple-400/30 text-pink-400 shadow-md">
                        <PillarIcon className="h-7 w-7" />
                      </div>
                    )}
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-white mb-2 group-hover:text-purple-200 transition-colors">
                        {pillar.title}
                      </h3>
                      <p className="text-gray-300/80 text-sm sm:text-base leading-relaxed">
                        {pillar.description}
                      </p>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        </Container>
      </Section>

      {/* Tools & Tech Stack */}
      {domain.tools && domain.tools.length > 0 && (
        <Section className="py-12">
          <Container>
            <div className="p-8 sm:p-10 rounded-3xl border border-purple-500/30 bg-gradient-to-r from-purple-950/40 via-[#140b2b]/80 to-purple-950/40 backdrop-blur-xl">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
                <div>
                  <h3 className="text-2xl font-bold text-white mb-2 flex items-center gap-2">
                    <Terminal className="h-6 w-6 text-pink-400" />
                    Tools & Technologies
                  </h3>
                  <p className="text-purple-200/80 text-sm">
                    Industry-standard frameworks and software mastered in {domain.title}.
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap gap-3">
                {domain.tools.map((tool) => (
                  <span
                    key={tool}
                    className="px-4 py-2 rounded-xl text-sm font-semibold text-purple-200 bg-purple-900/40 border border-purple-400/30 hover:border-pink-400/60 hover:text-white transition-all shadow-sm"
                  >
                    {tool}
                  </span>
                ))}
              </div>
            </div>
          </Container>
        </Section>
      )}

      {/* Learning Outcomes & Flagship Projects */}
      <Section glow="vertical" className="py-16">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            {/* Learning Outcomes */}
            <Card className="p-8 sm:p-10 border border-purple-500/20 bg-[#140b2a]/90">
              <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                <CheckCircle className="h-6 w-6 text-emerald-400" />
                What You Will Gain & Build
              </h3>
              <ul className="space-y-4">
                {domain.outcomes.map((outcome, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-gray-200/90 text-sm sm:text-base leading-relaxed">
                    <span className="shrink-0 h-2 w-2 mt-2 rounded-full bg-pink-400 shadow-[0_0_8px_#ec4899]" />
                    <span>{outcome}</span>
                  </li>
                ))}
              </ul>
            </Card>

            {/* Domain Projects / Initiatives */}
            <Card className="p-8 sm:p-10 border border-purple-500/20 bg-[#140b2a]/90 flex flex-col justify-between">
              <div>
                <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                  <Layers className="h-6 w-6 text-purple-400" />
                  Domain Projects & Initiatives
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {domain.projects.map((proj, idx) => (
                    <div
                      key={idx}
                      className="p-4 rounded-2xl bg-purple-950/50 border border-purple-500/25 hover:border-purple-400/50 transition-colors"
                    >
                      <span className="text-xs font-mono text-purple-400 block mb-1">0{idx + 1}</span>
                      <h4 className="text-base font-semibold text-white">{proj}</h4>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-purple-500/20 flex items-center justify-between">
                <span className="text-sm text-purple-300/80">Interested in joining this team?</span>
                <a
                  href="https://dbuglabsbnd.vercel.app/#top"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button variant="ghost" size="sm">
                    Apply Now <ArrowRight className="h-4 w-4 ml-1" />
                  </Button>
                </a>
              </div>
            </Card>
          </div>
        </Container>
      </Section>

      {/* Bottom CTA Banner */}
      <Section className="pt-10">
        <Container>
          <div className="relative overflow-hidden rounded-3xl p-10 sm:p-14 bg-gradient-to-r from-purple-900/90 via-pink-900/80 to-purple-950/90 border border-purple-400/40 text-center shadow-2xl">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(236,72,153,0.25)_0%,transparent_70%)] pointer-events-none" />
            <div className="relative z-10 max-w-2xl mx-auto space-y-6">
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
                Ready to Join <span className="gradient-text">{domain.title}</span>?
              </h2>
              <p className="text-purple-100/90 text-base sm:text-lg">
                Become a core member of dBug Labs SRM. Collaborate on real-world tech initiatives, level up your skills, and build extraordinary projects together.
              </p>
              <div>
                <a
                  href="https://dbuglabsbnd.vercel.app/#top"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button variant="primary" size="lg" className="shadow-xl shadow-pink-500/30">
                    Apply for {domain.title}
                    <ArrowRight className="h-5 w-5 ml-1" />
                  </Button>
                </a>
              </div>
            </div>
          </div>
        </Container>
      </Section>
    </main>
  );
};

export default DomainDetail;
