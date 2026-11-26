import { config } from '../config';
import { locationLabel, priceParts, propertyPath } from './format';

const digits = (n) => String(n || '').replace(/\D/g, '');

/** Normalises a Sri Lankan number (077…, +94 77…, 94…) to 9477…  */
export function toIntl(n) {
  let d = digits(n);
  if (d.startsWith('0')) d = `94${d.slice(1)}`;
  if (d.length === 9) d = `94${d}`;
  return d || config.whatsapp;
}

export function propertyUrl(p) {
  return `${config.siteUrl}${config.hashRouter ? '/#' : ''}${propertyPath(p)}`;
}

export function inquiryMessage(p) {
  const price = priceParts(p);
  return [
    "Hello Ray Realty, I'm interested in this property:",
    '',
    `🏡 ${p.title}`,
    `📍 ${locationLabel(p) || p.address || 'Sri Lanka'}`,
    `💰 ${price.main}${price.unit ? ` ${price.unit}` : ''}`,
    `🔖 Ref: ${p.refId}`,
    `🔗 ${propertyUrl(p)}`,
    '',
    'Could you share more details and arrange a visit?',
  ].join('\n');
}

export function whatsappLink(p, number) {
  const to = toIntl(number || p?.whatsapp || config.whatsapp);
  const text = p ? inquiryMessage(p) : "Hello Ray Realty, I'd like to know more about your properties.";
  return `https://wa.me/${to}?text=${encodeURIComponent(text)}`;
}

export function telLink(number) {
  return `tel:+${toIntl(number || config.phone)}`;
}
