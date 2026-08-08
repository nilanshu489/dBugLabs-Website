/**
 * Join class names, dropping anything falsy.
 *
 * Lets components write conditional classes inline without leaving stray
 * "undefined"/"false" tokens in the DOM:
 *
 *   cx('card', isActive && 'border-purple-500', className)
 */
export const cx = (...parts) => parts.filter(Boolean).join(' ');

export default cx;
