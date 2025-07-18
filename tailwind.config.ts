import type { Config } from 'tailwindcss'
import colors from 'tailwindcss/colors'

const generatePurgeCssSafelist = () => {
  // keep these in sync with styles in components/callout.js
  const calloutColors = ['green', 'blue', 'yellow', 'red']
  const safelistColors = ['slate', ...calloutColors]

  const textStyles = safelistColors.map(color => `text-${color}-800`)
  const backgroundStyles = safelistColors.map(color => `bg-${color}-100`)
  const borderStyles = safelistColors.map(color => `border-${color}-800`)

  const darkModeBackgroundStyles = safelistColors.map(color => `dark:bg-${color}-800`)
  const darkModeTextStyles = [
    ...safelistColors.map(color => `dark:text-${color}-600`),
    ...safelistColors.map(color => `dark:text-${color}-50`),
  ]
  const darkModeBorderStyles = safelistColors.map(color => `dark:border-${color}-300`)

  return [...textStyles, ...borderStyles, ...backgroundStyles, ...darkModeBackgroundStyles, ...darkModeTextStyles, ...darkModeBorderStyles]
}

const config: Config = {
  content: [
    'app/**/*.tsx',
    'app/**/*.mdx',
    'components/**/*.tsx',
    'layouts/**/*.tsx',
  ],
  safelist: generatePurgeCssSafelist(),
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
  variants: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}

export default config

