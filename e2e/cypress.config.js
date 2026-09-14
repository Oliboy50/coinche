const { defineConfig } = require('cypress');

module.exports = defineConfig({
  expose: {
    E2E_ENV: process.env.CYPRESS_E2E_ENV,
  },
  e2e: {
    baseUrl: 'http://localhost:3000',
    specPattern: 'src/integration/**/*.spec.js',
    supportFile: 'src/support/index.js',
    fixturesFolder: 'src/fixtures',
    screenshotsFolder: 'src/screenshots',
    videosFolder: 'src/videos',
    video: false,
    watchForFileChanges: false,
    setupNodeEvents() {
      return undefined;
    },
  },
});
