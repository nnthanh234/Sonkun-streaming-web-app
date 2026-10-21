const CACHE_NAME = 'son-kun-shell-v3';
const APP_SHELL = [
    './index.html',
    './styles/tailwind.css',
    './manifest.json',
    './icon.svg',
    './icon-192.png',
    './icon-512.png',
    './js/data/movies.js',
    './js/services/storageService.js',
    './js/services/adService.js',
    './js/services/pwaService.js',
    './js/state/appState.js',
    './js/player/player.js',
    './js/ui/comments.js',
    './js/ui/toastUI.js',
    './js/ui/favoritesUI.js',
    './js/ui/catalogUI.js',
    './js/ui/navigationUI.js',
    './js/app.js'
];

self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => cache.addAll(APP_SHELL))
            .then(() => self.skipWaiting())
    );
});

self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys()
            .then(cacheNames => Promise.all(
                cacheNames
                    .filter(cacheName => cacheName.startsWith('son-kun-shell-') && cacheName !== CACHE_NAME)
                    .map(cacheName => caches.delete(cacheName))
            ))
            .then(() => self.clients.claim())
    );
});

self.addEventListener('fetch', event => {
    const request = event.request;
    if (request.method !== 'GET') return;

    if (request.mode === 'navigate') {
        event.respondWith(
            fetch(request)
                .catch(() => caches.match(request).then(cached => cached || caches.match('./index.html')))
        );
        return;
    }

    if (new URL(request.url).origin !== self.location.origin) return;

    event.respondWith(
        caches.match(request).then(cached => cached || fetch(request))
    );
});
