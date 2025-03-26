const {defineConfig} = require('cypress')

module.exports = defineConfig({
  reporter: 'Cypress-mochawesome-reporter',
  reporterOptions: {
    charts: true,
    reporterPageTitle: 'restful-booker-automation-tests',
    embeddedScreenshots: true,
    inlineAssets: true,
    saveAllAttempts: false
  },

  e2e: {
    baseUrl: 'https://restful-booker.herokuapp.com',
    setupNodeEvents(on, config) {
      require('cypress-mochawesome-reporter/plugin')(on);
    },
    env: {
      requestMode: true,
      auth_url: '/auth',
      booking_url: '/booking'
    }
  },


});