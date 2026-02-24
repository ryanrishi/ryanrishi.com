import nextConfig from 'eslint-config-next'
import cypressPlugin from 'eslint-plugin-cypress'

const eslintConfig = [
  ...nextConfig,
  cypressPlugin.configs.recommended,
]

export default eslintConfig
