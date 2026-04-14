import { Link } from 'react-router-dom';
import { Instagram, Mail, Phone, Github, Linkedin, Twitter } from 'lucide-react';
import logo from '../../assets/logo.png';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/#about' },
    { name: 'Team', path: '/team' },
    { name: 'Projects', path: '/projects' },
    { name: 'Contact', path: '/contact' },
  ];

  const domains = [
    { name: 'Web Development', path: '/projects' },
    { name: 'AI/ML', path: '/projects' },
    { name: 'Events', path: '/#events' },
    { name: 'Sponsorship', path: '/contact' },
  ];

  const socialLinks = [
    { icon: Instagram, href: 'https://instagram.com/dBugLabs', label: 'Instagram' },
    { icon: Github, href: 'https://github.com/dBugLabs', label: 'GitHub' },
    { icon: Linkedin, href: 'https://linkedin.com/company/dBugLabs', label: 'LinkedIn' },
    { icon: Twitter, href: 'https://twitter.com/dBugLabs', label: 'Twitter' },
  ];

  return (
    <footer className="bg-black border-t border-purple-500/20">
      <div className="container mx-auto px-6 pb-16" style={{ paddingTop: '4rem' }}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <Link to="/" className="flex items-center gap-3 mb-4">
              <img
                src={logo}
                alt="dBug Labs Logo"
                className="w-10 h-10 object-contain"
              />
              <div>
                <span className="text-xl font-bold gradient-text">dBug Labs</span>
                <span className="text-xs text-gray-400 block -mt-1">SRM</span>
              </div>
            </Link>
            <p className="text-gray-400 text-sm mb-6">
              Discover, build, and innovate with dBug Labs. A space where ideas are tested,
              skills are refined, and future technologists grow.
            </p>
            <div className="flex gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-lg bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-gray-400 hover:text-white hover:bg-purple-500/20 hover:border-purple-500/40 transition-all"
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="text-gray-400 hover:text-pink-400 transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Domains */}
          <div>
            <h3 className="text-white font-semibold mb-4">Domains</h3>
            <ul className="space-y-3">
              {domains.map((domain) => (
                <li key={domain.name}>
                  <Link
                    to={domain.path}
                    className="text-gray-400 hover:text-pink-400 transition-colors text-sm"
                  >
                    {domain.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-white font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-4">
              <li>
                <a
                  href="mailto:dbuglabs@gmail.com"
                  className="flex items-center gap-3 text-gray-400 hover:text-pink-400 transition-colors text-sm"
                >
                  <Mail className="w-5 h-5 text-purple-500" />
                  dbuglabs@gmail.com
                </a>
              </li>
              <li>
                <a
                  href="tel:+919006061166"
                  className="flex items-center gap-3 text-gray-400 hover:text-pink-400 transition-colors text-sm"
                >
                  <Phone className="w-5 h-5 text-purple-500" />
                  +91 90060 61166
                </a>
              </li>
              <li className="flex items-start gap-3 text-gray-400 text-sm">
                <span className="w-5 h-5 flex-shrink-0 rounded-full bg-purple-500/20 flex items-center justify-center text-purple-500 text-xs">@</span>
                <span>SRM University,<br />Kattankulathur, Chennai</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-purple-500/20 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-500 text-sm">
            {currentYear} dBug Labs. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm">
            <Link to="/" className="text-gray-500 hover:text-pink-400 transition-colors">
              Privacy Policy
            </Link>
            <Link to="/" className="text-gray-500 hover:text-pink-400 transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
