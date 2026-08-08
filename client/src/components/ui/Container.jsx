import cx from '../../lib/cx';

const widths = {
  narrow: 'max-w-3xl',
  content: 'max-w-5xl',
  wide: 'max-w-6xl',
  default: 'max-w-7xl',
};

/**
 * The one horizontal rhythm every page, the navbar and the footer share.
 *
 * This replaces a hand-written `.container` rule that used to live unlayered
 * in index.css. Because unlayered CSS outranks every Tailwind layer, that rule
 * beat any `px-*` utility set alongside it — so `container mx-auto px-4` and
 * `container mx-auto px-6` both silently rendered at 24px, and the navbar
 * (which used `mx-4 md:mx-8` instead) never lined up with page content at all.
 */
const Container = ({ as: Tag = 'div', width = 'default', className, children, ...props }) => (
  <Tag
    className={cx('mx-auto w-full px-5 sm:px-6 lg:px-8', widths[width] ?? widths.default, className)}
    {...props}
  >
    {children}
  </Tag>
);

export default Container;
