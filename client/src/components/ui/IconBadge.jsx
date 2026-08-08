import cx from '../../lib/cx';

const sizes = {
  sm: 'h-12 w-12 rounded-lg',
  md: 'h-14 w-14 rounded-xl',
  lg: 'h-16 w-16 rounded-xl',
  xl: 'h-20 w-20 rounded-full',
};

const iconSizes = {
  sm: 'h-6 w-6',
  md: 'h-7 w-7',
  lg: 'h-8 w-8',
  xl: 'h-10 w-10',
};

const tones = {
  /* Tinted wash — the icon carries the colour. */
  soft: 'bg-gradient-to-br from-purple-600/20 to-pink-500/20 text-purple-400',
  /* Full-strength gradient — the icon is knocked out in white. */
  solid: 'bg-gradient-to-br from-purple-600 to-pink-500 text-white',
};

/** The rounded gradient tile that sits above or beside a heading. */
const IconBadge = ({ icon: Icon, size = 'md', tone = 'soft', className }) => (
  <div
    className={cx(
      'flex shrink-0 items-center justify-center',
      sizes[size] ?? sizes.md,
      tones[tone] ?? tones.soft,
      className,
    )}
  >
    <Icon className={iconSizes[size] ?? iconSizes.md} />
  </div>
);

export default IconBadge;
