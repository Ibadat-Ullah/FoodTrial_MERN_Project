import { Link, useLocation, useNavigate } from 'react-router-dom';
import { scrollToHash } from './ScrollToHash';

export default function SectionLink({ section, children, onClick, ...props }) {
  const location = useLocation();
  const navigate = useNavigate();

  const handleClick = (event) => {
    onClick?.(event);
    if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    event.preventDefault();
    const hash = `#${section}`;

    if (location.pathname !== '/') {
      navigate({ pathname: '/', hash });
      return;
    }

    if (location.hash !== hash) navigate({ pathname: '/', hash });
    window.setTimeout(() => scrollToHash(section), 0);
  };

  return <Link to={`/#${section}`} onClick={handleClick} {...props}>{children}</Link>;
}
