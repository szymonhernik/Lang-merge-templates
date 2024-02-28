// const { theme } = require('@sanity/demo/tailwind')
// const colors = require('tailwindcss/colors')

import type { Config } from 'tailwindcss'
const config: Config = {
  content: ['./app/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  theme: {
    // Overriding fontFamily to use @next/font loaded families
    fontFamily: {
      mono: 'var(--font-mono)',
      sans: 'var(--font-sans)',
      serif: 'var(--font-serif)',
    },
    extend: {
      padding: {
        header: '100px',
        mobileSpace: '20vh',
        desktopSpace: '20vh',
      },
      fontSize: {
        trye: 'clamp(14px, 1vw, 18px)',
      },
      inset: {
        headerSmallSpace: '88px',
      },
      margin: {
        desktopSpace: '30vh',
        mobileSpace: '20vh',
      },
      boxShadow: {
        shadowProject: '-1px 0px 4px 0px rgba(0, 0, 0, 0.25)',
      },
      height: {
        header: '100px',
        headerSmall: '88px',
      },
      screens: {
        '3xl': '1800px',
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
    },
  },
  plugins: [require('@tailwindcss/typography'), require('tailwindcss-animate')],
}

export default config
