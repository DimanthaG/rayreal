import { Link, NavLink, Outlet } from 'react-router-dom';
import clsx from 'clsx';
import { ExternalLink, LayoutGrid, LogOut, Plus } from 'lucide-react';
import Seo from '../../components/Seo';
import { Logo } from '../../components/ui';
import { useAuth } from '../../context/AuthContext';
import { isDemo } from '../../config';

export default function AdminLayout() {
  const { user, signOut } = useAuth();
  return (
    <div className="min-h-screen bg-ice">
      <Seo title="Admin" noindex />
      <header className="sticky top-0 z-30 border-b border-line bg-white/90 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-[1400px] items-center gap-4 px-4 sm:px-6">
          <Link to="/admin" className="flex items-center gap-3">
            <Logo className="h-6" />
            <span className="hidden rounded-full bg-ice px-2.5 py-1 text-[11px] font-medium uppercase tracking-wide text-muted sm:inline">Admin</span>
          </Link>
          <nav className="ml-4 hidden items-center gap-1 md:flex">
            <NavLink end to="/admin" className={({ isActive }) => clsx('flex items-center gap-2 rounded-full px-4 py-2 text-sm', isActive ? 'bg-ice text-navy' : 'text-muted hover:text-navy')}>
              <LayoutGrid className="h-4 w-4" /> Listings
            </NavLink>
            <Link to="/" className="flex items-center gap-2 rounded-full px-4 py-2 text-sm text-muted hover:text-navy">
              View site <ExternalLink className="h-3.5 w-3.5" />
            </Link>
          </nav>
          <div className="ml-auto flex items-center gap-2">
            <Link to="/admin/properties/new" className="hidden items-center gap-2 rounded-full bg-navy px-4 py-2 text-sm font-medium text-white transition hover:bg-navy-700 sm:flex">
              <Plus className="h-4 w-4" /> Add property
            </Link>
            <div className="hidden text-right text-xs leading-tight lg:block">
              <div className="text-ink">{user?.email}</div>
              <div className="text-muted">{isDemo ? 'Demo session' : 'Administrator'}</div>
            </div>
            <button type="button" onClick={signOut} className="grid h-9 w-9 place-items-center rounded-full bg-ice text-muted transition hover:bg-brand-redSoft hover:text-brand-red" aria-label="Sign out" title="Sign out">
              <LogOut className="h-4 w-4" />
            </button>
          </div>
        </div>
      </header>
      {isDemo && (
        <div className="bg-powder-soft px-4 py-2 text-center text-xs text-navy">
          Demo mode — test store in this browser, not the live database. Set <code className="rounded bg-white px-1">VITE_API_BASE_URL</code> to go live.
        </div>
      )}
      <main className="mx-auto max-w-[1400px] px-4 py-8 sm:px-6">
        <Outlet />
      </main>
    </div>
  );
}
