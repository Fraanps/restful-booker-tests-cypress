const {defineConfig} = require('cypress')

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://restful-booker.herokuapp.com',
    setupNodeEvents(on, config) {
    },
    env: {
      requestMode: true,
      auth_url: '/auth',
      booking_url: '/booking'

    }
  },


});