import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Code2, Users, Lightbulb, Rocket, Target, Zap, ChevronRight, Calendar, Award, BookOpen, Mail, ArrowRight } from 'lucide-react';

const About = () => {
  const [activeDomain, setActiveDomain] = useState('technical');

  const domains = {
    technical: {
      title: 'Technical',
      icon: Code2,
      description: 'Building innovative solutions through code',
      subdomains: [
        { name: 'Web Development', icon: Code2, description: 'Full-stack web applications and modern frameworks' },
        { name: 'AI/ML', icon: Zap, description: 'Machine learning models and AI-driven solutions' },
      ],
    },
    corporate: {
      title: 'Corporate',
      icon: Users,
      description: 'Managing operations and external relations',
      subdomains: [
        { name: 'Events', icon: Target, description: 'Organizing tech events, workshops, and hackathons' },
        { name: 'Sponsorship', icon: Rocket, description: 'Building partnerships with industry leaders' },
        { name: 'Public Relations', icon: Users, description: 'Managing community and public outreach' },
        { name: 'Creatives', icon: Lightbulb, description: 'Design, content, and creative strategy' },
      ],
    },
  };

  const features = [
    {
      icon: Calendar,
      title: 'Events & Workshops',
      description: 'Regular tech events, hackathons, and hands-on workshops throughout the year.',
    },
    {
      icon: Users,
      title: 'Community Building',
      description: 'Building a strong network of tech enthusiasts and industry professionals.',
    },
    {
      icon: BookOpen,
      title: 'Learning Resources',
      description: 'Access to curated learning materials, mentorship, and peer-to-peer learning.',
    },
    {
      icon: Award,
      title: 'Achievements',
      description: 'Recognition for outstanding contributions and competition victories.',
    },
  ];

  return (
    <section id="about" className="section bg-black relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-purple-900/10 to-transparent" />

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="text-pink-400 text-sm font-semibold tracking-wider uppercase">Who We Are</span>
          <h2 className="text-4xl md:text-5xl font-bold mt-2 mb-4">
            About <span className="gradient-text">dBug Labs</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            dBug Labs is the official coding and innovation club of SRM University,
            dedicated to nurturing tech talent and fostering a culture of innovation
            among students. We bring together passionate developers, designers, and
            tech enthusiasts to learn, build, and grow together.
          </p>
        </div>

        {/* Founders Photo */}
        <div className="mb-20">
          <div className="relative max-w-4xl mx-auto">
            {/* Glow effect behind the image */}
            <div className="absolute -inset-1 bg-gradient-to-r from-purple-600/30 to-pink-500/30 rounded-2xl blur-lg" />

            <div className="relative rounded-2xl overflow-hidden border border-purple-500/20 bg-black/50">
              {/* Replace the src below with the actual founder photo */}
              <img
                src="/founders.jpeg"
                alt="dBug Labs Founders"
                className="w-full h-auto object-cover"
                style={{ minHeight: '400px', maxHeight: '550px', objectFit: 'cover' }}
                onError={(e) => {
                  // Show placeholder if image not found
                  e.target.style.display = 'none';
                  e.target.nextElementSibling.style.display = 'flex';
                }}
              />
              {/* Placeholder shown when image is not available */}
              <div
                className="flex-col items-center justify-center text-center p-12"
                style={{ display: 'none', minHeight: '400px' }}
              >
                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-purple-600/30 to-pink-500/30 flex items-center justify-center mx-auto mb-6">
                  <Users className="w-12 h-12 text-purple-400" />
                </div>
                <p className="text-gray-400 text-lg">Add your founders photo here</p>
                <p className="text-gray-500 text-sm mt-2">Place the image at <code className="text-purple-400">/public/founders.jpg</code></p>
              </div>
            </div>

            {/* Caption */}
            <p className="text-center text-gray-500 text-sm mt-4 italic">
              The founding members of dBug Labs
            </p>
          </div>
        </div>

        {/* Our History */}
        <div className="mb-20">
          <div className="card p-8 md:p-12">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <span className="text-purple-400 text-sm font-semibold tracking-wider uppercase">Our Journey</span>
                <h3 className="text-3xl md:text-4xl font-bold mt-2 mb-4">
                  Our <span className="gradient-text">History</span>
                </h3>
                <p className="text-gray-400 mb-4">
                  Founded in 2023, dBug Labs started as a small group of coding enthusiasts
                  who wanted to create a collaborative learning environment at SRM. What began
                  as weekly coding sessions has grown into a thriving community of 30+ active
                  members working on cutting-edge projects.
                </p>
                <p className="text-gray-400">
                  Over the years, we've organized numerous hackathons, tech workshops, and
                  industry collaborations, establishing ourselves as one of the most active
                  tech communities on campus.
                </p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="card p-6 text-center">
                  <div className="text-4xl font-bold gradient-text mb-2">2023</div>
                  <div className="text-sm text-gray-400">Year Founded</div>
                </div>
                <div className="card p-6 text-center">
                  <div className="text-4xl font-bold gradient-text mb-2">30+</div>
                  <div className="text-sm text-gray-400">Active Members</div>
                </div>
                <div className="card p-6 text-center">
                  <div className="text-4xl font-bold gradient-text mb-2">20+</div>
                  <div className="text-sm text-gray-400">Projects Completed</div>
                </div>
                <div className="card p-6 text-center">
                  <div className="text-4xl font-bold gradient-text mb-2">15+</div>
                  <div className="text-sm text-gray-400">Events Organized</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Our Mission */}
        <div className="mb-20">
          <div className="relative rounded-2xl overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-900/50 to-pink-900/50" />
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiM5MzMzRUEiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iMiIvPjwvZz48L2c+PC9zdmc+')] opacity-50" />
            <div className="relative p-8 md:p-12">
              <div className="text-center mb-8">
                <span className="text-pink-400 text-sm font-semibold tracking-wider uppercase">What Drives Us</span>
                <h3 className="text-3xl md:text-4xl font-bold mt-2 mb-4">
                  Our <span className="gradient-text">Mission</span>
                </h3>
              </div>
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h4 className="text-xl font-semibold text-white mb-3 flex items-center gap-2">
                    <Target className="w-5 h-5 text-purple-400" />
                    Our Vision
                  </h4>
                  <p className="text-gray-300">
                    To be the leading student tech community that bridges the gap between
                    academic learning and industry requirements, producing job-ready graduates
                    who can make immediate impact in the tech world.
                  </p>
                </div>
                <div>
                  <h4 className="text-xl font-semibold text-white mb-3 flex items-center gap-2">
                    <Rocket className="w-5 h-5 text-pink-400" />
                    Our Purpose
                  </h4>
                  <p className="text-gray-300">
                    To create a vibrant ecosystem where students can explore technology,
                    develop their skills through hands-on projects, collaborate with peers,
                    and build innovative solutions that address real-world problems.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* What We Do */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <span className="text-purple-400 text-sm font-semibold tracking-wider uppercase">What We Do</span>
            <h3 className="text-3xl md:text-4xl font-bold mt-2 mb-4">
              How We <span className="gradient-text">Make Impact</span>
            </h3>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Through a combination of learning, building, and sharing, we create
              opportunities for every member to grow and excel.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <div
                key={index}
                className="card p-6 group hover:border-purple-500/50"
              >
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-purple-600/20 to-pink-500/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <feature.icon className="w-6 h-6 text-purple-400" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">{feature.title}</h3>
                <p className="text-gray-400 text-sm">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Our Domains Section */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Our <span className="gradient-text">Domains</span>
            </h2>
            <p className="text-gray-400 max-w-xl mx-auto">
              Explore the diverse domains that make up dBug Labs
            </p>
          </div>

          {/* Domain Tabs */}
          <div className="flex justify-center gap-4 mb-12">
            {Object.entries(domains).map(([key, domain]) => (
              <button
                key={key}
                onClick={() => setActiveDomain(key)}
                className={`flex items-center gap-3 px-8 py-4 rounded-full font-semibold transition-all ${activeDomain === key
                    ? 'bg-gradient-to-r from-purple-600 to-pink-500 text-white shadow-lg shadow-purple-500/30'
                    : 'bg-purple-500/10 text-gray-300 border border-purple-500/20 hover:border-purple-500/50'
                  }`}
              >
                <domain.icon className="w-5 h-5" />
                {domain.title}
              </button>
            ))}
          </div>

          {/* Domain Content */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {domains[activeDomain].subdomains.map((subdomain, index) => (
              <div
                key={index}
                className="card p-6 group cursor-pointer"
              >
                <div className="flex items-start gap-4">
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-purple-600 to-pink-500 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                    <subdomain.icon className="w-7 h-7 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-white mb-2 flex items-center gap-2">
                      {subdomain.name}
                      <ChevronRight className="w-5 h-5 text-purple-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </h3>
                    <p className="text-gray-400 text-sm">{subdomain.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Contact Us CTA */}
        <div className="mb-16">
          <div className="relative rounded-2xl overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-pink-600/20" />
            <div className="relative p-8 md:p-12 text-center">
              <Mail className="w-12 h-12 text-purple-400 mx-auto mb-4" />
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
                Interested in Joining Us?
              </h3>
              <p className="text-gray-300 text-lg max-w-2xl mx-auto mb-6">
                Whether you're a beginner or an experienced developer, there's a place for you in dBug Labs.
                Get in touch with us to learn more about membership, events, and collaboration opportunities.
              </p>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-500 text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-purple-500/30 transition-all hover:-translate-y-1"
              >
                Contact Us
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
