import cx from '../../lib/cx';
import Container from './Container';

/**
 * Accent washes. All stops are translucent — the section has no ground of its
 * own, so anything opaque here would blank out the fixed <CosmicBackground>
 * behind it. These tint it, they don't replace it.
 */
const glows = {
  none: null,
  center:
    'bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-900/25 via-transparent to-transparent',
  top: 'bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-pink-900/25 via-transparent to-transparent',
  vertical: 'bg-gradient-to-b from-transparent via-purple-950/25 to-transparent',
};

/**
 * A full-width band of page: an optional decorative wash over the cosmic
 * backdrop, and a Container for the content. Replaces the `.section` CSS
 * class, whose flat 80px block padding was the same on a phone as a desktop.
 */
const Section = ({
  glow = 'none',
  /**
   * Ramps the top of the section from the hero's near-black surface into the
   * cloud backdrop. Without it the hero, which ends dark, butts straight up
   * against bright nebula and leaves a hard horizontal seam.
   */
  fadeTop = false,
  width,
  className,
  containerClassName,
  children,
  ...props
}) => (
  <section
    className={cx('relative overflow-hidden py-16 sm:py-20 lg:py-24', className)}
    {...props}
  >
    {glows[glow] && <div className={cx('absolute inset-0', glows[glow])} aria-hidden="true" />}
    {fadeTop && <div className="section-fade-top" aria-hidden="true" />}
    <Container width={width} className={cx('relative z-10', containerClassName)}>
      {children}
    </Container>
  </section>
);

export default Section;
