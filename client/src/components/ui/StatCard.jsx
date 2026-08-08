import cx from '../../lib/cx';
import Card from './Card';
import IconBadge from './IconBadge';

const valueSizes = {
  sm: 'text-3xl',
  md: 'text-4xl',
  lg: 'text-4xl md:text-5xl',
};

/** A single figure with its label, optionally introduced by an icon. */
const StatCard = ({ value, label, icon, size = 'md', className }) => (
  <Card interactive className={cx('group p-6 text-center sm:p-8', className)}>
    {icon && (
      <IconBadge
        icon={icon}
        size="lg"
        className="mx-auto mb-4 transition-transform group-hover:scale-110"
      />
    )}
    <div className={cx('gradient-text mb-2 font-bold', valueSizes[size] ?? valueSizes.md)}>
      {value}
    </div>
    <div className="text-sm text-gray-400">{label}</div>
  </Card>
);

export default StatCard;
