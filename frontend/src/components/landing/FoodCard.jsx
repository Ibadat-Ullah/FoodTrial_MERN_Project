import { useState } from 'react';
import { getAssetUrl } from '../../api/client';
import Button from '../common/Button';
import OrderDialog from './OrderDialog';

export default function FoodCard({ food }) {
  const [orderOpen, setOrderOpen] = useState(false);

  return (
    <>
      <article className="group overflow-hidden rounded-[1.65rem] border border-stone-100/90 bg-white shadow-[0_8px_24px_rgba(35,27,23,0.045)] transition duration-300 hover:-translate-y-1.5 hover:border-brand-100 hover:shadow-[0_22px_50px_rgba(201,52,0,0.12)]">
        <div className="relative h-56 overflow-hidden bg-brand-50">
          <img src={getAssetUrl(food.imageUrl)} alt={food.name} loading="lazy" className="h-full w-full object-cover transition duration-700 ease-out group-hover:scale-110" />
          <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-black/25 to-transparent" />
          {food.category && <span className="absolute left-4 top-4 rounded-full border border-white/70 bg-white/95 px-3 py-1.5 text-[11px] font-extrabold tracking-wide text-brand-700 shadow-sm backdrop-blur">{food.category}</span>}
        </div>
        <div className="p-5 sm:p-5">
          <div className="flex items-start justify-between gap-3">
            <h3 className="font-display text-lg font-extrabold leading-snug text-ink">{food.name}</h3>
            <span className="shrink-0 rounded-full bg-brand-50 px-2.5 py-1 text-xs font-extrabold text-brand-700">Rs. {Number(food.price).toLocaleString()}</span>
          </div>
          <p className="mt-2 line-clamp-2 min-h-12 text-sm leading-6 text-stone-500">{food.description}</p>
          <Button type="button" className="group/order mt-5 w-full justify-between px-5 shadow-sm shadow-brand-600/10" onClick={() => setOrderOpen(true)}>
            <span>Order now</span><span className="text-base transition-transform group-hover/order:translate-x-1">→</span>
          </Button>
        </div>
      </article>
      <OrderDialog food={food} open={orderOpen} onClose={() => setOrderOpen(false)} />
    </>
  );
}
