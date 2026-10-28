import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <main className="grid min-h-screen place-items-center bg-white px-5">
      <div className="text-center">
        <p className="text-sm font-extrabold uppercase tracking-[0.2em] text-brand-600">404 — not on the menu</p>
        <h1 className="mt-4 font-display text-5xl text-ink">We lost that page.</h1>
        <p className="mt-4 text-stone-500">The link may have changed, but there’s still plenty to enjoy.</p>
        <Link to="/" className="mt-7 inline-flex rounded-full bg-brand-600 px-6 py-3 text-sm font-bold text-white hover:bg-brand-700">Back to FoodTrial</Link>
      </div>
    </main>
  );
}
