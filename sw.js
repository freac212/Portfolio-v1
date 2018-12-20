const STATIC_CACHE = 'cache-v1';

// First check the cached files, if they don't exist, fetch them through the network
self.addEventListener('fetch', function (event) {
  event.respondWith(
    caches.match(event.request)
      .then(function (response) {
        // Cache hit - return response
        if (response) {
          return response;
        }
        return fetch(event.request);
      }
      )
  );
});

// Cache specifically these files
self.addEventListener('install', function (event) {
  // Perform install steps
  event.waitUntil(
    caches.open(STATIC_CACHE)
      .then(function (cache) {
        return cache.addAll(
          [
            '/',
            './index.html',
            './css/styles.css',
            './javascript/main.js',
            './images/Colour.png',
            './images/logo-512x512.png',
            './images/logo-resized.png',
            './images/the-lake.jpg',
            './images/truck.jpg',
            './images/truck2.jpg'
          ]
        );
      })
  );
});


// Delete the old caches
self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(function (cacheNames) {
      return Promise.all(
        cacheNames.filter(function (cacheName) {
          return cacheName.startsWith("cache-") && cacheName !== STATIC_CACHE;
        }).map(function (cacheName) {
          return caches.delete(cacheName);
        })
      )
    })
  )
})