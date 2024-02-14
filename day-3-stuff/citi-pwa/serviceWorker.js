// serviceWorker.js 

const citiCache = "citi-app-v1";

const assets = [
  // "/",
  // "/index.html",
  // "/css/style.css",
  // "/js/app.js",
  // "/images/citi-logo.png"
];

self.addEventListener("install", installEvent => {
  installEvent.waitUntil(
    caches.open(citiCache).then(cache => {
      cache.addAll(assets);
    }).then(() => {
      self.skipWaiting();
    })
  );
});

// self.addEventListener("install", installEvent => {
//   installEvent.waitUntil(
//     caches.open(citiCache).then(cache => {
//       cache.addAll(assets);
//     })
//   );
// });


self.addEventListener("fetch", fetchEvent => {
  fetchEvent.respondWith(
    caches.match(fetchEvent.request).then(res => {
      return res || fetch(fetchEvent.request);
    })
  );
});




