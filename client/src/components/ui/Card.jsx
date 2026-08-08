import cx from '../../lib/cx';

/**
 * The glass panel used across the site.
 *
 * `interactive` adds the lift-and-glow hover; leave it off for cards that are
 * pure containers, which previously still lifted on hover because the `.card`
 * CSS class bundled the two together.
 */
const Card = ({ as: Tag = 'div', interactive = false, className, children, ...props }) => (
  <Tag
    className={cx(
      // `card-glow` draws the hairline gradient ring and the bloom; see index.css.
      'card-glow rounded-2xl border border-purple-500/15 bg-[#160f28]/70 backdrop-blur-md transition-all duration-300',
      interactive && 'hover:-translate-y-1 hover:border-purple-500/40',
      className,
    )}
    {...props}
  >
    {children}
  </Tag>
);

export default Card;
