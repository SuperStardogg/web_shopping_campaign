import { type Config } from 'tailwindcss'
import { fontFamily } from 'tailwindcss/defaultTheme'

export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', ...fontFamily.sans],
      },
      colors: {
        // Optional custom theme overrides
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        destructive: 'hsl(var(--destructive))',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
} satisfies Config
