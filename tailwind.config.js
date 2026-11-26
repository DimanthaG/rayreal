/** Ray Realty design tokens — calm, airy layout (reference: Dubai Prime) built on the logo blue #00084C. */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: { sans: ['"Inter Tight"', 'ui-sans-serif', 'system-ui', 'sans-serif'] },
      colors: {
        navy: { DEFAULT: '#00084C', 950: '#00041F', 900: '#00052F', 800: '#00084C', 700: '#111B6E', 600: '#25308C', 500: '#3B47A6', 400: '#6C76C4' },
        ink: '#12152B',
        powder: { DEFAULT: '#D2D6F1', soft: '#E6E8F7' },
        ice: '#F3F4FB',
        sand: '#F5F3EF',
        brand: { red: '#C4000F', redSoft: '#FBE5E7' },
        muted: '#6B7088',
        line: '#E6E8F0',
      },
      borderRadius: { '4xl': '2rem' },
      boxShadow: {
        soft: '0 1px 2px rgba(18,21,43,.04), 0 8px 24px -12px rgba(18,21,43,.12)',
        lift: '0 2px 4px rgba(18,21,43,.04), 0 24px 48px -20px rgba(0,8,76,.28)',
      },
      letterSpacing: { tightest: '-0.045em' },
      keyframes: {
        rise: { '0%': { opacity: 0, transform: 'translateY(16px)' }, '100%': { opacity: 1, transform: 'none' } },
        fade: { '0%': { opacity: 0 }, '100%': { opacity: 1 } },
      },
      animation: { rise: 'rise .7s cubic-bezier(.2,.7,.2,1) both', fade: 'fade .4s ease both' },
    },
  },
  plugins: [],
};
