import { useEffect, useState } from 'react';
import { slides } from '../../data/landingData';
import SectionLink from '../common/SectionLink';

export default function Hero() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const next = () => setActive((current) => (current + 1) % slides.length);
  const previous = () => setActive((current) => (current - 1 + slides.length) % slides.length);

  useEffect(() => {
    if (paused) return undefined;
    const timer = window.setInterval(next, 3500);
    return () => window.clearInterval(timer);
  }, [paused]);

  return (
    <section className="relative isolate min-h-[560px] overflow-hidden bg-stone-900 sm:min-h-[650px]" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
      {slides.map((slide, index) => (
        <div key={slide.title} className={`absolute inset-0 -z-10 transition-opacity duration-1000 ${index === active ? 'opacity-100' : 'opacity-0'}`} aria-hidden={index !== active}>
          <img src={slide.image} alt="" className={`h-full w-full object-cover transition-transform duration-[6000ms] ease-out ${index === active ? 'scale-105' : 'scale-100'}`} />
        </div>
      ))}
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-black/80 via-black/45 to-black/10" />
      <div className="absolute inset-x-0 bottom-0 -z-10 h-40 bg-gradient-to-t from-black/35 to-transparent" />
      <div className="mx-auto flex min-h-[560px] max-w-7xl items-center px-6 py-20 sm:min-h-[650px] sm:px-10">
        <div className="max-w-2xl text-white">
          <span className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-4 py-2 text-[11px] font-extrabold uppercase tracking-[0.2em] text-white shadow-lg backdrop-blur-md">
            <span className="h-1.5 w-1.5 rounded-full bg-brand-400 shadow-[0_0_10px_rgba(255,118,82,0.9)]" />
            Your next favorite bite
          </span>
          <h1 className="whitespace-pre-line font-display text-5xl font-extrabold leading-[1.03] tracking-[-0.045em] drop-shadow sm:text-7xl lg:text-8xl">{slides[active].title}</h1>
          <p className="mt-6 max-w-lg text-base leading-7 text-white/85 sm:text-lg sm:leading-8">{slides[active].subtitle}</p>
          <SectionLink section="menu" className="group mt-9 inline-flex items-center rounded-full bg-brand-500 px-8 py-4 text-sm font-extrabold text-white shadow-lg shadow-brand-900/30 transition hover:-translate-y-0.5 hover:bg-brand-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-brand-600">Explore the menu <span className="ml-3 text-lg transition-transform group-hover:translate-x-1">→</span></SectionLink>
        </div>
      </div>
      <button type="button" onClick={previous} aria-label="Previous slide" className="absolute left-4 top-1/2 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full border border-white/35 bg-black/25 text-2xl text-white shadow-lg backdrop-blur-md transition hover:scale-105 hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white sm:left-8">‹</button>
      <button type="button" onClick={next} aria-label="Next slide" className="absolute right-4 top-1/2 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full border border-white/35 bg-black/25 text-2xl text-white shadow-lg backdrop-blur-md transition hover:scale-105 hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white sm:right-8">›</button>
      <div className="absolute bottom-8 left-1/2 flex -translate-x-1/2 gap-2.5 rounded-full border border-white/15 bg-black/20 px-3 py-2 backdrop-blur-md" aria-label="Choose slide">
        {slides.map((slide, index) => <button key={slide.title} type="button" onClick={() => setActive(index)} aria-label={`Go to slide ${index + 1}`} aria-current={index === active} className={`h-2.5 rounded-full transition-all ${index === active ? 'w-8 bg-brand-400' : 'w-2.5 bg-white/70 hover:bg-white'}`} />)}
      </div>
    </section>
  );
}
