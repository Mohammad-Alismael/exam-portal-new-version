const { defineConfig } = require("cypress");
const axios = require("axios");
const loginPlugin = require("./cypress/plugins/loginPlugin");
const testDataApiEndpoint = "http://localhost:8080";
module.exports = defineConfig({
  projectId: "vsnrkh",
  viewportWidth: 1280,
  viewportHeight: 800,

  e2e: {
    chromeWebSecurity: false,
    permissions: {
      clipboardWrite: true,
      clipboardRead: true,
    },
    taskTimeout: 20000,
    defaultCommandTimeout: 8000,
    testIsolation: false,
    baseUrl: "http://localhost:3000",
    watchForFileChanges: false,
    setupNodeEvents(on, config) {
      on("task", {
        async "db:seed"() {
          // Send request to backend API to re-seed database with test data
          const { data } = await axios.post(
            `${testDataApiEndpoint}/test/reset-db`
          );
          return data;
        },
        loginWithUserData: () => {
          return loginPlugin.loginWithUserData();
        },
      });
    },
  },

  component: {
    devServer: {
      framework: "create-react-app",
      bundler: "webpack",
    },
  },
});
