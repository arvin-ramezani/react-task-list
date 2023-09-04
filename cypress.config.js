const { defineConfig } = require("cypress");
const webpackConfig = require("./webpack.config");

module.exports = defineConfig({
  component: {
    devServer: {
      framework: "react",
      bundler: "webpack",
      // optionally pass in webpack config
      webpackConfig,
      // or a function - the result is merged with any
      // webpack.config that is found
      webpackConfig: async () => {
        // ... do things ...
        const modifiedConfig = await injectCustomConfig(baseConfig);
        return modifiedConfig;
      },
    },
  },

  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
