//Install app-shell in precache
self.addEventListener("install", event => {
  event.waitUntil(
    caches.open("app-shell").then(cache => {
      return cache.add("/");
    })
  );
});

// self.addEventListener("install", event => {
//   // Get API URL passed as query parameter to service worker
//   //const preInstallUrl = new URL(location).searchParams.get("preInstallUrl");

//   // Fetch precaching URLs and attach them to the cache list
//   const assetsLoaded = fetch("https://api.myjson.com/bins/u25w0")
//     .then(response => response.json())
//     .then(values => {
//       Object.keys(values.urls).forEach(key => {
//         precacheController.addToCacheList([values.urls[key]]);
//       });
//     })
//     .then(() => {
//       // After all assets are added install them
//       precacheController.install();
//     });
//   event.waitUntil(assetsLoaded);
// });

//https://www.smashingmagazine.com/2019/06/pwa-webpack-workbox/

if (workbox) {
  console.log("Workbox is loaded");
  workbox.precaching.precacheAndRoute(self.__precacheManifest);
  // workbox.routing.registerRoute(
  //   new RegExp("^https:\\/\\/api\\.myjson\\.com\\/bins\\/"),
  //   new workbox.strategies.NetworkFirst({
  //     cacheName: "api-cache",
  //     plugins: [
  //       new workbox.cacheableResponse.Plugin({
  //         statuses: [0, 200]
  //       }),
  //       new workbox.expiration.Plugin({
  //         maxEntries: 50,
  //         maxAgeSeconds: 10 * 24 * 60 * 60, //10 dage
  //         purgeOnQuotaError: true
  //       })
  //     ]
  //   })
  // );
  workbox.routing.registerRoute(
    /^https:\/\/api\.myjson\.com\/bins\//,
    workbox.strategies.StaleWhileRevalidate({
      cacheName: "api-cache",
      plugins: [
        new workbox.cacheableResponse.Plugin({ statuses: [0, 200] }),
        new workbox.expiration.Plugin({ maxEntries: 600 })
      ]
    }),
    "GET"
  );
} else {
  console.log("Workbox didn't load");
}
