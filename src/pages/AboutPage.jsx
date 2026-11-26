import { ArrowUpRight, Award, Compass, Handshake, ShieldCheck } from 'lucide-react';
import Seo from '../components/Seo';
import ContactBlock from '../components/ContactBlock';
import BrandArt from '../components/BrandArt';
import { Reveal } from '../components/ui';
import { company } from '../config';

const initials = (name) => name.replace(/^Dr\.\s*/, '').replace(/^K\.\s*/, '').split(' ').filter(Boolean).map((w) => w[0]).slice(0, 2).join('');

// Group figures from raytronics.lk
const STATS = [
  { v: '1993', k: 'Raytronics Group founded' },
  { v: '30+', k: 'Years of experience' },
  { v: '5+', k: 'Group companies' },
  { v: '10K+', k: 'Clients worldwide' },
];

const VALUES = [
  { icon: ShieldCheck, t: 'Integrity', s: 'Honest prices, honest descriptions and deeds checked before a listing goes live.' },
  { icon: Award, t: 'Quality', s: 'Fewer, better listings — each one something we would show our own family.' },
  { icon: Compass, t: 'Forward-thinking', s: 'Modern tools — clear online listings, maps and instant WhatsApp — for a traditional market.' },
  { icon: Handshake, t: 'Long-term relationships', s: 'Buyers, sellers and investors who come back, and send their friends.' },
];

export default function AboutPage() {
  return (
    <>
      <Seo
        title="About us"
        path="/about"
        description="Ray Realty is the real estate company of the Raytronics Group — a Sri Lankan group founded in 1993 with 30+ years of experience across gems, real estate, education and retail."
      />

      {/* Hero */}
      <section className="container-x pt-4">
        <BrandArt variant="contours" className="rounded-4xl">
          <div className="grid gap-10 px-6 pb-10 pt-14 sm:px-10 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)] lg:items-end lg:px-14 lg:pb-14 lg:pt-20">
            <div>
              <span className="inline-flex items-center gap-2 text-[13px] text-white/70"><span className="h-1.5 w-1.5 rounded-full bg-brand-red" />About Ray Realty</span>
              <h1 className="mt-5 max-w-3xl text-[38px] font-light leading-[1.05] tracking-tightest sm:text-6xl">
                The real estate company of the <span className="text-powder">Raytronics Group.</span>
              </h1>
            </div>
            <p className="max-w-md text-[16px] leading-relaxed text-white/75">
              Raytronics began in 1993 as an IT pioneer and has grown into a multi-sector Sri Lankan group. Ray Realty brings
              the same integrity and quality to land and property — so buying in Sri Lanka feels clear, safe and simple.
            </p>
          </div>
          <div className="grid grid-cols-2 border-t border-white/10 md:grid-cols-4">
            {STATS.map((s, i) => (
              <div key={s.k} className={`px-6 py-7 sm:px-10 ${i ? 'border-white/10 md:border-l' : ''} ${i % 2 ? 'border-l' : ''} ${i > 1 ? 'border-t md:border-t-0' : ''}`}>
                <div className="text-4xl font-light tracking-tight sm:text-5xl">{s.v}</div>
                <div className="mt-1 text-sm text-white/60">{s.k}</div>
              </div>
            ))}
          </div>
        </BrandArt>
      </section>

      {/* Story / vision / mission */}
      <section className="container-x py-20 sm:py-24">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)]">
          <div>
            <span className="eyebrow">Our story</span>
            <h2 className="display mt-3 text-[32px] leading-[1.08] sm:text-[44px]">Three decades of trust, <span className="soft">now in property.</span></h2>
          </div>
          <div className="space-y-5 text-[16px] leading-relaxed text-ink/80">
            <p>
              The Raytronics Group was established in 1993 and has spent more than 30 years building businesses on one foundation:
              integrity, quality and a forward-thinking vision. Today the group connects Sri Lankan potential with global opportunity
              through certified Ceylon gemstones, real estate, global education, retail technology and international trade exhibitions.
            </p>
            <p>
              Ray Realty is the group's real estate arm, based at our head office in Mirihana, Nugegoda. We help families find land for
              their first home, Sri Lankans abroad invest back home, and businesses secure the right frontage — with prices in LKR,
              extent in perches and deed status stated up front.
            </p>
          </div>
        </div>

        <div className="mt-14 grid gap-4 md:grid-cols-2">
          <Reveal className="rounded-[1.75rem] bg-navy p-8 text-white sm:p-10">
            <div className="text-sm text-white/55">Vision</div>
            <p className="mt-6 text-2xl font-light leading-snug tracking-tight sm:text-[28px]">
              To be a premier, highly trusted Sri Lankan group that connects local excellence with global markets.
            </p>
          </Reveal>
          <Reveal delay={80} className="rounded-[1.75rem] bg-powder p-8 text-navy sm:p-10">
            <div className="text-sm text-navy/60">Our mission in real estate</div>
            <p className="mt-6 text-2xl font-light leading-snug tracking-tight sm:text-[28px]">
              Value-driven property, offered honestly — clear numbers, verified titles and a team that picks up the phone.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Values */}
      <section className="container-x pb-20 sm:pb-24">
        <span className="eyebrow">What we stand for</span>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {VALUES.map((v, i) => (
            <Reveal key={v.t} delay={i * 60} className="card p-7">
              <span className="grid h-11 w-11 place-items-center rounded-full bg-ice text-navy"><v.icon className="h-5 w-5" strokeWidth={1.6} /></span>
              <div className="mt-10 text-xl font-light tracking-tight">{v.t}</div>
              <p className="mt-2 text-sm leading-relaxed text-muted">{v.s}</p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Group companies */}
      <section className="container-x pb-20 sm:pb-24">
        <div className="rounded-4xl bg-ice p-6 sm:p-10">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <span className="eyebrow">The {company.group}</span>
              <h2 className="display mt-3 text-[30px] leading-[1.1] sm:text-[40px]">One group, five businesses.</h2>
            </div>
            <a href={company.groupUrl} target="_blank" rel="noreferrer" className="btn-navy self-start">
              <span className="btn-icon"><ArrowUpRight className="h-3.5 w-3.5" /></span>
              Visit raytronics.lk
            </a>
          </div>
          <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
            {company.groupCompanies.map((g) => {
              const inner = (
                <>
                  <div className="flex items-start justify-between gap-2">
                    <span className={`text-[17px] ${g.current ? 'text-white' : 'text-ink'}`}>{g.name}</span>
                    {g.current ? <span className="chip bg-white/15 text-white">You are here</span> : <ArrowUpRight className="h-4 w-4 shrink-0 text-muted transition group-hover:rotate-45 group-hover:text-navy" />}
                  </div>
                  <p className={`mt-8 text-sm leading-relaxed ${g.current ? 'text-white/70' : 'text-muted'}`}>{g.what}</p>
                </>
              );
              return g.current ? (
                <div key={g.name} className="rounded-[1.5rem] bg-navy p-6">{inner}</div>
              ) : (
                <a key={g.name} href={g.url} target="_blank" rel="noreferrer" className="group rounded-[1.5rem] bg-white p-6 transition hover:shadow-soft">{inner}</a>
              );
            })}
          </div>
        </div>
      </section>

      {/* Leadership */}
      <section className="container-x pb-20 sm:pb-24">
        <span className="eyebrow">Leadership</span>
        <h2 className="display mt-3 text-[30px] leading-[1.1] sm:text-[40px]">The people behind the group</h2>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {company.leadership.map((m, i) => (
            <Reveal key={m.name} delay={(i % 3) * 60} className="card flex gap-5 p-6">
              <div className={`grid h-14 w-14 shrink-0 place-items-center rounded-full text-lg font-medium ${i === 0 ? 'bg-navy text-white' : 'bg-powder text-navy'}`}>{initials(m.name)}</div>
              <div>
                <div className="text-[17px] leading-snug">{m.name}</div>
                <div className="text-sm text-navy">{m.role}</div>
                <p className="mt-2 text-sm leading-relaxed text-muted">{m.note}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <ContactBlock title="Talk to the Ray Realty team" />
    </>
  );
}
