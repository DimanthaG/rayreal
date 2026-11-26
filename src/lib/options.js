/** Photos per listing (matches the API). The first photo is the cover. */
export const MAX_PHOTOS = 5;

export const DISTRICTS = [
  'Colombo', 'Gampaha', 'Kalutara', 'Kandy', 'Matale', 'Nuwara Eliya', 'Galle', 'Matara',
  'Hambantota', 'Jaffna', 'Kilinochchi', 'Mannar', 'Vavuniya', 'Mullaitivu', 'Batticaloa',
  'Ampara', 'Trincomalee', 'Kurunegala', 'Puttalam', 'Anuradhapura', 'Polonnaruwa', 'Badulla',
  'Monaragala', 'Ratnapura', 'Kegalle',
];

export const PROPERTY_TYPES = ['Land', 'House', 'Villa', 'Apartment', 'Commercial Building', 'Hotel', 'Estate'];

export const LAND_USES = ['Residential', 'Commercial', 'Agricultural', 'Coconut Estate', 'Tea Estate', 'Paddy', 'Beachfront'];

export const DEED_STATUSES = ['Clear Title (Sinnakkara)', 'Bim Saviya', 'Jayabhoomi / Swarnabhoomi', 'Other'];

export const STATUSES = [
  { value: 'available', label: 'Available' },
  { value: 'reserved', label: 'Reserved' },
  { value: 'sold', label: 'Sold' },
];

export const PRICE_RANGES = [
  { label: 'Any price', min: null, max: null },
  { label: 'Under Rs. 10M', min: null, max: 10e6 },
  { label: 'Rs. 10M – 25M', min: 10e6, max: 25e6 },
  { label: 'Rs. 25M – 50M', min: 25e6, max: 50e6 },
  { label: 'Rs. 50M – 100M', min: 50e6, max: 100e6 },
  { label: 'Rs. 100M – 250M', min: 100e6, max: 250e6 },
  { label: 'Above Rs. 250M', min: 250e6, max: null },
];

export const SIZE_RANGES = [
  { label: 'Any size', min: null, max: null },
  { label: 'Under 10 perches', min: null, max: 10 },
  { label: '10 – 20 perches', min: 10, max: 20 },
  { label: '20 – 40 perches', min: 20, max: 40 },
  { label: '40 – 160 perches', min: 40, max: 160 },
  { label: '1 acre +', min: 160, max: null },
];

export const SORTS = [
  { value: 'newest', label: 'Newest first' },
  { value: 'price-asc', label: 'Price: low to high' },
  { value: 'price-desc', label: 'Price: high to low' },
  { value: 'size-desc', label: 'Largest extent' },
];

export const EMPTY_PROPERTY = {
  title: '',
  description: '',
  address: '',
  city: '',
  district: '',
  propertyType: 'Land',
  landUse: 'Residential',
  extentPerches: null,
  priceTotal: null,
  pricePerPerch: null,
  negotiable: false,
  priceOnRequest: false,
  bedrooms: null,
  bathrooms: null,
  roadAccessFt: null,
  deedStatus: '',
  utilities: { water: false, electricity: false, telephone: false },
  mapUrl: '',
  lat: null,
  lng: null,
  whatsapp: '',
  featured: false,
  status: 'available',
  images: [],
};
