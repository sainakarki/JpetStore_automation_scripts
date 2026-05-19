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

    // Important
    reportDir: 'cypress/reports',
    overwrite: true,
    html: true,
    json: true,
    overwrite: true,
  },

  e2e: {

    setupNodeEvents(on, config) {

      // Mochawesome plugin
      require('cypress-mochawesome-reporter/plugin')(on);

      // Environment variables
      config.env.username = process.env.USERNAME_JPETSTORE;
      config.env.password = process.env.PASSWORD;

      // Base URL
      config.baseUrl = process.env.BASE_URL;

      return config;
    },
  },
});