import nextCoreWebVitals from 'eslint-config-next/core-web-vitals'

export default [
  {
    ignores: ['.next/**', 'out/**', 'dist/**'],
  },
  ...nextCoreWebVitals,
  {
    name: 'project/overrides',
    rules: {
      // Existing code relies on this pattern; keep lint from failing.
      'react-hooks/set-state-in-effect': 'off',

      // Allow anonymous default export in this config file.
      'import/no-anonymous-default-export': 'off',
    },
  },
]
