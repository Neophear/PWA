const path = require("path");

module.exports = {
  chainWebpack: config => {
    const apiClient = process.env.VUE_APP_API_CLIENT; // mock or server
    config.resolve.alias.set(
      "api-client",
      path.resolve(__dirname, `src/api/${apiClient}`)
    );
  },
  pwa: {
    // configure the workbox plugin
    workboxPluginMode: "InjectManifest",
    workboxOptions: {
      // swSrc is required in InjectManifest mode.
      swSrc: "public/service-worker.js"
      // ...other Workbox options...
    }
  }
};
