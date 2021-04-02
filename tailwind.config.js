const plugin = require('tailwindcss/plugin');

module.exports = {
  purge: ['components/**/*.js', 'layouts/**/*.js', 'pages/**/*.js'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    container: {
      center: true
    },
    extend: {}
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
