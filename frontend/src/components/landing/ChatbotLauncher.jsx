import { useState } from 'react';

export default function ChatbotLauncher() {
  const [open, setOpen] = useState(false);

  return (
    <div className="fixed bottom-5 right-5 z-40 flex flex-col items-end gap-3 sm:bottom-7 sm:right-7">
      {open && (
        <section className="w-[min(20rem,calc(100vw-2.5rem))] rounded-2xl border border-stone-100 bg-white p-5 shadow-soft" aria-live="polite">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="font-bold text-ink">FoodTrial assistant</p>
              <p className="mt-1 text-xs leading-5 text-stone-500">A food discovery assistant is coming soon.</p>
            </div>
            <button type="button" onClick={() => setOpen(false)} aria-label="Close assistant" className="text-xl leading-none text-stone-400 hover:text-ink">×</button>
          </div>
          <div className="mt-4 rounded-xl bg-brand-50 px-3 py-2.5 text-xs leading-5 text-brand-900">
            This chat is being prepared for a future menu-aware assistant.
          </div>
        </section>
      )}
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-label={open ? 'Close FoodTrial assistant' : 'Open FoodTrial assistant'}
        aria-expanded={open}
        className="grid h-14 w-14 place-items-center rounded-full bg-brand-600 text-white shadow-lg transition hover:-translate-y-0.5 hover:bg-brand-700 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-brand-200"
      >
        {open ? (
          <span className="text-2xl" aria-hidden="true">×</span>
        ) : (
          <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6" aria-hidden="true">
            <path d="M5 18.5V6.8A2.8 2.8 0 0 1 7.8 4h8.4A2.8 2.8 0 0 1 19 6.8v6.4a2.8 2.8 0 0 1-2.8 2.8H9l-4 2.5Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
            <path d="M8 9h8M8 12.5h5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          </svg>
        )}
      </button>
    </div>
  );
}
