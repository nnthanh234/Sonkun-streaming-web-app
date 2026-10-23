const CACHE_NAME = 'son-kun-shell-v13';
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

    if (new URL(request.url).origin !== self.location.origin) return;

    const isAppCode = request.mode === 'navigate'
        || /\.(?:html|js|css|json)$/.test(new URL(request.url).pathname);

    event.respondWith((async () => {
        const cache = await caches.open(CACHE_NAME);
        if (!isAppCode) {
            const cached = await cache.match(request);
            if (cached) return cached;
        }

        let response;

        try {
            response = await fetch(request, { cache: 'no-cache' });
        } catch (error) {
            const cached = await cache.match(request);
            if (cached) return cached;

            if (request.mode === 'navigate') {
                const appShell = await cache.match('./index.html');
                if (appShell) return appShell;
            }

            throw error;
        }

        if (response.ok) {
            try {
                await cache.put(request, response.clone());
            } catch (error) {
                console.error('Không thể cập nhật cache ứng dụng:', error);
            }
        }

        return response;
    })());
});
