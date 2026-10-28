import { useEffect, useState } from 'react';
import api from '../../api/client';
import { fallbackFoods } from '../../data/landingData';
import Button from '../common/Button';
import SectionLink from '../common/SectionLink';
import FoodCard from './FoodCard';

const INITIAL_FOOD_COUNT = 8;

export default function Menu() {
  const [foods, setFoods] = useState(fallbackFoods);
  const [visibleCount, setVisibleCount] = useState(INITIAL_FOOD_COUNT);

  useEffect(() => {
    let active = true;
    api.get('/foods')
      .then(({ data }) => {
        if (active && Array.isArray(data) && data.length) setFoods(data.filter((food) => food.available !== false));
      })
      .catch(() => {
        if (active) setFoods(fallbackFoods);
      });
    return () => { active = false; };
  }, []);

  const visibleFoods = foods.slice(0, visibleCount);

  return (
    <section id="menu" className="scroll-mt-8 bg-gradient-to-b from-white via-white to-brand-50/40 px-5 pb-24 pt-16 sm:px-8 sm:pb-28 sm:pt-20">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 flex flex-col justify-between gap-5 sm:mb-14 sm:flex-row sm:items-end">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full bg-brand-50 px-3 py-1.5 text-[11px] font-extrabold uppercase tracking-[0.18em] text-brand-700">
              <span className="text-brand-500">✦</span> Made to make your day
            </span>
            <h2 className="mt-4 font-display text-4xl font-extrabold tracking-[-0.04em] text-ink sm:text-5xl">The good stuff<span className="text-brand-500">.</span></h2>
            <p className="mt-3 max-w-lg text-stone-500">Fresh, generous, and full of flavor. Find your new favorite.</p>
          </div>
          <SectionLink section="contact" className="group inline-flex items-center gap-2 text-sm font-bold text-brand-700 transition hover:text-brand-900">Questions? Get in touch <span className="transition-transform group-hover:translate-x-1">→</span></SectionLink>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {visibleFoods.map((food) => <FoodCard key={food._id || food.name} food={food} />)}
        </div>
        {foods.length > visibleCount && (
          <div className="mt-10 text-center">
            <Button type="button" variant="secondary" onClick={() => setVisibleCount((count) => count + INITIAL_FOOD_COUNT)}>
              View more
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}
