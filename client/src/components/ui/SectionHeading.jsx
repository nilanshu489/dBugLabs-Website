import cx from '../../lib/cx';

const levels = {
  1: 'text-4xl md:text-5xl',
  2: 'text-4xl md:text-5xl',
  3: 'text-3xl md:text-4xl',
};

const eyebrowTones = {
  pink: 'text-pink-400',
  purple: 'text-purple-400',
};

/**
 * The eyebrow / title / description stack that opens almost every band on the
 * site. `title` takes JSX so callers can keep their <span className="gradient-text">
 * emphasis on whichever word they want.
 */
const SectionHeading = ({
  eyebrow,
  eyebrowTone = 'pink',
  title,
  description,
  as: Tag = 'h2',
  level = 2,
  align = 'center',
  className,
}) => (
  <div className={cx(align === 'center' ? 'text-center' : 'text-left', className)}>
    {eyebrow && (
      <span
        className={cx(
          'text-sm font-semibold uppercase tracking-wider',
          eyebrowTones[eyebrowTone] ?? eyebrowTones.pink,
        )}
      >
        {eyebrow}
      </span>
    )}
    <Tag className={cx('mt-2 mb-4 font-bold text-white', levels[level] ?? levels[2])}>{title}</Tag>
    {description && (
      <p className={cx('text-gray-400', align === 'center' && 'mx-auto max-w-2xl')}>{description}</p>
    )}
  </div>
);

export default SectionHeading;
