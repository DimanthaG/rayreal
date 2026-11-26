import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import clsx from 'clsx';
import { Menu, Phone, X } from 'lucide-react';
import { Logo, WhatsAppIcon } from './ui';
import { telLink, whatsappLink } from '../lib/whatsapp';

const NAV = [
  { to: '/', label: 'Home' },
  { to: '/listings', label: 'Properties' },
  { to: '/about', label: 'About' },
  { to: '/contact', label: 'Contact' },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setOpen(false);
  }, [location.pathname, location.search]);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
  }, [open]);

  const isActive = (to) => {
    if (to === '/') return location.pathname === '/';
    if (to === '/listings') return location.pathname.startsWith('/listings') || location.pathname.startsWith('/property/');
    return location.pathname.startsWith(to);
  };

  return (
    <header className={clsx('sticky top-0 z-40 transition-all duration-300', scrolled ? 'bg-white/85 shadow-[0_1px_0_#E6E8F0] backdrop-blur-xl' : 'bg-white')}>
      <div className="container-x flex h-[72px] items-center justify-between gap-6">
        <Link to="/" aria-label="Ray Realty home" className="shrink-0">
          <Logo className="h-7 sm:h-8" />
        </Link>

        <nav className="hidden items-center gap-8 lg:flex" aria-label="Main">
          {NAV.map((n) => (
            <NavLink key={n.to} to={n.to} end={n.to === '/'} aria-current={isActive(n.to) ? 'page' : undefined} className={clsx('relative py-1 text-[14px] transition-colors hover:text-navy', isActive(n.to) ? 'font-medium text-navy after:absolute after:inset-x-0 after:-bottom-1 after:h-0.5 after:rounded-full after:bg-navy' : 'text-muted')}>
              {n.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a href={telLink()} className="grid h-10 w-10 place-items-center rounded-full bg-ice text-navy transition hover:bg-powder" aria-label="Call Ray Realty">
            <Phone className="h-4 w-4" />
          </a>
          <a href={whatsappLink()} target="_blank" rel="noreferrer" className="grid h-10 w-10 place-items-center rounded-full bg-ice text-[#128C4B] transition hover:bg-[#DCF8E6]" aria-label="WhatsApp Ray Realty">
            <WhatsAppIcon className="h-[18px] w-[18px]" />
          </a>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="grid h-10 w-10 place-items-center rounded-full bg-ice text-navy lg:hidden"
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
          >
            {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="fixed inset-x-0 bottom-0 top-[72px] z-40 animate-fade bg-white lg:hidden">
          <nav className="container-x flex flex-col pt-6" aria-label="Mobile">
            {NAV.map((n, i) => (
              <Link
                key={n.to}
                to={n.to}
                aria-current={isActive(n.to) ? 'page' : undefined}
                className={clsx('animate-rise border-b border-line py-5 text-3xl font-light tracking-tight', isActive(n.to) ? 'text-navy' : 'text-ink')}
                style={{ animationDelay: `${i * 50}ms` }}
              >
                {n.label}
              </Link>
            ))}
            <a href={whatsappLink()} target="_blank" rel="noreferrer" className="btn-wa mt-8 self-start">
              <span className="btn-icon"><WhatsAppIcon /></span>
              Chat on WhatsApp
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
