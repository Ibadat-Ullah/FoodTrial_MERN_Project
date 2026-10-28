import { forwardRef } from 'react';

const Input = forwardRef(function Input({ label, error, id, type = 'text', className = '', ...props }, ref) {
  const controlId = id || props.name;
  const controlClass = `w-full rounded-xl border border-stone-200 bg-white px-4 py-3 text-sm text-ink outline-none transition placeholder:text-stone-400 focus:border-brand-500 focus:ring-4 focus:ring-brand-100 ${error ? 'border-red-400 focus:border-red-400 focus:ring-red-100' : ''} ${className}`;

  if (type === 'checkbox') {
    return (
      <label htmlFor={controlId} className="flex items-center gap-3 text-sm font-medium text-stone-700">
        <input id={controlId} ref={ref} type="checkbox" className="h-4 w-4 accent-brand-600" {...props} />
        {label}
        {error && <span className="text-xs text-red-600">{error}</span>}
      </label>
    );
  }

  return (
    <div className="w-full">
      {label && <label htmlFor={controlId} className="mb-2 block text-sm font-semibold text-stone-700">{label}</label>}
      <input id={controlId} ref={ref} type={type} className={controlClass} aria-invalid={Boolean(error)} {...props} />
      {error && <p className="mt-1.5 text-xs font-medium text-red-600">{error}</p>}
    </div>
  );
});

export default Input;
