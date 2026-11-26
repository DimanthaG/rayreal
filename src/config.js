const env = import.meta.env;

export const config = {
  apiBaseUrl: (env.VITE_API_BASE_URL || '').replace(/\/$/, ''),
  siteUrl: (env.VITE_SITE_URL || 'https://www.rayrealtysl.com').replace(/\/$/, ''),
  whatsapp: (env.VITE_WHATSAPP_NUMBER || '94777727527').replace(/\D/g, ''),
  phone: env.VITE_PHONE_NUMBER || '+94777727527',
  email: env.VITE_CONTACT_EMAIL || 'sales@raytronics.lk',
  mapsKey: env.VITE_GOOGLE_MAPS_EMBED_KEY || '',
  hashRouter: env.VITE_HASH_ROUTER === 'true',
  memoryRouter: env.VITE_MEMORY_ROUTER === 'true', // sandboxed previews only
  firebase: {
    apiKey: env.VITE_FIREBASE_API_KEY,
    authDomain: env.VITE_FIREBASE_AUTH_DOMAIN,
    projectId: env.VITE_FIREBASE_PROJECT_ID,
    messagingSenderId: env.VITE_FIREBASE_MESSAGING_SENDER_ID,
    appId: env.VITE_FIREBASE_APP_ID,
  },
};

/** No API URL configured → the site runs on bundled sample data (demo mode). */
export const isDemo = !config.apiBaseUrl;
export const hasFirebase = Boolean(config.firebase.apiKey && config.firebase.projectId);

export const company = {
  name: 'Ray Realty',
  group: 'Raytronics Group',
  groupUrl: 'https://www.raytronics.lk/',
  address: ['86, Old Kottawa Road', 'Mirihana, Nugegoda', 'Sri Lanka'],
  office: '+94112813808',
  // Ray Realty sales contacts
  contacts: [
    { name: 'Dr. K H Lasantha Goonewardena', role: 'Managing Director', phone: '+94777727527' },
    { name: 'Property sales', role: 'Enquiries & site visits', phone: '+94771125807' },
    { name: 'Shamika Chandupa Manikrathne', role: 'Director', phone: '+94726645529' },
  ],
  // Raytronics Group leadership (raytronics.lk/about)
  leadership: [
    { name: 'Dr. K H Lasantha Goonewardena', role: 'Managing Director', note: '30+ years of executive experience; strategic direction and long-term expansion.' },
    { name: 'Shamika Chandupa Manikrathne', role: 'Director', note: 'Global brand positioning, marketing and international events.' },
    { name: 'Dimantha Kalhara Goonewardena', role: 'Director', note: 'Business operations and expansion across Canada.' },
    { name: 'Layani Goonewardena', role: 'Director', note: 'Executive governance and strategic oversight.' },
    { name: 'Dan Yabesh Poddiwela', role: 'Director', note: 'Strategic marketing for Ray Gems & Jewelry.' },
    { name: 'K. Tisokumar', role: 'Director', note: 'Operations, inter-company logistics and stakeholder relations.' },
  ],
  groupCompanies: [
    { name: 'Ray Realty', what: 'Land, homes and commercial property across Sri Lanka', url: null, current: true },
    { name: 'Ray Gems & Jewelry', what: 'Certified Ceylon gemstones and international gem trade', url: 'https://www.raygems.lk/' },
    { name: 'Ray Mart', what: 'Retail tech and e-commerce', url: 'https://www.raymartsl.com/' },
    { name: 'Raytronics Institute', what: 'Global education pathways and tech education', url: 'https://www.raytronics.lk/institute' },
    { name: 'Trade Exhibitions', what: 'International trade expos, including Gem Expo Canada', url: 'https://www.raytronics.lk/register-trade-expo' },
  ],
  social: [
    { label: 'Facebook', url: 'https://www.facebook.com/share/1HU1zpDerz/' },
    { label: 'Instagram', url: 'https://www.instagram.com/raytronics_lanka' },
    { label: 'TikTok', url: 'https://www.tiktok.com/@raytronics_sl' },
  ],
};
