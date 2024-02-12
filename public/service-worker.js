
self.addEventListener('install', event => {
    console.log(`Service Worker installed. ${event}`);
});

self.addEventListener('activate', event => {
    console.log(`Service Worker activated. ${event}`);
});

self.addEventListener('fetch', event => {
    console.log('Fetching:', event.request.url);
    event.respondWith(
        fetch(event.request)
            .then(response => {
                console.log('Fetched:', event.request.url);
                return response;
            })
            .catch(error => {
                console.error('Error fetching:', event.request.url);
                return new Response('Offline');
            })
    );
});

