import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getAll } from '../../api/resourceApi';

const modules = [
  { key: 'foods', label: 'Foods', description: 'Manage menu items', to: '/admin/foods?view=all', icon: '✳' },
  { key: 'orders', label: 'Orders', description: 'Review customer orders', to: '/admin/orders?view=all', icon: '▤' },
  { key: 'payments', label: 'Payments', description: 'Track payment status', to: '/admin/payments?view=all', icon: '◇' },
  { key: 'riders', label: 'Riders', description: 'Manage delivery riders', to: '/admin/riders?view=all', icon: '➜' }
];

export default function Dashboard() {
  const [counts, setCounts] = useState({});
  const [error, setError] = useState('');

  useEffect(() => {
    let active = true;
    Promise.all(modules.map(async (module) => [module.key, await getAll(module.key)]))
      .then((results) => {
        if (active) setCounts(Object.fromEntries(results.map(([key, data]) => [key, data.length])));
      })
      .catch((requestError) => {
        if (active) setError(requestError.response?.data?.message || requestError.message || 'Could not load dashboard totals.');
      });
    return () => { active = false; };
  }, []);

  return (
    <>
      <div className="mb-9">
        <p className="inline-flex items-center gap-2 rounded-full bg-brand-50 px-3 py-1.5 text-[10px] font-extrabold uppercase tracking-[0.2em] text-brand-700"><span className="h-1.5 w-1.5 rounded-full bg-brand-500" /> Your workspace</p>
        <h1 className="mt-3 font-display text-4xl font-extrabold tracking-[-0.04em] text-ink">Kitchen overview<span className="text-brand-500">.</span></h1>
        <p className="mt-2 text-sm text-stone-500">A quick look at what’s happening across FoodTrial.</p>
      </div>
      {error && <div role="alert" className="mb-6 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">{error}</div>}
      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        {modules.map((module) => (
          <Link key={module.key} to={module.to} className="group rounded-2xl border border-stone-100 bg-white p-6 shadow-[0_8px_24px_rgba(35,27,23,0.04)] transition duration-300 hover:-translate-y-1 hover:border-brand-100 hover:shadow-soft">
            <div className="flex items-start justify-between">
              <span className="grid h-11 w-11 place-items-center rounded-xl bg-brand-50 text-xl text-brand-700 transition group-hover:bg-brand-500 group-hover:text-white">{module.icon}</span>
              <span className="font-display text-3xl font-extrabold tracking-tight text-ink">{counts[module.key] ?? '—'}</span>
            </div>
            <h2 className="mt-5 font-bold text-ink">{module.label}</h2>
            <p className="mt-1 text-sm text-stone-500">{module.description}</p>
            <span className="mt-5 inline-flex items-center gap-2 text-xs font-extrabold text-brand-700 group-hover:text-brand-900">Manage {module.label.toLowerCase()} <span className="transition-transform group-hover:translate-x-1">→</span></span>
          </Link>
        ))}
      </div>
      <section className="relative mt-8 overflow-hidden rounded-3xl border border-brand-100 bg-gradient-to-br from-white via-white to-brand-50 p-7 text-ink shadow-sm sm:p-9">
        <div aria-hidden="true" className="pointer-events-none absolute -right-10 -top-20 h-56 w-56 rounded-full bg-brand-100/60 blur-3xl" />
        <p className="relative text-[10px] font-extrabold uppercase tracking-[0.2em] text-brand-700">Good to know</p>
        <h2 className="relative mt-3 font-display text-2xl font-extrabold tracking-tight">Small moments. Great meals.</h2>
        <p className="relative mt-2 max-w-2xl text-sm leading-6 text-stone-500">Keep your menu fresh, orders moving, and delivery team ready. Use the sections above to manage each part of your kitchen.</p>
      </section>
    </>
  );
}
