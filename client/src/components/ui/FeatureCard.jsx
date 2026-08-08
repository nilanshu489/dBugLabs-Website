import cx from '../../lib/cx';
import Card from './Card';
import IconBadge from './IconBadge';

/**
 * Icon + title + copy. `layout="stacked"` puts the icon above the text,
 * `layout="inline"` puts it alongside.
 */
const FeatureCard = ({
  icon,
  title,
  description,
  layout = 'stacked',
  action,
  className,
}) => (
  <Card interactive className={cx('group h-full p-6', className)}>
    <div className={cx(layout === 'inline' && 'flex items-start gap-4')}>
      <IconBadge
        icon={icon}
        size={layout === 'inline' ? 'md' : 'sm'}
        tone={layout === 'inline' ? 'solid' : 'soft'}
        className={cx('transition-transform group-hover:scale-110', layout === 'stacked' && 'mb-4')}
      />
      <div className={cx(layout === 'inline' && 'flex-1')}>
        <h3 className="mb-2 flex items-center gap-2 text-lg font-semibold text-white">
          {title}
          {action}
        </h3>
        <p className="text-sm text-gray-400">{description}</p>
      </div>
    </div>
  </Card>
);

export default FeatureCard;
