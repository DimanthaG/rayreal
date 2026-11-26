import { useLocation } from 'react-router-dom';
import { WhatsAppIcon } from './ui';
import { whatsappLink } from '../lib/whatsapp';

/** Floating WhatsApp button. Property pages render their own pre-filled version. */
export default function WhatsAppFab() {
  const { pathname } = useLocation();
  if (pathname.startsWith('/property/')) return null;
  return (
    <a
      href={whatsappLink()}
      target="_blank"
      rel="noreferrer"
      aria-label="Chat with Ray Realty on WhatsApp"
      className="fixed bottom-5 right-5 z-30 grid h-14 w-14 place-items-center rounded-full bg-[#25D366] text-white shadow-lift transition hover:scale-105"
    >
      <WhatsAppIcon className="h-7 w-7" />
    </a>
  );
}
