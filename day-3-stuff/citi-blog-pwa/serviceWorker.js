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

// serve one blog data from cache 
// https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps/Guides/Offline_and_background_operation

// self.addEventListener('fetch', () => {

// }); 

// service-worker.js

const putInCache = async (request, response) => {
  console.log('putInCache');
  const cache = await caches.open("v1");
  await cache.put(request, response);
};

const cacheFirst = async ({ request, fallbackUrl }) => {
  console.log('cacheFirst');
  // First try to get the resource from the cache.
  const responseFromCache = await caches.match(request);
  if (responseFromCache) {
    return responseFromCache;
  }

  // If the response was not found in the cache,
  // try to get the resource from the network.
  try {
    const responseFromNetwork = await fetch(request);
    // If the network request succeeded, clone the response:
    // - put one copy in the cache, for the next time
    // - return the original to the app
    // Cloning is needed because a response can only be consumed once.
    putInCache(request, responseFromNetwork.clone());
    return responseFromNetwork;
  } catch (error) {
    // If the network request failed,
    // get the fallback response from the cache.
    const fallbackResponse = await caches.match(fallbackUrl);
    if (fallbackResponse) {
      return fallbackResponse;
    }
    // When even the fallback response is not available,
    // there is nothing we can do, but we must always
    // return a Response object.
    return new Response("Network error happened", {
      status: 408,
      headers: { "Content-Type": "text/plain" },
    });
  }
};

self.addEventListener("fetch", (event) => {
  console.log('fetch');
  event.respondWith(
    cacheFirst({
      request: event.request,
      fallbackUrl: "/page404.html",
    }),
  );
});
