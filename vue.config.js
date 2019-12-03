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
    themeColor: "#aeaecf",
    appleMobileWebAppCapable: "yes",
    // appleMobileWebAppStatusBarStyle: "black",
    iconPaths: {
      favicon32: "img/icons/icon-32x32.png",
      favicon16: "img/icons/icon-16x16.png",
      appleTouchIcon: "img/icons/icon-152x152.png",
      maskIcon: "img/icons/icon.svg",
      msTileImage: "img/icons/icon-144x144.png"
    },
    // configure the workbox plugin
    workboxPluginMode: "InjectManifest",
    workboxOptions: {
      // swSrc is required in InjectManifest mode.
      swSrc: "public/service-worker.js",
      // ...other Workbox options...
      exclude: [/\.config$/]
    }
  }
};
