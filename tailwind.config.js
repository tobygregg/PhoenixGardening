/** @type {import('tailwindcss').Config} */
// ─────────────────────────────────────────────────────────────
//  Phoenix Gardening GSY – Tailwind config
//  Brand colours live here. Change a hex value, run `npm run build`,
//  and it updates everywhere on the site.
// ─────────────────────────────────────────────────────────────
module.exports = {
  content: ['./*.html', './assets/js/**/*.js'],
  theme: {
    extend: {
      colors: {
        forest: { DEFAULT: '#173d1c', 900: '#0f2a13', 800: '#173d1c', 700: '#1c4f20' }, // deep brand green (text + dark sections)
        fern:   { DEFAULT: '#2f7a2a', 600: '#2f7a2a', 500: '#3b8a33' },                  // mid green
        leaf:   { DEFAULT: '#6aa531', 300: '#a9cf78', 100: '#dcebc6' },                  // flyer leaf green
        lime:   { DEFAULT: '#9bd136' },                                                  // the green from the phoenix t-shirt
        mist:   { DEFAULT: '#eef1e8', 50: '#f6f8f2', 200: '#e1e7d6' },                   // page background (sage white)
        moss:   { DEFAULT: '#55624f' },                                                  // muted body text
      },
      fontFamily: {
        display: ['Fraunces', 'Georgia', 'serif'],
        sans: ['Manrope', 'system-ui', 'sans-serif'],
      },
      maxWidth: { site: '76rem' },
      borderRadius: { arch: '999px 999px 2rem 2rem' },
      boxShadow: {
        soft: '0 1px 2px rgba(23,61,28,.06), 0 12px 32px -12px rgba(23,61,28,.22)',
        ring: '0 0 0 6px #fff, 0 18px 30px -14px rgba(23,61,28,.45)',
      },
      keyframes: {
        spinSlow: { to: { transform: 'rotate(360deg)' } },
        marquee: { to: { transform: 'translateX(-50%)' } },
      },
      animation: {
        'spin-slow': 'spinSlow 28s linear infinite',
        marquee: 'marquee 40s linear infinite',
      },
    },
  },
  plugins: [],
};
