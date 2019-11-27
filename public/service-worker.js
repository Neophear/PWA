/* eslint-disable no-console */
/* eslint-disable no-undef */

//Install app-shell in precache
self.addEventListener("install", event => {
  event.waitUntil(
    caches.open("app-shell").then(cache => {
      return cache.add("/");
    })
  );
});

//https://www.smashingmagazine.com/2019/06/pwa-webpack-workbox/

if (workbox) {
  console.log("Workbox is loaded");
  workbox.precaching.precacheAndRoute(self.__precacheManifest);

  workbox.routing.registerRoute(
    /^https:\/\/sem4project\.azurewebsites\.net/,
    new workbox.strategies.StaleWhileRevalidate({
      cacheName: "api-cache",
      plugins: [
        new workbox.cacheableResponse.Plugin({ statuses: [0, 200] }),
        new workbox.expiration.Plugin({ maxEntries: 600 })
      ]
    }),
    "GET"
  );
  workbox.routing.registerRoute(
    /^https:\/\/placekitten\.com/,
    new workbox.strategies.StaleWhileRevalidate({
      cacheName: "img-cache",
      plugins: [new workbox.cacheableResponse.Plugin({ statuses: [0, 200] })]
    }),
    "GET"
  );
} else {
  console.log("Workbox didn't load");
}
