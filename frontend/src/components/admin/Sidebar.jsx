import { useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';

const resourceMenus = [
  { key: 'foods', label: 'Foods', icon: 'food', actions: ['Add food', 'Update food', 'Remove food'] },
  { key: 'riders', label: 'Riders', icon: 'rider', actions: ['Add rider', 'Update rider', 'Remove rider'] }
];

function NavIcon({ name, className = 'h-5 w-5' }) {
  const paths = {
    overview: <><path d="m3 10 9-7 9 7" /><path d="M5 9v11h14V9M9 20v-7h6v7" /></>,
    food: <><path d="M4 10h16l-1.3 10H5.3L4 10Z" /><path d="M7 10a5 5 0 0 1 10 0M8 14h.01M12 14h.01M16 14h.01" /></>,
    rider: <><circle cx="6" cy="17" r="3" /><circle cx="18" cy="17" r="3" /><path d="M9 17h4l3-7h-5l-2 4H5m7-7h3m-1 0 2 3" /></>,
    chevron: <path d="m7 10 5 5 5-5" />
  };

  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className}>
      {paths[name]}
    </svg>
  );
}

function getActionHref(resource, action) {
  if (action.startsWith('Add')) return `/admin/${resource}/new`;
  return `/admin/${resource}?view=all&manage=${action.startsWith('Update') ? 'update' : 'remove'}`;
}

export default function Sidebar() {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const activeResource = resourceMenus.find(({ key }) => location.pathname.startsWith(`/admin/${key}`))?.key;
  const [expanded, setExpanded] = useState(activeResource || '');

  const closeMobile = () => setOpen(false);

  return (
    <>
      <button type="button" aria-label="Toggle admin navigation" aria-expanded={open} onClick={() => setOpen((value) => !value)} className="fixed left-4 top-4 z-40 grid h-11 w-11 place-items-center rounded-full bg-brand-600 text-xl text-white shadow-lg shadow-brand-600/25 lg:hidden">{open ? '×' : '☰'}</button>
      {open && <button type="button" aria-label="Close admin navigation" onClick={closeMobile} className="fixed inset-0 z-30 bg-ink/40 backdrop-blur-[2px] lg:hidden" />}
      <aside className={`fixed inset-y-0 left-0 z-40 flex h-screen w-[286px] shrink-0 flex-col overflow-y-auto border-r border-brand-100/80 bg-white px-5 py-6 text-ink shadow-[12px_0_40px_rgba(80,35,15,0.07)] transition-transform duration-300 lg:sticky lg:top-0 lg:translate-x-0 ${open ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="mb-9 flex items-center justify-between pl-2">
          <Link to="/admin" onClick={closeMobile} className="inline-flex items-center gap-2 font-display text-2xl tracking-tight">
            <span className="grid h-10 w-10 place-items-center rounded-2xl bg-brand-500 text-white shadow-md shadow-brand-500/25">F</span>
            <span>Food<span className="text-brand-600">Trial</span></span>
          </Link>
          <button type="button" aria-label="Close admin navigation" onClick={closeMobile} className="text-2xl text-stone-400 hover:text-brand-600 lg:hidden">×</button>
        </div>

        <div className="mb-6 rounded-2xl bg-gradient-to-br from-brand-600 to-brand-500 p-4 text-white shadow-lg shadow-brand-500/20">
          <p className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-white/75">FoodTrial workspace</p>
          <p className="mt-1 font-display text-xl">Make today delicious.</p>
          <p className="mt-1 text-xs text-white/80">Manage your menu and delivery team.</p>
        </div>

        <p className="mb-2 px-3 text-[10px] font-extrabold uppercase tracking-[0.2em] text-stone-400">Workspace</p>
        <nav className="space-y-2">
          <NavLink
            to="/admin"
            end
            onClick={closeMobile}
            className={({ isActive }) => `flex items-center gap-3 rounded-xl px-3.5 py-3 text-sm font-bold transition ${isActive ? 'bg-brand-50 text-brand-800 ring-1 ring-brand-100' : 'text-stone-600 hover:bg-brand-50 hover:text-brand-800'}`}
          >
            <span className="grid h-8 w-8 place-items-center rounded-lg bg-white text-brand-600 shadow-sm"><NavIcon name="overview" /></span>
            Overview
          </NavLink>

          {resourceMenus.map((menu) => {
            const isExpanded = expanded === menu.key;
            const isActive = activeResource === menu.key;
            return (
              <div key={menu.key} className={`overflow-hidden rounded-xl transition ${isActive ? 'bg-brand-50/70 ring-1 ring-brand-100' : 'hover:bg-stone-50'}`}>
                <button
                  type="button"
                  aria-expanded={isExpanded}
                  onClick={() => setExpanded(isExpanded ? '' : menu.key)}
                  className={`flex w-full items-center gap-3 px-3.5 py-2.5 text-left text-sm font-bold transition ${isActive ? 'text-brand-800' : 'text-stone-600 hover:text-brand-800'}`}
                >
                  <span className={`grid h-8 w-8 place-items-center rounded-lg shadow-sm ${isActive ? 'bg-brand-500 text-white' : 'bg-white text-brand-600'}`}><NavIcon name={menu.icon} /></span>
                  <span className="flex-1">{menu.label}</span>
                  <NavIcon name="chevron" className={`h-4 w-4 transition-transform ${isExpanded ? 'rotate-180 text-brand-600' : 'text-stone-400'}`} />
                </button>
                {isExpanded && (
                  <div className="mb-2 ml-[3.15rem] mr-2 space-y-1 border-l border-brand-200 pl-3">
                    {menu.actions.map((action) => {
                      const href = getActionHref(menu.key, action);
                      const isSelected = action.startsWith('Add')
                        ? location.pathname === href
                        : location.pathname === `/admin/${menu.key}` && new URLSearchParams(location.search).get('manage') === (action.startsWith('Update') ? 'update' : 'remove')
                          || location.pathname.includes(action.startsWith('Update') ? '/edit' : '/delete') && activeResource === menu.key;
                      return (
                        <Link
                          key={action}
                          to={href}
                          onClick={closeMobile}
                          className={`flex items-center gap-2 rounded-lg px-3 py-2 text-xs font-semibold transition ${isSelected ? 'bg-white text-brand-800 shadow-sm ring-1 ring-brand-100' : 'text-stone-500 hover:bg-white hover:text-brand-800'}`}
                        >
                          <span className={`h-1.5 w-1.5 rounded-full ${isSelected ? 'bg-brand-500' : 'bg-brand-200'}`} />
                          {action}
                        </Link>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </nav>

        <div className="mt-auto pt-8">
          <div className="rounded-2xl border border-brand-100 bg-gradient-to-br from-white to-brand-50 p-4">
            <p className="text-sm font-bold text-ink">Ready for a bite?</p>
            <p className="mt-1 text-xs leading-5 text-stone-500">See what’s cooking on the customer menu.</p>
            <Link to="/" onClick={closeMobile} className="mt-3 inline-flex items-center gap-2 rounded-full bg-brand-500 px-3.5 py-2 text-xs font-bold text-white transition hover:bg-brand-600">
              Visit storefront <span aria-hidden="true">→</span>
            </Link>
          </div>
          <p className="mt-4 px-2 text-[10px] font-medium text-stone-400">FoodTrial Admin · Good food, good mood</p>
        </div>
      </aside>
    </>
  );
}
