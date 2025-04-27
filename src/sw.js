// --- STATISK CACHNING --- 

self.addEventListener('install', function (event) {
    console.log('[Service Worker] Installerar Service Worker', event);
    event.waitUntil(
        caches.open('static')
            .then(function (cache) {
                console.log('[Service Worker]: Precache App Shell');
                cache.addAll([ // <-- viktigt! funkar inte utan return!
                    './',
                    './src/index.html',
                    './src/sw.js',
                    './src/assets/js/app.js',
                    './src/styles.css'
                ]);
            })
    );
});


self.addEventListener('activate', function (event) {
    console.log('[Service Worker] Aktiverar Service Worker', event);
});

self.addEventListener('fetch', function (event) {
    // console.log('[Service Worker] Hämtar något med fetch', event);
    event.respondWith(async function () {
        const cachedResponse = await caches.match(event.request);
        if (cachedResponse) return cachedResponse;
        return fetch(event.request)
    }());
})

// --- DYNAMISK CACHNING ---

var CACHE_STATIC_NAME = 'static';
var CACHE_DYNAMIC_NAME = 'dynamic';

self.addEventListener('install', function (event) {
    console.log('[Service Worker] Installerar Service Worker', event);
    event.waitUntil(
        caches.open(CACHE_STATIC_NAME)
            .then(function (cache) {
                console.log('[Service Worker]: Precache App Shell');
                cache.addAll([ // <-- viktigt! funkar inte utan return!
                    './',
                    './src/index.html',
                    './src/sw.js',
                    './src/assets/js/app.js',
                    './src/styles.css'
                ]);
            })
    );
});

self.addEventListener('activate', function (event) {
    console.log('[Service Worker] Aktiverar Service Worker', event);
    event.waitUntil(
        caches.keys().then(function (keyList) {
            return Promise.all(keyList.map(function (key) {
                if (key !== CACHE_STATIC_NAME && key !== CACHE_DYNAMIC_NAME) {
                    console.log('[Service Worker] Tar bort gammal cache', key)
                    caches.delete(key);
                }
            }))
        })
    )
});

self.addEventListener('fetch', function (event) {
    // console.log('[Service Worker] Hämtar något med fetch', event);
    event.respondWith(async function () {
        const cachedResponse = await caches.match(event.request);
        if (cachedResponse) return cachedResponse;
        return fetch(event.request)
            .then(function (res) {
                return caches.open(CACHE_DYNAMIC_NAME)
                    .then(function (cache) {
                        cache.put(event.request.url, res.clone())
                        return res;
                    })
            }).catch(function (error) {

            })
    }());
});
