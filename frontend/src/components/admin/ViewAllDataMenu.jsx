import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

const dataLinks = [
  { to: '/admin/foods?view=all', label: 'Foods', icon: '✳' },
  { to: '/admin/orders?view=all', label: 'Orders', icon: '▤' },
  { to: '/admin/payments?view=all', label: 'Payments', icon: '◇' },
  { to: '/admin/riders?view=all', label: 'Riders', icon: '➜' },
  { to: '/admin/users', label: 'Registered users', icon: '◎' }
];

export default function ViewAllDataMenu() {
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    if (!open) return undefined;
    const closeOnOutsideClick = (event) => {
      if (!menuRef.current?.contains(event.target)) setOpen(false);
    };
    const closeOnEscape = (event) => {
      if (event.key === 'Escape') setOpen(false);
    };
    document.addEventListener('mousedown', closeOnOutsideClick);
    document.addEventListener('keydown', closeOnEscape);
    return () => {
      document.removeEventListener('mousedown', closeOnOutsideClick);
      document.removeEventListener('keydown', closeOnEscape);
    };
  }, [open]);

  return (
    <div ref={menuRef} className="relative">
      <button
        type="button"
        aria-haspopup="menu"
        aria-expanded={open}
        onClick={() => setOpen((value) => !value)}
        className="inline-flex items-center gap-2 rounded-full border border-brand-200 bg-white px-4 py-2.5 text-sm font-bold text-brand-700 shadow-sm transition hover:border-brand-500 hover:bg-brand-50 hover:text-brand-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
      >
        View all data <span className={`text-xs transition-transform ${open ? 'rotate-180' : ''}`} aria-hidden="true">⌄</span>
      </button>
      {open && (
        <div role="menu" className="absolute right-0 top-full z-30 mt-2 w-60 overflow-hidden rounded-2xl border border-stone-100 bg-white p-2 shadow-soft">
          {dataLinks.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              role="menuitem"
              onClick={() => setOpen(false)}
              className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold text-brand-700 transition hover:bg-brand-50 hover:text-brand-900"
            >
              <span className="w-5 text-center text-base text-brand-600">{item.icon}</span>
              {item.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
