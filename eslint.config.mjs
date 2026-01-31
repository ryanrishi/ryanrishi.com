import nextCoreWebVitals from 'eslint-config-next/core-web-vitals'
import simpleImportSort from 'eslint-plugin-simple-import-sort'

export default [
  // Next.js recommended flat config + core web vitals rules
  ...nextCoreWebVitals,

  // Project-specific rules
  {
    name: 'custom/project-rules',
    plugins: {
      'simple-import-sort': simpleImportSort,
    },
    rules: {
      // Stylistic consistency (autofixable)
      'comma-dangle': ['error', 'always-multiline'],
      semi: ['error', 'never'],
      'simple-import-sort/imports': ['error'],
      'simple-import-sort/exports': ['error'],

      // Basic hygiene
      'eol-last': 'error',
      'no-trailing-spaces': 'error',

      // Too aggressive for this codebase right now (introduced via newer react-hooks config)
      'react-hooks/set-state-in-effect': 'off',

      // Don’t lint the lint config for this
      'import/no-anonymous-default-export': 'off',
    },
  },
]
