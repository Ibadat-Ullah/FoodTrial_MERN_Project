import { Link } from 'react-router-dom';
import mark from '../../assets/foodtrial-mark.svg';

export default function BrandLogo({ variant = 'light', className = '' }) {
  const wordColor = variant === 'dark' ? 'text-white' : 'text-ink';

  return (
    <Link
      to="/"
      aria-label="FoodTrial home"
      className={`inline-flex w-fit items-center gap-2.5 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2 ${className}`}
    >
      <img src={mark} alt="" aria-hidden="true" className="h-10 w-10 shrink-0" />
      <span className={`font-display text-[1.65rem] leading-none tracking-tight ${wordColor}`}>
        Food<span className="text-brand-500">Trial</span>
      </span>
    </Link>
  );
}
