/* eslint-env node */

module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  extends: [
    'eslint:recommended',
    'airbnb',
    'plugin:react/recommended'
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 12,
    sourceType: 'module'
  },
  plugins: [
    'react'
  ],
  rules: {
    'react/react-in-jsx-scope': 'off',
    'react/prop-types': 'off',
    'react/jsx-filename-extension': 'off',
    'comma-dangle': ['error', 'never'],
    'object-curly-newline': 'off',
    'react/destructuring-assignment': 'warn',
    'max-len': ['warn', 120],
    'no-plusplus': ['warn', { allowForLoopAfterthoughts: true }]
  }
};
