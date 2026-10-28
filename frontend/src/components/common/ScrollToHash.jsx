import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export function scrollToHash(hash) {
  const element = document.getElementById(hash);
  if (!element) return;
  window.scrollTo({
    top: element.getBoundingClientRect().top + window.scrollY,
    behavior: 'instant'
  });
}

export default function ScrollToHash() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (!hash) return undefined;

    const frame = window.requestAnimationFrame(() => scrollToHash(decodeURIComponent(hash.slice(1))));

    return () => window.cancelAnimationFrame(frame);
  }, [pathname, hash]);

  return null;
}
