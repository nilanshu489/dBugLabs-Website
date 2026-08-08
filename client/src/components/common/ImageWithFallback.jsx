import { useState } from 'react';

/**
 * An <img> that swaps to `fallback` when the source fails to load.
 *
 * Replaces the `onError={(e) => { e.target.style.display = 'none';
 * e.target.nextElementSibling.style.display = 'flex' }}` pattern this codebase
 * used in two places — that reached past React into the DOM and silently broke
 * whenever the sibling markup moved.
 */
const ImageWithFallback = ({ src, alt, fallback = null, ...props }) => {
  const [failed, setFailed] = useState(false);

  if (failed || !src) return fallback;

  return <img src={src} alt={alt} onError={() => setFailed(true)} {...props} />;
};

export default ImageWithFallback;
