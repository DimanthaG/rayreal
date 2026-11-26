import { useState } from 'react';
import { Phone, Send } from 'lucide-react';
import { Img, Reveal } from './ui';
import BrandArt from './BrandArt';
import { DISTRICTS, PRICE_RANGES } from '../lib/options';
import { config } from '../config';
import { telLink, toIntl } from '../lib/whatsapp';

/**
 * Lead form. Sends the enquiry to the sales team on WhatsApp, pre-filled,
 * so leads arrive where the team already works (no inbox to monitor).
 */
export default function ContactBlock({ image, title = 'Start your property search with clarity' }) {
  const [form, setForm] = useState({ name: '', phone: '', district: '', budget: '', goal: 'Buy land', message: '' });
  const [error, setError] = useState('');
  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const submit = (e) => {
    e.preventDefault();
    if (!form.name.trim() || form.phone.replace(/\D/g, '').length < 9) {
      setError('Please add your name and a phone number we can reach you on.');
      return;
    }
    setError('');
    const text = [
      'Hello Ray Realty, I would like help finding a property.',
      '',
      `👤 ${form.name}`,
      `📞 ${form.phone}`,
      `🎯 ${form.goal}`,
      form.district && `📍 Area: ${form.district}`,
      form.budget && `💰 Budget: ${form.budget}`,
      form.message && `📝 ${form.message}`,
    ].filter(Boolean).join('\n');
    window.open(`https://wa.me/${toIntl(config.whatsapp)}?text=${encodeURIComponent(text)}`, '_blank', 'noopener');
  };

  return (
    <section className="container-x pb-6" id="contact">
      <div className="grid gap-4 lg:grid-cols-[minmax(0,1.25fr)_minmax(0,1fr)]">
        <Reveal className="relative min-h-[420px] overflow-hidden rounded-4xl">
          {image ? (
            <>
              <Img src={image} alt="" w={1400} className="absolute inset-0" />
              <div className="absolute inset-0 bg-gradient-to-b from-navy-900/75 via-navy-900/35 to-navy-900/10" />
            </>
          ) : (
            <BrandArt className="absolute inset-0" />
          )}
          <div className="relative p-7 text-white sm:p-10">
            <h2 className="max-w-md text-[32px] font-light leading-[1.08] tracking-tight sm:text-[42px]">{title}</h2>
            <p className="mt-4 max-w-sm text-[15px] text-white/75">Tell us your budget and area. We reply with a shortlist that fits — no pressure, no spam.</p>
            <a href={telLink()} className="btn mt-6 bg-white text-ink">
              <span className="btn-icon bg-navy text-white"><Phone className="h-3.5 w-3.5" /></span>
              {config.phone.replace(/^\+94(\d{2})(\d{3})(\d{4})$/, '+94 $1 $2 $3')}
            </a>
          </div>
        </Reveal>

        <Reveal delay={100} as="form" onSubmit={submit} className="card flex flex-col gap-3 p-6 sm:p-8" noValidate>
          <span className="text-[13px] text-muted">Request a personalised shortlist</span>
          <input className="field" placeholder="Full name" value={form.name} onChange={set('name')} autoComplete="name" />
          <input className="field" placeholder="Phone / WhatsApp number" value={form.phone} onChange={set('phone')} autoComplete="tel" inputMode="tel" />
          <div className="grid grid-cols-2 gap-3">
            <select className="field" value={form.district} onChange={set('district')} aria-label="Preferred district">
              <option value="">Preferred area</option>
              {DISTRICTS.map((d) => <option key={d}>{d}</option>)}
            </select>
            <select className="field" value={form.budget} onChange={set('budget')} aria-label="Budget">
              <option value="">Budget</option>
              {PRICE_RANGES.slice(1).map((r) => <option key={r.label}>{r.label}</option>)}
            </select>
          </div>
          <select className="field" value={form.goal} onChange={set('goal')} aria-label="What are you looking for?">
            {['Buy land', 'Buy a house', 'Commercial property', 'Investment / estate', 'Sell my property'].map((g) => <option key={g}>{g}</option>)}
          </select>
          <textarea className="field min-h-[96px] resize-none" placeholder="Anything else — timeline, road width, must-haves…" value={form.message} onChange={set('message')} />
          {error && <p className="text-sm text-brand-red" role="alert">{error}</p>}
          <button type="submit" className="btn-navy mt-1 self-start">
            <span className="btn-icon"><Send className="h-3.5 w-3.5" /></span>
            Send on WhatsApp
          </button>
          <span className="text-xs text-muted">We usually reply within a few hours.</span>
        </Reveal>
      </div>
    </section>
  );
}
