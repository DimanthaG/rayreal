import { Mail, MapPin, Phone } from 'lucide-react';
import Seo from '../components/Seo';
import ContactBlock from '../components/ContactBlock';
import { WhatsAppIcon } from '../components/ui';
import { useProperties } from '../hooks/useProperties';
import { company, config } from '../config';
import { telLink, whatsappLink } from '../lib/whatsapp';
import { prettyPhone } from '../components/Footer';

export default function ContactPage() {
  const { items } = useProperties();
  const cover = items.find((p) => p.images?.length)?.images[0].url;
  const pretty = prettyPhone;
  return (
    <>
      <Seo title="Contact us" path="/contact" description="Call, WhatsApp or visit Ray Realty at 86, Old Kottawa Road, Mirihana, Nugegoda." />
      <section className="container-x pb-14 pt-14 sm:pt-20">
        <span className="eyebrow">Contact</span>
        <h1 className="display mt-3 max-w-3xl text-[38px] leading-[1.05] sm:text-6xl">Let's find the right property, <span className="soft">together.</span></h1>
        <div className="mt-12 grid gap-4 md:grid-cols-3">
          <a href={whatsappLink()} target="_blank" rel="noreferrer" className="rounded-[1.75rem] bg-[#E7F8EE] p-7 transition hover:shadow-soft">
            <WhatsAppIcon className="h-6 w-6 text-[#128C4B]" />
            <div className="mt-10 text-xl font-light">WhatsApp</div>
            <div className="text-sm text-muted">Fastest reply — usually within hours</div>
            <div className="mt-3 text-[15px] text-[#128C4B]">{pretty(config.phone)}</div>
          </a>
          <div className="card p-7">
            <Phone className="h-6 w-6 text-navy" />
            <div className="mt-10 text-xl font-light">Call us</div>
            <ul className="mt-2 space-y-1.5 text-[15px]">
              {company.contacts.map((t) => (
                <li key={t.phone}><a href={telLink(t.phone)} className="text-navy hover:underline">{pretty(t.phone)}</a> <span className="text-sm text-muted">· {t.role}</span></li>
              ))}
              <li><a href={telLink(company.office)} className="text-navy hover:underline">{pretty(company.office)}</a> <span className="text-sm text-muted">· Head office</span></li>
            </ul>
          </div>
          <div className="rounded-[1.75rem] bg-powder p-7">
            <MapPin className="h-6 w-6 text-navy" />
            <div className="mt-10 text-xl font-light">Visit</div>
            <div className="mt-1 text-[15px] text-navy/80">{company.address.join(', ')}</div>
            <a href={`mailto:${config.email}`} className="mt-3 inline-flex items-center gap-2 text-[15px] text-navy hover:underline"><Mail className="h-4 w-4" />{config.email}</a>
          </div>
        </div>
      </section>
      <section className="container-x pb-14">
        <div className="overflow-hidden rounded-4xl">
          <iframe title="Ray Realty office" src="https://maps.google.com/maps?q=86%20Old%20Kottawa%20Road%2C%20Mirihana%2C%20Nugegoda&z=15&output=embed" className="h-[360px] w-full border-0" loading="lazy" />
        </div>
      </section>
      <ContactBlock image={cover} title="Tell us what you're looking for" />
    </>
  );
}
