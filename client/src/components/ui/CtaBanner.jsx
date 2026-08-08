import { Mail, ArrowRight } from 'lucide-react';
import cx from '../../lib/cx';
import Button from './Button';

/** The tinted "get in touch" panel that closes the about and events pages. */
const CtaBanner = ({
  icon: Icon = Mail,
  title,
  description,
  actionLabel = 'Contact Us',
  actionTo = '/contact',
  className,
}) => (
  <div className={cx('relative overflow-hidden rounded-2xl', className)}>
    <div
      className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-pink-600/20"
      aria-hidden="true"
    />
    <div className="relative p-8 text-center md:p-12">
      <Icon className="mx-auto mb-4 h-12 w-12 text-purple-400" />
      <h3 className="mb-4 text-2xl font-bold text-white md:text-3xl">{title}</h3>
      <p className="mx-auto mb-6 max-w-2xl text-lg text-gray-300">{description}</p>
      <Button to={actionTo} size="lg" icon={ArrowRight} iconPosition="right">
        {actionLabel}
      </Button>
    </div>
  </div>
);

export default CtaBanner;
