import { defineConfig } from 'cypress'

export default defineConfig({
  fixturesFolder: false,
  e2e: {
    experimentalRunAllSpecs: true,
    // We've imported your old cypress plugins here.
    // You may want to clean this up later by importing these.
    setupNodeEvents(on, config) {
      // Set environment variable to disable analytics during tests
      process.env.CYPRESS = 'true'
      return require('./cypress/plugins/index.js')(on, config)
    },
    baseUrl: 'http://localhost:3000',
    // increase timeouts to accommodate slower page loads and Percy snapshots
    defaultCommandTimeout: 20000,
    pageLoadTimeout: 60000,
  },
})
