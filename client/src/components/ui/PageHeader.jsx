import cx from '../../lib/cx';

/**
 * The masthead for a standalone route (Team, Projects, Contact, Join).
 *
 * Identical in shape to SectionHeading but renders an <h1> at page scale, so
 * each route keeps exactly one top-level heading.
 */
const PageHeader = ({ eyebrow, title, description, className }) => (
  <header className={cx('text-center', className)}>
    {eyebrow && (
      <span className="text-sm font-semibold uppercase tracking-wider text-pink-400">{eyebrow}</span>
    )}
    <h1 className="mt-2 mb-4 text-4xl font-bold text-white md:text-5xl">{title}</h1>
    {description && <p className="mx-auto max-w-2xl text-gray-400">{description}</p>}
  </header>
);

export default PageHeader;
