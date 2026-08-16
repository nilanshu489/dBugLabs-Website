import { Link } from 'react-router-dom';
import cx from '../../lib/cx';
import Card from './Card';
import IconBadge from './IconBadge';

/**
 * Icon + title + copy. `layout="stacked"` puts the icon above the text,
 * `layout="inline"` puts it alongside. Pass `to` to make the entire card a link.
 */
const FeatureCard = ({
  icon,
  image,
  title,
  description,
  layout = 'stacked',
  imageSize = 'lg',
  action,
  to,
  className,
}) => {
  const imageSizeClasses = {
    sm: 'h-14 w-14',
    md: 'h-20 w-20',
    lg: 'h-24 w-24 sm:h-28 sm:w-28',
  }[imageSize] || 'h-24 w-24 sm:h-28 sm:w-28';

  return (
    <Card
      as={to ? Link : 'div'}
      to={to}
      interactive
      className={cx('group block h-full p-7 sm:p-8 transition-all duration-300', className)}
    >
      <div className={cx(layout === 'inline' ? 'flex flex-col sm:flex-row sm:items-center gap-5 sm:gap-7' : 'flex flex-col')}>
        {image ? (
          <div
            className={cx(
              'relative shrink-0 overflow-hidden rounded-2xl border-2 border-purple-400/60 bg-gradient-to-br from-purple-900/80 via-indigo-950/70 to-purple-950/90 shadow-[0_0_20px_rgba(168,85,247,0.3)] ring-1 ring-purple-300/40 transition-all duration-300 group-hover:scale-105 group-hover:border-pink-400 group-hover:ring-pink-400/60 group-hover:shadow-[0_0_30px_rgba(236,72,153,0.45)]',
              imageSizeClasses,
              layout === 'stacked' && 'mb-5',
            )}
          >
            {/* Radiant background glow behind dark images */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(217,70,239,0.35)_0%,rgba(147,51,234,0.15)_60%,transparent_100%)] pointer-events-none" />
            <div className="absolute inset-0 bg-gradient-to-tr from-purple-500/25 via-pink-500/15 to-transparent pointer-events-none" />

            <img
              src={image}
              alt={title}
              className="relative z-10 h-full w-full object-cover scale-[1.28] transition-all duration-500 brightness-125 contrast-115 saturate-110 drop-shadow-[0_4px_12px_rgba(0,0,0,0.5)] group-hover:scale-[1.38] group-hover:brightness-140"
            />
          </div>
        ) : (
          <IconBadge
            icon={icon}
            size={layout === 'inline' ? 'lg' : 'md'}
            tone={layout === 'inline' ? 'solid' : 'soft'}
            className={cx('transition-transform duration-300 group-hover:scale-110', layout === 'stacked' && 'mb-5')}
          />
        )}
        <div className={cx(layout === 'inline' && 'flex-1')}>
          <h3 className="mb-2 flex items-center justify-between text-xl sm:text-2xl font-bold text-white tracking-wide group-hover:text-purple-200 transition-colors">
            <span>{title}</span>
            {action}
          </h3>
          <p className="text-sm sm:text-base text-gray-300/90 leading-relaxed">{description}</p>
        </div>
      </div>
    </Card>
  );
};

export default FeatureCard;
