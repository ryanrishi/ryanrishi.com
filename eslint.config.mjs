import nextConfig from 'eslint-config-next'
import cypressPlugin from 'eslint-plugin-cypress/flat'

const eslintConfig = [
  ...nextConfig,
  cypressPlugin.configs.recommended,
]

export default eslintConfig
