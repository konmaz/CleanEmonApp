const CACHE_NAME = `app-cache-v1`;
const appShellFiles = [
    "assets/apple-splash-2556-1179.jpg",
    "assets/apple-splash-2796-1290.jpg",
    "assets/apple-splash-1125-2436.jpg",
    "assets/apple-splash-2048-1536.jpg",
    "assets/manifest-icon-192.maskable.png",
    "assets/apple-splash-1620-2160.jpg",
    "assets/apple-splash-2778-1284.jpg",
    "assets/apple-splash-2532-1170.jpg",
    "assets/apple-splash-1179-2556.jpg",
    "assets/apple-splash-1242-2688.jpg",
    "assets/apple-splash-1284-2778.jpg",
    "assets/apple-splash-1792-828.jpg",
    "assets/apple-splash-750-1334.jpg",
    "assets/apple-splash-2688-1242.jpg",
    "assets/apple-splash-1290-2796.jpg",
    "assets/apple-icon-180.png",
    "assets/apple-splash-2436-1125.jpg",
    "assets/apple-splash-1668-2224.jpg",
    "assets/apple-splash-2732-2048.jpg",
    "assets/apple-splash-2224-1668.jpg",
    "assets/apple-splash-1334-750.jpg",
    "assets/apple-splash-1170-2532.jpg",
    "assets/apple-splash-1668-2388.jpg",
    "assets/apple-splash-828-1792.jpg",
    "assets/apple-splash-2388-1668.jpg",
    "assets/apple-splash-640-1136.jpg",
    "assets/apple-splash-1536-2048.jpg",
    "assets/apple-splash-2048-2732.jpg",
    "assets/apple-splash-2208-1242.jpg",
    "assets/apple-splash-1136-640.jpg",
    "assets/apple-splash-1242-2208.jpg",
    "assets/manifest-icon-512.maskable.png",
    "assets/apple-splash-2160-1620.jpg",
    "charts.html",
    "code/settings.js",
    "code/metadata.js",
    "code/charts.js",
    "code/config.json",
    "code/index.js",
    "code/modal.js",
    "css/bootstrap-utilities.min.css.map",
    "css/bootstrap.rtl.css",
    "css/bootstrap-reboot.rtl.css",
    "css/bootstrap-utilities.rtl.min.css.map",
    "css/bootstrap-utilities.min.css",
    "css/bootstrap.min.css.map",
    "css/bootstrap-utilities.css.map",
    "css/bootstrap-utilities.rtl.css.map",
    "css/bootstrap-reboot.min.css.map",
    "css/bootstrap-utilities.rtl.css",
    "css/bootstrap-reboot.css",
    "css/bootstrap-grid.rtl.min.css.map",
    "css/bootstrap.css",
    "css/bootstrap-reboot.rtl.min.css",
    "css/bootstrap.rtl.min.css.map",
    "css/bootstrap-grid.css.map",
    "css/bootstrap-grid.rtl.min.css",
    "css/bootstrap-grid.rtl.css.map",
    "css/bootstrap-utilities.css",
    "css/bootstrap-grid.min.css",
    "css/bootstrap-reboot.rtl.css.map",
    "css/bootstrap-grid.css",
    "css/bootstrap-reboot.css.map",
    "css/bootstrap-utilities.rtl.min.css",
    "css/bootstrap-reboot.min.css",
    "css/bootstrap.rtl.css.map",
    "css/bootstrap.css.map",
    "css/bootstrap-reboot.rtl.min.css.map",
    "css/bootstrap.min.css",
    "css/bootstrap-grid.rtl.css",
    "css/bootstrap.rtl.min.css",
    "css/bootstrap-grid.min.css.map",
    "custom_style.css",
    "favicon.ico",
    "index.html",
    "js/bootstrap.js",
    "js/bootstrap.js.map",
    "js/bootstrap.bundle.js.map",
    "js/bootstrap.esm.min.js.map",
    "js/bootstrap.bundle.js",
    "js/bootstrap.bundle.min.js",
    "js/bootstrap.esm.js.map",
    "js/bootstrap.esm.js",
    "js/bootstrap.esm.min.js",
    "js/bootstrap.bundle.min.js.map",
    "js/bootstrap.min.js.map",
    "js/bootstrap.min.js",
    "logo.svg",
    "manifest.json",
    "metadata.html",
    "settings.html",
];

// Cache app shell files during installation
self.addEventListener('install', event => {
    event.waitUntil((async () => {
        const cache = await caches.open(CACHE_NAME);
        cache.addAll(appShellFiles);
    })());
});

// Intercept fetch events and apply a cache-first strategy
self.addEventListener('fetch', event => {
    if (
        event.request.url.startsWith('chrome-extension') ||
        event.request.url.includes('extension') ||
        event.request.url.startsWith('/api/') ||
        event.request.url.startsWith('/dev')
    ) return;
    return; //disable service worker for now
    event.respondWith((async () => {
        const cache = await caches.open(CACHE_NAME);
        const cachedResponse = await cache.match(event.request);
        if (cachedResponse) {
            return cachedResponse;
        } else {
            try {
                const fetchResponse = await fetch(event.request);
                cache.put(event.request, fetchResponse.clone());
                return fetchResponse;
            } catch (e) {
                // The network failed.
            }
        }
    })());
});
