import clsx from 'clsx';

/**
 * Logo-blue artwork used wherever a photo would go but none exists yet
 * (fresh launch, no listings). Survey-map feel: contour lines, land plots and a location pin.
 */
export default function BrandArt({ className, variant = 'plots', children }) {
  return (
    <div className={clsx('relative overflow-hidden bg-navy text-white', className)}>
      <svg className="absolute inset-0 h-full w-full" viewBox="0 0 800 600" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
        <defs>
          <radialGradient id="ba-glow" cx="70%" cy="30%" r="70%">
            <stop offset="0" stopColor="#3B47A6" stopOpacity=".55" />
            <stop offset="1" stopColor="#00084C" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="ba-plot" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#ffffff" stopOpacity=".16" />
            <stop offset="1" stopColor="#ffffff" stopOpacity=".04" />
          </linearGradient>
        </defs>
        <rect width="800" height="600" fill="url(#ba-glow)" />
        {/* contour lines */}
        <g fill="none" stroke="#ffffff" strokeOpacity=".09" strokeWidth="1.2">
          {Array.from({ length: 14 }, (_, i) => (
            <path key={i} d={`M-50 ${120 + i * 38} C 150 ${60 + i * 40}, 300 ${200 + i * 30}, 470 ${130 + i * 36} S 760 ${70 + i * 42}, 860 ${150 + i * 34}`} />
          ))}
        </g>
        {variant === 'plots' && (
          <g transform="translate(400 330) rotate(-14)">
            {[
              [-210, -90, 130, 90], [-70, -90, 110, 90], [50, -90, 150, 90],
              [-210, 10, 90, 110], [-110, 10, 150, 110], [50, 10, 70, 110], [130, 10, 70, 110],
            ].map(([x, y, w, h], i) => (
              <rect key={i} x={x} y={y} width={w} height={h} rx="10" fill={i === 4 ? '#ffffff' : 'url(#ba-plot)'} fillOpacity={i === 4 ? 0.95 : 1} stroke="#ffffff" strokeOpacity=".28" />
            ))}
            {/* road */}
            <path d="M-260 0 H 260" stroke="#ffffff" strokeOpacity=".35" strokeWidth="2" strokeDasharray="10 10" />
            {/* pin on the highlighted plot */}
            <g transform="translate(-35 30)">
              <path d="M0 -58 c-17 0 -30 13 -30 30 c0 22 30 50 30 50 s30 -28 30 -50 c0 -17 -13 -30 -30 -30z" fill="#C4000F" />
              <circle cx="0" cy="-28" r="10" fill="#ffffff" />
            </g>
          </g>
        )}
      </svg>
      {children && <div className="relative h-full">{children}</div>}
    </div>
  );
}
