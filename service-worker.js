const CACHE_NAME = 'son-kun-shell-v17';
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
    './js/services/firebaseConfig.js',
    './js/services/firebaseApp.js',
    './js/services/firebaseAuth.js',
    './js/services/firebaseComments.js',
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
            .then(cache => Promise.all(APP_SHELL.map(async path => {
                const url = new URL(path, self.registration.scope);
                const response = await fetch(new Request(url, { cache: 'reload' }));
                if (!response.ok) {
                    throw new Error(`Không thể tải tài nguyên ứng dụng: ${url.pathname}`);
                }
                await cache.put(url, response);
            })))
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

    if (new URL(request.url).origin !== self.location.origin) return;

    event.respondWith((async () => {
        const cache = await caches.open(CACHE_NAME);
        const cached = await cache.match(request);
        if (cached) return cached;

        try {
            const response = await fetch(request);
            if (response.ok) {
                try {
                    await cache.put(request, response.clone());
                } catch (error) {
                    console.error('Không thể lưu tài nguyên vào cache:', error);
                }
            }
            return response;
        } catch (error) {
            if (request.mode === 'navigate') {
                const appShell = await cache.match(new URL('./index.html', self.registration.scope));
                if (appShell) return appShell;
            }

            throw error;
        }
    })());
});
