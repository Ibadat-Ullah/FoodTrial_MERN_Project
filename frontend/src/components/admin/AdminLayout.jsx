import { Outlet, useLocation } from 'react-router-dom';
import Sidebar from './Sidebar';
import ViewAllDataMenu from './ViewAllDataMenu';

export default function AdminLayout() {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-[#fffaf8] lg:flex">
      <Sidebar />
      <main key={location.pathname} className="min-w-0 flex-1 bg-[radial-gradient(ellipse_at_top_right,_rgba(255,69,0,0.055),_transparent_34rem)] px-5 pb-12 pt-20 sm:px-8 lg:px-10 lg:pt-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8 flex items-center justify-between gap-4 rounded-2xl border border-brand-100/80 bg-white/90 px-4 py-3 shadow-[0_8px_25px_rgba(80,35,15,0.035)] sm:px-5">
            <div className="hidden sm:block">
              <p className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-brand-600">Admin console</p>
              <p className="mt-0.5 text-xs font-medium text-stone-500">Your restaurant, at a glance.</p>
            </div>
            <ViewAllDataMenu />
          </div>
          <Outlet />
        </div>
      </main>
    </div>
  );
}
