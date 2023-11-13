import type { Config } from 'tailwindcss'
import colors from 'tailwindcss/colors'
import plugin from 'tailwindcss/plugin'

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
    'components/**/*.tsx',
    'layouts/**/*.tsx',
    'blog/*.md',
    'projects/*.md',
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
    plugin(({ addBase, theme }) => {
      addBase({
        h1: { fontSize: theme('fontSize.4xl') },
        h2: { fontSize: theme('fontSize.3xl') },
        h3: { fontSize: theme('fontSize.2xl') },
        h4: { fontSize: theme('fontSize.xl') },
        h5: { fontSize: theme('fontSize.lg') },
        h6: { fontSize: theme('fontSize.xs') },
      })
    }),
  ],
}

export default config

