require('dotenv').config();

const { defineConfig } = require("cypress");

module.exports = defineConfig({
  reporter: 'cypress-mochawesome-reporter',

  reporterOptions: {
    charts: true,
    reportPageTitle: 'Cypress Test Report',
    embeddedScreenshots: true,
    inlineAssets: true,
    saveAllAttempts: false,
  },
  
  e2e: {
    setupNodeEvents(on, config) {

    config.env.username = process.env.USERNAME_JPETSTORE;
    config.env.password = process.env.PASSWORD;
    config.baseUrl = process.env.BASE_URL;

      return config;
    },
  },
});