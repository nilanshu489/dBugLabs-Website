import { Link } from 'react-router-dom';
import cx from '../../lib/cx';

const base =
  'inline-flex items-center justify-center gap-2 rounded-lg font-semibold transition-all duration-300 ' +
  'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-pink-400 ' +
  'disabled:cursor-not-allowed disabled:opacity-50';

const variants = {
  primary:
    'bg-gradient-to-r from-purple-600 to-pink-500 text-white hover:-translate-y-0.5 hover:shadow-lg hover:shadow-purple-500/30',
  secondary:
    'border-2 border-purple-500 bg-transparent text-white hover:border-pink-500 hover:bg-purple-500/10',
  outline:
    'border border-purple-500/30 bg-transparent text-gray-300 hover:border-purple-500 hover:text-white',
  ghost: 'bg-transparent text-gray-300 hover:bg-purple-500/10 hover:text-white',
};

const sizes = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-6 py-3 text-base',
  lg: 'px-8 py-4 text-lg',
};

/**
 * Renders as a router <Link>, an <a> or a <button> depending on which of
 * `to` / `href` you pass. Replaces the `.btn-primary` / `.btn-secondary` CSS
 * classes and the half-dozen hand-rolled gradient CTAs that had drifted apart.
 *
 * The hero keeps its own `.btn-cosmic` / `.btn-ghost` treatment — that one is
 * a bespoke piece of art direction, not a reusable control.
 */
const Button = ({
  children,
  to,
  href,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  className,
  icon: Icon,
  iconPosition = 'left',
  ...props
}) => {
  const classes = cx(
    base,
    variants[variant] ?? variants.primary,
    sizes[size] ?? sizes.md,
    fullWidth && 'w-full',
    className,
  );

  const content = (
    <>
      {Icon && iconPosition === 'left' && <Icon className="h-5 w-5" />}
      {children}
      {Icon && iconPosition === 'right' && <Icon className="h-5 w-5" />}
    </>
  );

  if (to) {
    return (
      <Link to={to} className={classes} {...props}>
        {content}
      </Link>
    );
  }

  if (href) {
    return (
      <a href={href} className={classes} {...props}>
        {content}
      </a>
    );
  }

  return (
    <button className={classes} {...props}>
      {content}
    </button>
  );
};

export default Button;
