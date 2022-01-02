const plugin = require('tailwindcss/plugin')
const colors = require('tailwindcss/colors')

const generatePurgeCssSafelist = () => {
  // keep these in sync with styles in components/callout.js
  const calloutColors = ['green', 'blue', 'yellow', 'red']
  const textStyles = calloutColors.map(color => `text-${color}-800`)
  const backgroundStyles = calloutColors.map(color => `bg-${color}-100`)
  const borderStyles = calloutColors.map(color => `border-${color}-800`)

  const darkModeBackgroundStyles = calloutColors.map(color => `dark:bg-${color}-800`)
  const darkModeTextStyles = calloutColors.map(color => `dark:text-${color}-100`)
  const darkModeBorderStyles = calloutColors.map(color => `dark:border-${color}-300`)

  return [...textStyles, ...borderStyles, ...backgroundStyles, ...darkModeBackgroundStyles, ...darkModeTextStyles, ...darkModeBorderStyles]
}

module.exports = {
  content: [
    'components/**/*.tsx',
    'layouts/**/*.tsx',
    'pages/**/*.{tsx,md}',
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
