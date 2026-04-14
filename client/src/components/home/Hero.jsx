import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Calendar, Users, Code2, Layers, Wrench, Trophy, Network, BookOpen, Lightbulb } from 'lucide-react';

const Hero = () => {
  const canvasRef = useRef(null);
  const [activeInitiative, setActiveInitiative] = useState(0);
  const [activeDomain, setActiveDomain] = useState('technical');

  const domains = {
    technical: {
      title: 'Technical',
      icon: Code2,
      description: 'Building innovative solutions through code',
      subdomains: [
        { name: 'Web Development', icon: Code2, description: 'Full-stack web applications and modern frameworks' },
        { name: 'AI/ML', icon: Layers, description: 'Machine learning models and AI-driven solutions' },
      ],
    },
    corporate: {
      title: 'Corporate',
      icon: Users,
      description: 'Managing operations and external relations',
      subdomains: [
        { name: 'Events', icon: Calendar, description: 'Organizing tech events, workshops, and hackathons' },
        { name: 'Sponsorship', icon: Network, description: 'Building partnerships with industry leaders' },
        { name: 'Public Relations', icon: Users, description: 'Managing community and public outreach' },
        { name: 'Creatives', icon: Lightbulb, description: 'Design, content, and creative strategy' },
      ],
    },
  };

  const initiatives = [
    {
      icon: Wrench,
      title: 'Skill Development',
      description: 'Master cutting-edge technologies through hands-on projects and guided learning paths. From web development to AI/ML, we cover it all.',
      details: 'Our structured learning programs are designed to take you from basics to advanced levels, ensuring you stay industry-ready.'
    },
    {
      icon: Trophy,
      title: 'Competitions',
      description: 'Participate in hackathons, coding contests, and tech challenges that push your boundaries and showcase your talent.',
      details: 'Our members regularly compete in national-level competitions and bring home prestigious awards and recognition.'
    },
    {
      icon: Network,
      title: 'Networking',
      description: 'Connect with like-minded peers, industry professionals, and alumni who share your passion for technology.',
      details: 'Build lasting relationships and expand your professional network through our events and collaborative projects.'
    },
    {
      icon: BookOpen,
      title: 'Workshops',
      description: 'Attend interactive workshops led by industry experts and senior members on the latest tech trends and tools.',
      details: 'From beginner-friendly sessions to advanced masterclasses, our workshops cater to all skill levels.'
    },
    {
      icon: Lightbulb,
      title: 'Mentorship',
      description: 'Get personalized guidance from experienced seniors and industry mentors who help you navigate your tech journey.',
      details: 'Our mentorship program pairs you with experts who provide one-on-one support and career guidance.'
    },
  ];

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles = [];
    const particleCount = 50;

    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2 + 1;
        this.speedX = Math.random() * 1 - 0.5;
        this.speedY = Math.random() * 1 - 0.5;
        this.color = Math.random() > 0.5 ? '#9333EA' : '#EC4899';
        this.opacity = Math.random() * 0.5 + 0.2;
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.x > canvas.width) this.x = 0;
        if (this.x < 0) this.x = canvas.width;
        if (this.y > canvas.height) this.y = 0;
        if (this.y < 0) this.y = canvas.height;
      }

      draw() {
        ctx.fillStyle = this.color;
        ctx.globalAlpha = this.opacity;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.globalAlpha = 1;
      }
    }

    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }

    let animationId;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((particle) => {
        particle.update();
        particle.draw();
      });

      // Draw connections
      particles.forEach((a, index) => {
        particles.slice(index + 1).forEach((b) => {
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 150) {
            ctx.strokeStyle = '#9333EA';
            ctx.globalAlpha = 0.1 * (1 - distance / 150);
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
            ctx.globalAlpha = 1;
          }
        });
      });

      animationId = requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <>
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black">
      {/* Animated Background Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 z-0"
      />

      {/* Gradient Orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl animate-pulse-slow" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-pink-600/20 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '2s' }} />

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 text-center pt-20 md:pt-28">
        {/* Main Title */}
        <h1 className="text-5xl md:text-7xl lg:text-8xl mb-4" style={{ fontFamily: "'Orbitron', sans-serif", letterSpacing: '0.05em', fontWeight: 800, marginTop: '-3rem' }}>
          <span className="gradient-text">dBug Labs</span>
        </h1>

      
        {/* Tagline */}
        <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto mb-4 italic" style={{ marginTop: '2rem' }}>
          &ldquo;Found a bug? you came to the right place to fix it.&rdquo;
        </p>
        <p className="text-base text-gray-500 mb-12">
          Debugging ideas. Building future.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link
            to="/about"
            className="group inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-500 text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-purple-500/30 transition-all hover:-translate-y-1"
          >
            Discover Excellence
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link
            to="/#events"
            className="group inline-flex items-center gap-2 px-8 py-4 bg-transparent border-2 border-purple-500 text-white font-semibold rounded-lg hover:bg-purple-500/10 hover:border-pink-500 transition-all"
          >
            <Calendar className="w-5 h-5" />
            View Events
          </Link>
        </div>

      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-purple-500/50 rounded-full flex justify-center pt-2">
          <div className="w-1.5 h-3 bg-gradient-to-b from-purple-500 to-pink-500 rounded-full" />
        </div>
      </div>
    </section>

    {/* Our Impact Section */}
    <section className="section bg-black relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-900/20 via-black to-black" />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <span className="text-pink-400 text-sm font-semibold tracking-wider uppercase">Making a Difference</span>
          <h2 className="text-4xl md:text-5xl font-bold mt-2 mb-4">
            Our <span className="gradient-text">Impact</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Building a thriving tech community at SRM University through innovation, collaboration, and continuous learning
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-5xl mx-auto">
          {[
            { value: '50+', label: 'Active Members', icon: Users },
            { value: '10+', label: 'Events Organized', icon: Calendar },
            { value: '5+', label: 'Core Domains', icon: Layers },
            { value: '20+', label: 'Projects Completed', icon: Code2 },
          ].map((stat, index) => (
            <div key={index} className="card p-8 text-center group hover:border-purple-500/50">
              <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-purple-600/20 to-pink-500/20 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                <stat.icon className="w-8 h-8 text-purple-400" />
              </div>
              <div className="text-4xl md:text-5xl font-bold gradient-text mb-2">{stat.value}</div>
              <div className="text-sm text-gray-400">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* Experience the Future of Tech Section */}
    <section className="section bg-black relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-black via-purple-950/10 to-black" />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-12">
          <span className="text-purple-400 text-sm font-semibold tracking-wider uppercase">Innovation Awaits</span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mt-2 mb-4">
            Experience the <span className="gradient-text">Future of Tech</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            Where creativity meets code, and ideas transform into reality
          </p>
        </div>

        <div className="relative max-w-5xl mx-auto">
          <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-pink-500 rounded-2xl blur opacity-30 animate-pulse" />
          
          <div className="relative rounded-2xl overflow-hidden border border-purple-500/20">
            <div className="relative h-[400px] md:h-[500px] lg:h-[600px] bg-gradient-to-br from-purple-900/40 via-black to-pink-900/40 flex items-center justify-center">
              <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiM5MzMzRUEiIGZpbGwtb3BhY2l0eT0iMC4xIj48Y2lyY2xlIGN4PSIzMCIgY3k9IjMwIiByPSIyIi8+PC9nPjwvZz48L3N2Zz4=')] opacity-50" />
              
              <div className="relative z-10 text-center">
                <div className="w-32 h-32 md:w-40 md:h-40 mx-auto mb-6 rounded-full bg-gradient-to-br from-purple-600 to-pink-500 flex items-center justify-center glow-purple">
                  <Code2 className="w-16 h-16 md:w-20 md:h-20 text-white" />
                </div>
                <p className="text-gray-300 text-lg md:text-xl max-w-xl mx-auto px-6">
                  Pushing boundaries through innovation and collaboration
                </p>
              </div>

              {/* Decorative Elements */}
              <div className="absolute top-10 left-10 w-20 h-20 border-2 border-purple-500/30 rounded-lg animate-pulse" />
              <div className="absolute bottom-10 right-10 w-24 h-24 border-2 border-pink-500/30 rounded-full animate-pulse" style={{ animationDelay: '1s' }} />
              <div className="absolute top-1/4 right-1/4 w-16 h-16 bg-purple-500/10 rounded-lg rotate-45" />
              <div className="absolute bottom-1/4 left-1/4 w-12 h-12 bg-pink-500/10 rounded-full" />
            </div>
          </div>
        </div>
      </div>
    </section>

    {/* Our Initiatives Section */}
    <section className="section bg-black relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-pink-900/20 via-black to-black" />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <span className="text-pink-400 text-sm font-semibold tracking-wider uppercase">What We Offer</span>
          <h2 className="text-4xl md:text-5xl font-bold mt-2 mb-4">
            Our <span className="gradient-text">Initiatives</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Empowering students through comprehensive programs and opportunities
          </p>
        </div>

        {/* Initiative Cards Slider */}
        <div className="relative max-w-6xl mx-auto">
          {/* Navigation Dots */}
          <div className="flex justify-center gap-3 mb-8">
            {initiatives.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveInitiative(index)}
                className={`w-3 h-3 rounded-full transition-all ${
                  activeInitiative === index
                    ? 'bg-gradient-to-r from-purple-600 to-pink-500 w-8'
                    : 'bg-gray-600 hover:bg-gray-500'
                }`}
              />
            ))}
          </div>

          {/* Active Initiative Card */}
          <div className="card p-8 md:p-12 mb-8">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-purple-600 to-pink-500 flex items-center justify-center mb-6">
                  {initiatives[activeInitiative].icon && React.createElement(initiatives[activeInitiative].icon, { className: "w-8 h-8 text-white" })}
                </div>
                <h3 className="text-3xl font-bold text-white mb-4">
                  {initiatives[activeInitiative].title}
                </h3>
                <p className="text-gray-300 text-lg mb-4">
                  {initiatives[activeInitiative].description}
                </p>
                <p className="text-gray-400">
                  {initiatives[activeInitiative].details}
                </p>
              </div>
              <div className="hidden md:flex items-center justify-center">
                <div className="w-64 h-64 rounded-2xl bg-gradient-to-br from-purple-900/30 to-pink-900/30 border border-purple-500/20 flex items-center justify-center">
                  {initiatives[activeInitiative].icon && (
                    React.createElement(initiatives[activeInitiative].icon, { className: "w-24 h-24 text-purple-400/50" })
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Initiative Thumbnails */}
          <div className="grid grid-cols-3 md:grid-cols-5 gap-4">
            {initiatives.map((initiative, index) => (
              <button
                key={index}
                onClick={() => setActiveInitiative(index)}
                className={`card p-4 text-center transition-all hover:border-purple-500/50 ${
                  activeInitiative === index
                    ? 'border-purple-500 bg-purple-500/10'
                    : 'border-gray-700'
                }`}
              >
                {initiative.icon && React.createElement(initiative.icon, { className: "w-6 h-6 text-purple-400 mx-auto mb-2" })}
                <p className="text-xs text-gray-300 hidden md:block">{initiative.title}</p>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>

    {/* Our Core Domains Section */}
    <section className="section bg-black relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-900/20 via-black to-black" />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <span className="text-purple-400 text-sm font-semibold tracking-wider uppercase">Expertise Areas</span>
          <h2 className="text-4xl md:text-5xl font-bold mt-2 mb-4">
            Our Core <span className="gradient-text">Domains</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Explore the diverse areas where we innovate and excel
          </p>
        </div>

        {/* Domain Tabs */}
        <div className="flex justify-center gap-4 mb-12">
          {Object.entries(domains).map(([key, domain]) => (
            <button
              key={key}
              onClick={() => setActiveDomain(key)}
              className={`flex items-center gap-3 px-8 py-4 rounded-full font-semibold transition-all ${
                activeDomain === key
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
                  {subdomain.icon && React.createElement(subdomain.icon, { className: "w-7 h-7 text-white" })}
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-white mb-2 flex items-center gap-2">
                    {subdomain.name}
                    <ArrowRight className="w-5 h-5 text-purple-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </h3>
                  <p className="text-gray-400 text-sm">{subdomain.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
    </>
  );
};

export default Hero;
