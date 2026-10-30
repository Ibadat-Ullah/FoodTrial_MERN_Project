import { useState } from 'react';
import { Link } from 'react-router-dom';
import BrandLogo from '../common/BrandLogo';
import SectionLink from '../common/SectionLink';

const links = [
  { label: 'Home', to: '/' },
  { label: 'Menu', section: 'menu' },
  { label: 'About', section: 'about' },
  { label: 'Contact', section: 'contact' }
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-30 border-b border-brand-100 bg-white/95 shadow-[0_4px_20px_rgba(255,69,0,0.04)] backdrop-blur-md">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-8">
        <BrandLogo />
        <div className="hidden items-center gap-9 md:flex">
          {links.map((link) => link.section
            ? <SectionLink key={link.label} section={link.section} className="group relative py-2 text-sm font-bold text-brand-700 transition hover:text-brand-900">{link.label}<span className="absolute inset-x-0 -bottom-0.5 h-0.5 origin-left scale-x-0 rounded-full bg-brand-500 transition-transform group-hover:scale-x-100" /></SectionLink>
            : <Link key={link.label} to={link.to} className="group relative py-2 text-sm font-bold text-brand-700 transition hover:text-brand-900">{link.label}<span className="absolute inset-x-0 -bottom-0.5 h-0.5 origin-left scale-x-0 rounded-full bg-brand-500 transition-transform group-hover:scale-x-100" /></Link>)}
        </div>
        <Link to="/admin" className="hidden rounded-full bg-brand-600 px-6 py-3 text-sm font-bold text-white transition hover:bg-brand-700 md:inline-flex">Admin</Link>
        <button type="button" aria-label="Toggle navigation menu" aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)} className="grid h-11 w-11 place-items-center rounded-full bg-brand-50 text-xl text-brand-700 md:hidden">{menuOpen ? '×' : '☰'}</button>
      </nav>
      {menuOpen && <div className="absolute left-0 right-0 top-full border-t border-stone-100 bg-white px-5 py-4 shadow-lg md:hidden">
        <div className="mx-auto flex max-w-7xl flex-col gap-1">
          {links.map((link) => link.section
            ? <SectionLink key={link.label} section={link.section} onClick={() => setMenuOpen(false)} className="rounded-xl px-4 py-3 text-sm font-bold text-brand-700 hover:bg-brand-50">{link.label}</SectionLink>
            : <Link key={link.label} to={link.to} onClick={() => setMenuOpen(false)} className="rounded-xl px-4 py-3 text-sm font-bold text-brand-700 hover:bg-brand-50">{link.label}</Link>)}
          <Link to="/admin" onClick={() => setMenuOpen(false)} className="mt-2 rounded-xl bg-brand-600 px-4 py-3 text-center text-sm font-bold text-white">Admin</Link>
        </div>
      </div>}
    </header>
  );
}
