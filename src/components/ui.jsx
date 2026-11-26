import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import clsx from 'clsx';
import { statusLabel } from '../lib/format';
import { cld, cldSrcSet } from '../lib/image';

export function Logo({ light = false, className = 'h-8' }) {
  return (
    <img
      src={`${import.meta.env.BASE_URL}${light ? 'logo-light.png' : 'logo.png'}`}
      alt="Ray Realty"
      className={clsx('w-auto select-none', className)}
      width="900"
      height="277"
      draggable="false"
    />
  );
}

export function WhatsAppIcon({ className = 'h-4 w-4' }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M17.47 14.38c-.3-.15-1.75-.86-2.02-.96-.27-.1-.47-.15-.67.15-.2.3-.77.96-.94 1.16-.17.2-.35.22-.64.07-.3-.15-1.25-.46-2.38-1.47-.88-.79-1.47-1.76-1.65-2.06-.17-.3-.02-.46.13-.6.13-.14.3-.35.45-.52.15-.18.2-.3.3-.5.1-.2.05-.37-.03-.52-.07-.15-.67-1.6-.92-2.2-.24-.58-.49-.5-.67-.5h-.57c-.2 0-.52.07-.8.37-.27.3-1.04 1.02-1.04 2.48 0 1.47 1.07 2.88 1.21 3.08.15.2 2.1 3.2 5.08 4.49.71.3 1.26.49 1.7.63.71.22 1.36.19 1.87.12.57-.09 1.75-.72 2-1.41.25-.7.25-1.29.17-1.41-.07-.13-.27-.2-.57-.35zM12.05 21.5h-.01a9.4 9.4 0 0 1-4.8-1.32l-.34-.2-3.57.94.95-3.48-.22-.36a9.43 9.43 0 1 1 7.99 4.42zm8.02-17.45A11.32 11.32 0 0 0 12.04.75C5.8.75.73 5.82.73 12.06c0 2 .52 3.94 1.51 5.65L.64 23.25l5.67-1.49a11.3 11.3 0 0 0 5.73 1.46h.01c6.24 0 11.31-5.07 11.31-11.31 0-3.02-1.18-5.86-3.3-7.86z" />
    </svg>
  );
}

/** Lazy image with a soft skeleton and a graceful fallback when the source is broken. */
/** w = display width in CSS px; Cloudinary photos are fetched at that size (2× for sharp screens) as WebP/AVIF. */
export function Img({ src, alt = '', className, imgClassName, eager = false, sizes, w = 1200 }) {
  const [state, setState] = useState(src ? 'loading' : 'error');
  useEffect(() => {
    setState(src ? 'loading' : 'error');
  }, [src]);
  return (
    <div className={clsx(!/\b(absolute|fixed)\b/.test(className || '') && 'relative', 'overflow-hidden bg-ice', className)}>
      {state === 'loading' && <div className="absolute inset-0 animate-pulse bg-gradient-to-br from-ice to-powder-soft" />}
      {state === 'error' ? (
        <div className="absolute inset-0 grid place-items-center bg-gradient-to-br from-ice to-powder-soft">
          <img src={`${import.meta.env.BASE_URL}logo.png`} alt="" className="w-1/3 opacity-25" />
        </div>
      ) : (
        <img
          src={cld(src, w)}
          srcSet={sizes ? cldSrcSet(src) : undefined}
          alt={alt}
          sizes={sizes}
          loading={eager ? 'eager' : 'lazy'}
          decoding="async"
          referrerPolicy="no-referrer"
          onLoad={() => setState('ok')}
          onError={() => setState('error')}
          className={clsx('h-full w-full object-cover transition-opacity duration-500', state === 'ok' ? 'opacity-100' : 'opacity-0', imgClassName)}
        />
      )}
    </div>
  );
}

export function StatusBadge({ status, className }) {
  const s = status || 'available';
  return (
    <span
      className={clsx(
        'chip',
        s === 'available' && 'bg-white/95 text-navy',
        s === 'reserved' && 'bg-amber-100 text-amber-800',
        s === 'sold' && 'bg-brand-red text-white',
        className,
      )}
    >
      <span className={clsx('h-1.5 w-1.5 rounded-full', s === 'available' && 'bg-emerald-500', s === 'reserved' && 'bg-amber-500', s === 'sold' && 'bg-white')} />
      {statusLabel(s)}
    </span>
  );
}

/** Adds .is-in when the element scrolls into view. */
export function Reveal({ as: Tag = 'div', className, delay = 0, children, ...rest }) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          el.classList.add('is-in');
          io.disconnect();
        }
      },
      { rootMargin: '0px 0px -8% 0px' },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <Tag ref={ref} className={clsx('reveal', className)} style={{ transitionDelay: `${delay}ms` }} {...rest}>
      {children}
    </Tag>
  );
}

export function SectionHead({ eyebrow, title, soft, children, className, action }) {
  return (
    <div className={clsx('flex flex-col gap-6 md:flex-row md:items-end md:justify-between', className)}>
      <div className="max-w-3xl">
        {eyebrow && <span className="eyebrow">{eyebrow}</span>}
        <h2 className="display mt-3 text-[34px] leading-[1.05] sm:text-5xl">
          {title} {soft && <span className="soft">{soft}</span>}
        </h2>
        {children && <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-muted">{children}</p>}
      </div>
      {action}
    </div>
  );
}

export function ArrowLink({ to, children, className }) {
  return (
    <Link to={to} className={clsx('btn-ghost', className)}>
      <span className="btn-icon">
        <svg viewBox="0 0 16 16" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M4.5 11.5l7-7M5.5 4.5h6v6" /></svg>
      </span>
      {children}
    </Link>
  );
}

export function EmptyState({ title, children, action }) {
  return (
    <div className="card mx-auto max-w-lg px-8 py-14 text-center">
      <div className="mx-auto mb-5 grid h-14 w-14 place-items-center rounded-full bg-ice text-navy">
        <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M3 11l9-7 9 7v9a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1z" /></svg>
      </div>
      <h3 className="text-xl font-normal">{title}</h3>
      {children && <p className="mt-2 text-sm text-muted">{children}</p>}
      {action && <div className="mt-6">{action}</div>}
    </div>
  );
}
