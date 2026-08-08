import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin } from 'lucide-react';
import logo from '../../assets/logo.png';
import { site, socialLinks } from '../../data/site';
import { footerSections, legalLinks } from '../../data/navigation';
import { Container } from '../ui';

// Translucent rather than black: it sits over the fixed cosmic backdrop.
const Footer = () => (
  <footer className="relative border-t border-purple-500/20 bg-[#050109]/70 backdrop-blur-md">
    <Container className="pt-16 pb-16">
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
        {/* Brand */}
        <div>
          <Link to="/" className="mb-4 flex items-center gap-3">
            <img src={logo} alt={`${site.name} logo`} className="h-10 w-10 object-contain" />
            <span>
              <span className="gradient-text text-xl font-bold">{site.name}</span>
              <span className="-mt-1 block text-xs text-gray-400">{site.campus}</span>
            </span>
          </Link>
          <p className="mb-6 text-sm text-gray-400">{site.tagline}</p>
          <div className="flex gap-4">
            {socialLinks.map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="flex h-10 w-10 items-center justify-center rounded-lg border border-purple-500/20 bg-purple-500/10 text-gray-400 transition-all hover:border-purple-500/40 hover:bg-purple-500/20 hover:text-white"
              >
                <Icon className="h-5 w-5" />
              </a>
            ))}
          </div>
        </div>

        {/* Link columns */}
        {footerSections.map((section) => (
          <nav key={section.title} aria-label={section.title}>
            <h2 className="mb-4 font-semibold text-white">{section.title}</h2>
            <ul className="space-y-3">
              {section.links.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="text-sm text-gray-400 transition-colors hover:text-pink-400"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        ))}

        {/* Contact */}
        <div>
          <h2 className="mb-4 font-semibold text-white">Contact Us</h2>
          <ul className="space-y-4">
            <li>
              <a
                href={`mailto:${site.email}`}
                className="flex items-center gap-3 text-sm text-gray-400 transition-colors hover:text-pink-400"
              >
                <Mail className="h-5 w-5 shrink-0 text-purple-500" />
                {site.email}
              </a>
            </li>
            <li>
              <a
                href={site.phoneHref}
                className="flex items-center gap-3 text-sm text-gray-400 transition-colors hover:text-pink-400"
              >
                <Phone className="h-5 w-5 shrink-0 text-purple-500" />
                {site.phone}
              </a>
            </li>
            <li className="flex items-start gap-3 text-sm text-gray-400">
              <MapPin className="h-5 w-5 shrink-0 text-purple-500" />
              <span className="whitespace-pre-line">{site.address}</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-purple-500/20 pt-8 md:flex-row">
        <p className="text-sm text-gray-500">
          © {new Date().getFullYear()} {site.name}. All rights reserved.
        </p>
        <div className="flex gap-6 text-sm">
          {legalLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className="text-gray-500 transition-colors hover:text-pink-400"
            >
              {link.name}
            </Link>
          ))}
        </div>
      </div>
    </Container>
  </footer>
);

export default Footer;
