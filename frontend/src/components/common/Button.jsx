export default function Button({ children, variant = 'primary', className = '', ...props }) {
  const styles = {
    primary: 'bg-brand-600 text-white shadow-sm shadow-brand-600/15 hover:-translate-y-0.5 hover:bg-brand-700 hover:shadow-md focus-visible:ring-brand-500',
    secondary: 'border border-brand-100 bg-white text-brand-800 hover:border-brand-200 hover:bg-brand-50 focus-visible:ring-brand-400',
    danger: 'bg-red-50 text-red-700 hover:bg-red-100 focus-visible:ring-red-500'
  };

  return (
    <button
      className={`inline-flex items-center justify-center rounded-full px-5 py-2.5 text-sm font-bold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60 ${styles[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
