import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { Logo } from './ui';
import { company, config } from '../config';
import { telLink } from '../lib/whatsapp';

export const prettyPhone = (n) => n.replace(/^\+94(\d{2})(\d{3})(\d{4})$/, '+94 $1 $2 $3').replace(/^\+94(11)(\d{3})(\d{4})$/, '+94 $1 $2 $3');

export default function Footer() {
  return (
    <footer className="px-3 pb-3 sm:px-4 sm:pb-4">
      <div className="rounded-4xl bg-navy text-white">
        <div className="container-x grid gap-12 py-16 md:grid-cols-12">
          <div className="md:col-span-4">
            <Logo light className="h-9" />
            <p className="mt-5 max-w-sm text-[15px] leading-relaxed text-white/65">
              Land, homes and commercial property across Sri Lanka — with clear prices, clear deeds and people you can call.
            </p>
            <a href={company.groupUrl} target="_blank" rel="noreferrer" className="mt-6 inline-flex items-center gap-1.5 rounded-full bg-white/10 px-4 py-2 text-sm text-white/85 transition hover:bg-white/15">
              A {company.group} company <ArrowUpRight className="h-3.5 w-3.5" />
            </a>
          </div>
          <div className="md:col-span-2">
            <h3 className="text-sm font-medium text-white/50">Explore</h3>
            <ul className="mt-4 space-y-2.5 text-[15px]">
              <li><Link to="/listings" className="hover:text-powder">All properties</Link></li>
              <li><Link to="/listings?type=Land" className="hover:text-powder">Land for sale</Link></li>
              <li><Link to="/listings?type=House" className="hover:text-powder">Houses for sale</Link></li>
              <li><Link to="/about" className="hover:text-powder">About us</Link></li>
              <li><Link to="/contact" className="hover:text-powder">Contact</Link></li>
            </ul>
          </div>
          <div className="md:col-span-3">
            <h3 className="text-sm font-medium text-white/50">Contact</h3>
            <ul className="mt-4 space-y-3 text-[15px]">
              {company.contacts.slice(0, 2).map((t) => (
                <li key={t.phone}>
                  <a href={telLink(t.phone)} className="hover:text-powder">{prettyPhone(t.phone)}</a>
                  <span className="block text-xs text-white/45">{t.role}</span>
                </li>
              ))}
              <li><a href={`mailto:${config.email}`} className="hover:text-powder">{config.email}</a></li>
              <li className="text-white/60">{company.address.join(', ')}</li>
            </ul>
          </div>
          <div className="md:col-span-3">
            <h3 className="text-sm font-medium text-white/50">{company.group}</h3>
            <ul className="mt-4 space-y-2.5 text-[15px]">
              {company.groupCompanies.filter((g) => !g.current).map((g) => (
                <li key={g.name}><a href={g.url} target="_blank" rel="noreferrer" className="hover:text-powder">{g.name}</a></li>
              ))}
            </ul>
            <div className="mt-6 flex flex-wrap gap-2">
              {company.social.map((s) => (
                <a key={s.label} href={s.url} target="_blank" rel="noreferrer" className="rounded-full bg-white/10 px-3.5 py-1.5 text-xs text-white/80 hover:bg-white/15">{s.label}</a>
              ))}
            </div>
          </div>
        </div>
        <div className="container-x flex flex-col gap-2 border-t border-white/10 py-6 text-xs text-white/45 sm:flex-row sm:justify-between">
          <span>© {new Date().getFullYear()} Ray Realty · {company.group}. All rights reserved.</span>
          <span>Prices are indicative and subject to change. Always verify deeds before purchase.</span>
        </div>
      </div>
    </footer>
  );
}
