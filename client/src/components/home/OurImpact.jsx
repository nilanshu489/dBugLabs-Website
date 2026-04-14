import { Users, Calendar, Code2, Layers } from 'lucide-react';

const OurImpact = () => {
  const stats = [
    { 
      value: '50+', 
      label: 'Active Members',
      icon: Users 
    },
    { 
      value: '10+', 
      label: 'Events Organized',
      icon: Calendar 
    },
    { 
      value: '5+', 
      label: 'Core Domains',
      icon: Layers 
    },
    { 
      value: '20+', 
      label: 'Projects Completed',
      icon: Code2 
    },
  ];

  return (
    <section className="section bg-black relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-900/20 via-black to-black" />
      
      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="text-pink-400 text-sm font-semibold tracking-wider uppercase">Making a Difference</span>
          <h2 className="text-4xl md:text-5xl font-bold mt-2 mb-4">
            Our <span className="gradient-text">Impact</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Building a thriving tech community at SRM University through innovation, collaboration, and continuous learning
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-5xl mx-auto">
          {stats.map((stat, index) => (
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
  );
};

export default OurImpact;
