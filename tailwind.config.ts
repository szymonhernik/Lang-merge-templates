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
    },
  },
  plugins: [require('@tailwindcss/typography')],
}

export default config
