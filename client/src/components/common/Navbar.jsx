import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import logo from '../../assets/logo.png';
import { navLinks } from '../../data/navigation';
import { site } from '../../data/site';
import { Button, Container } from '../ui';
import cx from '../../lib/cx';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isActive = (path) => location.pathname === path;

  // Navigating with the mobile menu open would otherwise leave it covering the
  // new page, so every item in it closes the menu on the way out.
  const closeMenu = () => setIsOpen(false);

  return (
    <nav
      className={cx(
        'fixed inset-x-0 top-0 z-50 transition-all duration-300',
        scrolled ? 'border-b border-purple-500/20 bg-black/90 backdrop-blur-md' : 'bg-transparent',
      )}
    >
      {/* Same Container as every page, so the logo lines up with page content. */}
      <Container className="py-4">
        <div className="flex items-center justify-between gap-4">
          <Link to="/" className="group flex items-center gap-2">
            <img
              src={logo}
              alt={`${site.name} logo`}
              className="h-14 w-14 object-contain transition-transform group-hover:scale-110 md:h-16 md:w-16"
            />
            <span className="hidden sm:block">
              <span className="gradient-text font-display text-lg md:text-xl">{site.name}</span>
              <span className="eyebrow mt-1 block text-[0.6rem] text-gray-400">{site.campus}</span>
            </span>
          </Link>

          <div className="hidden items-center gap-8 md:flex">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                aria-current={isActive(link.path) ? 'page' : undefined}
                className={cx(
                  'nav-link text-sm font-medium',
                  isActive(link.path) ? 'text-pink-400' : 'text-gray-300 hover:text-white',
                )}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Wrapper, not `hidden` on the Button itself: Button bakes
              `inline-flex` into its base classes and Tailwind emits
              `.inline-flex` after `.hidden`, so it would always win. */}
          <div className="hidden md:block">
            <Button to="/contact" size="sm">
              Contact Us
            </Button>
          </div>

          <button
            type="button"
            className="p-2 text-white md:hidden"
            aria-label={isOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isOpen}
            onClick={() => setIsOpen((open) => !open)}
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {isOpen && (
          <div className="mt-4 rounded-lg border-t border-purple-500/20 bg-black/95 pt-4 pb-4 backdrop-blur-md md:hidden">
            <div className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  onClick={closeMenu}
                  aria-current={isActive(link.path) ? 'page' : undefined}
                  className={cx(
                    'rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-white/10',
                    isActive(link.path) ? 'text-pink-400' : 'text-gray-300 hover:text-white',
                  )}
                >
                  {link.name}
                </Link>
              ))}
              <Button to="/contact" size="sm" fullWidth className="mt-2" onClick={closeMenu}>
                Contact Us
              </Button>
            </div>
          </div>
        )}
      </Container>
    </nav>
  );
};

export default Navbar;
