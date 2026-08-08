import cx from '../../lib/cx';

/**
 * The pill tab row used on the home, about and projects pages.
 *
 * `tabs` is `[{ key, label, icon }]`. Wraps on narrow screens rather than
 * overflowing, which is what the three hand-rolled copies used to do.
 */
const TabSwitcher = ({ tabs, value, onChange, className }) => (
  <div className={cx('flex flex-wrap justify-center gap-3 sm:gap-4', className)}>
    {tabs.map(({ key, label, icon: Icon }) => {
      const isActive = key === value;
      return (
        <button
          key={key}
          type="button"
          aria-pressed={isActive}
          onClick={() => onChange(key)}
          className={cx(
            'flex items-center gap-2 rounded-full px-6 py-3 font-semibold transition-all sm:gap-3 sm:px-8 sm:py-4',
            isActive
              ? 'bg-gradient-to-r from-purple-600 to-pink-500 text-white shadow-lg shadow-purple-500/30'
              : 'border border-purple-500/20 bg-purple-500/10 text-gray-300 hover:border-purple-500/50 hover:text-white',
          )}
        >
          {Icon && <Icon className="h-5 w-5" />}
          {label}
        </button>
      );
    })}
  </div>
);

export default TabSwitcher;
