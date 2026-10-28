const highlights = [
  { icon: '✦', title: 'Made fresh', description: 'Prepared when you order' },
  { icon: '↗', title: 'Big on flavor', description: 'Your favorites, done right' },
  { icon: '⌂', title: 'At your door', description: 'A little joy, delivered' }
];

export default function Highlights() {
  return (
    <section aria-label="Why order from FoodTrial" className="relative z-10 mx-auto -mt-7 max-w-6xl px-5 sm:-mt-9 sm:px-8">
      <div className="grid overflow-hidden rounded-3xl border border-brand-100 bg-white shadow-[0_18px_50px_rgba(80,35,15,0.10)] sm:grid-cols-3">
        {highlights.map((highlight, index) => (
          <div key={highlight.title} className={`flex items-center gap-4 px-5 py-5 sm:px-7 sm:py-6 ${index > 0 ? 'border-t border-brand-100 sm:border-l sm:border-t-0' : ''}`}>
            <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-brand-50 text-xl font-extrabold text-brand-600">{highlight.icon}</span>
            <div>
              <p className="text-sm font-extrabold text-ink">{highlight.title}</p>
              <p className="mt-1 text-xs text-stone-500">{highlight.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
