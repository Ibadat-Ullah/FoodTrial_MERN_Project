import { Link } from 'react-router-dom';
import { authImage } from '../../data/landingData';

export default function AuthLayout({ title, description, children, footer }) {
  return (
    <main className="grid min-h-screen bg-white lg:grid-cols-2">
      <section style={{ backgroundImage: `linear-gradient(180deg, rgba(0,0,0,.08), rgba(0,0,0,.72)), url("${authImage}")` }} className="hidden items-end bg-cover bg-center p-12 text-white lg:flex">
        <div>
          <Link to="/" className="font-display text-3xl">Food<span className="text-brand-400">Trial</span></Link>
          <p className="mt-4 max-w-md font-display text-4xl leading-tight">A little joy, served fresh.</p>
          <p className="mt-3 text-white/75">Your kitchen, your menu, your way.</p>
        </div>
      </section>
      <section className="flex items-center justify-center px-5 py-12">
        <div className="w-full max-w-md">
          <Link to="/" className="mb-10 inline-flex font-display text-xl text-ink lg:hidden">Food<span className="text-brand-600">Trial</span></Link>
          <Link to="/" className="hidden text-sm font-semibold text-stone-500 hover:text-brand-700 lg:inline-flex">← Back to storefront</Link>
          <h1 className="mt-8 font-display text-4xl text-ink">{title}</h1>
          <p className="mt-2 text-sm leading-6 text-stone-500">{description}</p>
          <div className="mt-8 rounded-3xl border border-stone-100 bg-white p-6 shadow-soft sm:p-8">{children}</div>
          <p className="mt-6 text-center text-sm text-stone-500">{footer}</p>
        </div>
      </section>
    </main>
  );
}
