const plugin = require('tailwindcss/plugin');

const generatePurgeCssSafelist = () => {
  // keep these in sync with styles in components/callout.js
  const calloutColors = ['green', 'blue', 'yellow', 'red'];
  const textStyles = calloutColors.map((color) => `text-${color}-800`);
  const borderStyles = calloutColors.map((color) => `border-${color}-800`);
  const backgroundStyles = calloutColors.map((color) => `bg-${color}-100`);

  return [...textStyles, ...borderStyles, ...backgroundStyles];
};

module.exports = {
  purge: {
    content: [
      'components/**/*.js',
      'layouts/**/*.js',
      'pages/**/*.{js,md}'
    ],
    options: {
      safelist: generatePurgeCssSafelist()
    }
  },
  darkMode: false, // or 'media' or 'class'
  theme: {
    container: {
      center: true
    },
    extend: {
      colors: {
        primary: {
          50: '#10210b10c',
          100: '#fcf3f2',
          200: '#f2c4c0',
          300: '#e89991',
          400: '#de695f',
          500: '#d33a2c',
          600: '#a92e23',
          700: '#7f231a',
          800: '#541712',
          900: '#2a0c09'
        }
      }
    }
  },
  variants: {
    extend: {}
  },
  plugins: [
    plugin(({ addBase, theme }) => {
      addBase({
        h1: { fontSize: theme('fontSize.4xl') },
        h2: { fontSize: theme('fontSize.3xl') },
        h3: { fontSize: theme('fontSize.2xl') },
        h4: { fontSize: theme('fontSize.xl') },
        h5: { fontSize: theme('fontSize.lg') },
        h6: { fontSize: theme('fontSize.xs') }
      });
    })
  ]
};
