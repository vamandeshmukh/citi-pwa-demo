// serviceWorker.js 

const citiCache = "citi-app-v1";

const assets = [
  // "/",
  // "/index.html",
  "/page404.html",
  // "/css/style.css",
  // "/js/app.js",
  // "/images/citi-logo.png"
];

async function precache() {
  console.log('precache');
  const cache = await caches.open(citiCache);
  return cache.addAll(assets);
}

self.addEventListener("install", installEvent => {
  console.log('install');
  installEvent.waitUntil(
    precache()
    // caches.open(citiCache).then(cache => {
    //   cache.addAll(assets);
    // }).then(() => {
    //   self.skipWaiting();
    // })
  );
});

// self.addEventListener("install", installEvent => {
//   installEvent.waitUntil(
//     caches.open(citiCache).then(cache => {
//       cache.addAll(assets);
//     })
//   );
// });


// self.addEventListener("fetch", fetchEvent => {
//   fetchEvent.respondWith(
//     caches.match(fetchEvent.request).then(res => {
//       return res || fetch(fetchEvent.request);
//     })
//   );
// });

self.addEventListener("fetch", fetchEvent => {
  console.log('1');
  fetchEvent.respondWith(
    caches.match(fetchEvent.request)
      .then(res => {
        console.log(res);
        return res || fetch(fetchEvent.request);
      })
      .catch((error) => {
        console.log("error fetching", error);
        // return new Response("Offline");
        return caches.match("/page404.html")
      })
  );
});






// const citiCache = "citi-app-v1";

// const assets = [
//   // "/",
//   // "/index.html",
//   "/page404.html",
//   // "/css/style.css",
//   // "/js/app.js",
//   // "/images/citi-logo.png"
// ];

// self.addEventListener("install", installEvent => {
//   installEvent.waitUntil(
//     caches.open(citiCache).then(cache => {
//       cache.addAll(assets);
//     }).then(() => {
//       self.skipWaiting();
//     })
//   );
// });

// // self.addEventListener("install", installEvent => {
// //   installEvent.waitUntil(
// //     caches.open(citiCache).then(cache => {
// //       cache.addAll(assets);
// //     })
// //   );
// // });


// // self.addEventListener("fetch", fetchEvent => {
// //   fetchEvent.respondWith(
// //     caches.match(fetchEvent.request).then(res => {
// //       return res || fetch(fetchEvent.request);
// //     })
// //   );
// // });

// self.addEventListener("fetch", fetchEvent => {
//   console.log('1');
//   fetchEvent.respondWith(
//     caches.match(fetchEvent.request)
//       .then(res => {
//         console.log(res);
//         return res || fetch(fetchEvent.request);
//       })
//       .catch((error) => {
//         console.log("error fetching", error);
//         // return new Response("Offline");
//         return caches.match("/page404.html")
//       })
//   );
// });











// self.addEventListener('push', event => {
//   const payload = event.data ? event.data.text() : 'Default push notification message';
//   event.waitUntil(
//     self.registration.showNotification('Push Notification', {
//       body: payload
//     })
//   );
// });
