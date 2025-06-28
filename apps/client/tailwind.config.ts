import { type Config } from 'tailwindcss'
import defaultColors from 'tailwindcss/colors'
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      zIndex: {
        1: '1',
        2: '2',
        99: '99',
        999: '999',
      },
      borderWidth: {
        1: '1px',
      },
      spacing: {
        15: '3.75rem',
      },
    },
    colors: {
      ...defaultColors,
    },
  },
  plugins: [ ],
} satisfies Config
