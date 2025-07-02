import type { Config } from 'tailwindcss'
import colors from 'tailwindcss/colors'

const config: Config = {
  content: [
    'app/**/*.tsx',
    'app/**/*.mdx',
    'components/**/*.tsx',
    'layouts/**/*.tsx',
  ],
  darkMode: 'class',
  theme: {
    container: {
      center: true,
    },
    extend: {
      colors: {
        teal: colors.teal,
        valencia: {
          DEFAULT: '#D33A2C',
          50: '#FBEBEA',
          100: '#F6D8D5',
          200: '#EDB0AB',
          300: '#E58980',
          400: '#DC6156',
          500: '#D33A2C',
          600: '#A92E23',
          700: '#7F231A',
          800: '#541712',
          900: '#2A0C09',
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}

export default config

